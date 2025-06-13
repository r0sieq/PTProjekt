import { getUserReference, spinSlotMachine, updateUserBalance } from "../../utils";
import checkToken, { AuthorizedRequest } from "../token";
import express from "express";

const router = express.Router();

router.post("/start", checkToken, async (req, res) => {
    try {
        const { user, body } = req as AuthorizedRequest;
        const stake = body.stake;
        if(!stake || typeof stake !== "number"){
            return res.status(400).json({error: "Invalid bet data. Try again later."})
        }  

        const newBalance = await updateUserBalance(user.uid, -stake);
        if(newBalance === null) return res.status(400).json({error: "Insufficient funds."});

        const userRef = getUserReference(user.uid);
        const gamesCollectionRef = userRef?.collection("slotmachineGames");
        
        const { prize, symbols, multiplier } = spinSlotMachine(body.stake);
        
        await gamesCollectionRef?.add({ stake, prize, symbols, multiplier, lastAction: Date.now() });

        await updateUserBalance(user.uid, prize);

        return res.status(200).json({
            gameBalance: prize,
            symbols,
            multiplier,
            status: prize > 0 ? "won" : "lost",
            stake
        })
    } catch {
        return res.status(500).json({ error: "Unexpected server error. Try again later" });
    }
})

export default router;