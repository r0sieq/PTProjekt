import express from 'express';
import { updateUserBalance, getUserReference, getRouletteNumber, rouletteMultipliersMap } from '../../utils';
import checkToken, { AuthorizedRequest } from '../token';
import { RouletteBetName } from '../../types';

const router = express.Router();

router.post("/start", checkToken, async (req, res) => {
    try {
        const { user, body } = req as AuthorizedRequest;
        const bets: Record<RouletteBetName, number> = body.bets;
        if(!bets || typeof bets !== "object"){
            return res.status(400).json({error: "Invalid bet data. Try again later."})
        }  

        

        const resultNumber = getRouletteNumber();
        let gameBalance = 0;
        let stake = 0;

        for(const k in bets){
            const key = k as RouletteBetName;
            const betAmount = bets[key];
            if (betAmount > 0) {
                stake += betAmount;
                const rule = rouletteMultipliersMap[key];
                if (rule && rule.check(resultNumber)) {
                    gameBalance += betAmount * rule.multiplier;
                }
            }
        }

        const newBalance = await updateUserBalance(user.uid, -stake);
        if(newBalance === null) return res.status(400).json({error: "Insufficient funds."});

        const userRef = getUserReference(user.uid);
        const gamesCollectionRef = userRef?.collection("rouletteGames");
        const gameDocRef = await gamesCollectionRef?.add({
            ...bets,
            resultNumber,
            lastAction: Date.now(),
            gameBalance
        })

        await updateUserBalance(user.uid, gameBalance);

        return res.status(200).json({
            gameBalance: Math.max(gameBalance, 0),
            gameId: gameDocRef,
            stake,
            status: gameBalance - stake >= 0 ? "won" : "lost",
            number: resultNumber
        })
    } catch {
        return res.status(400).json({ error: "Unexpected server error. Try again later" });
    }
})


export default router;