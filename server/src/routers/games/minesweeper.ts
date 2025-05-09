import express from 'express';
import { updateUserBalance, createMinesweeperMap, getUserReference, calculateMinesweeperMultiplier } from '../../utils';
import checkToken, { AuthorizedRequest } from '../token';
import { MinesweeperGame } from '../../types';

const router = express.Router();

router.post("/start", checkToken, async (req, res) => {
    const { user, body } = req as AuthorizedRequest;
    if(!body.stake || !body.mines || isNaN(parseInt(body.stake)) || isNaN(parseInt(body.mines))) return void res.status(400);
    if(body.mines < 1 || body.mines > 24) return void res.status(400);
    const newBalance = await updateUserBalance(user.uid, -body.stake);
    if(newBalance === null) return res.status(400).json({error: "Insufficient funds."});
    const userRef = getUserReference(user.uid);
    if(!userRef) return null;
    const ref = await userRef.collection("minesweeperGames").add({
        mines: body.mines,
        stake: body.stake,
        map: createMinesweeperMap(body.mines),
        revealed: [],
        active: true,
        lastAction: Date.now()
    })
    return void res.status(200).json({balance: newBalance, gameId: ref.id});
})

router.post("/reveal", checkToken, async (req, res) => {
    const { user, body } = req as AuthorizedRequest;
    console.log(body);
    if(!body.gameId || body.squareIndex == null || isNaN(parseInt(body.squareIndex))) return void res.status(400).json({error: "Bad request."});
    const userRef = getUserReference(user.uid);
    if(!userRef) return void res.status(401);
    const gameRef = userRef.collection("minesweeperGames").doc(body.gameId);
    const game = await gameRef.get();
    const gameData = game.data() as MinesweeperGame;
    if(gameData.active === false) return void res.status(400).json({error: "Game is no longer available."});
    if(gameData.revealed.includes(body.squareIndex)) return void res.status(400).json({error: "Square is already uncovered"});
    gameData.revealed.push(body.squareIndex);
    if(gameData.map[body.squareIndex] === "1") {
        await gameRef.update({
            active: false,
            revealed: gameData.revealed
        })
        return void res.status(200).json({ 
            status: "lost", 
            state: [...gameData.map].map(char => char === "1" ? "mine" : "empty"),
            gameBalance: 0,
            revealedPositions: gameData.revealed, 
            stake: gameData.stake,
            mines: gameData.mines
        });
    } else {
        
        const hasWon = gameData.mines + gameData.revealed.length === 25;
        await gameRef.update({
            lastAction: Date.now(),
            active: !hasWon,
            revealed: gameData.revealed
        });
        const prize = gameData.stake * calculateMinesweeperMultiplier(gameData.mines, gameData.revealed.length)
        if(hasWon){
            await updateUserBalance(user.uid, prize);
            return void res.status(200).json({
                status: "won",
                state: [...gameData.map].map(char => char === "1" ? "mine" : "empty"),
                gameBalance: prize,
                revealedPositions: gameData.revealed,
                stake: gameData.stake,
                mines: gameData.mines
            });
        } else {
            return void res.status(200).json({
                status: "active",
                state: [...gameData.map].map((char, i) => {
                    if(gameData.revealed.includes(i)){
                        if(char === "1") return "mine";
                        else return "empty";
                    } else return "unknown";
                }),
                gameBalance: prize,
                revealedPositions: gameData.revealed,
                stake: gameData.stake,
                mines: gameData.mines
            });
        }
    }
})

router.post("/cashout", checkToken, async (req, res) => {
    const { user, body } = req as AuthorizedRequest;
    if(!body.gameId) return void res.status(400);
    const userRef = getUserReference(user.uid)!;
    const gameRef = userRef.collection("minesweeperGames").doc(body.gameId);
    const game = await gameRef.get();
    const gameData = game.data() as MinesweeperGame;
    if(gameData.active === false) return void res.status(400).json({error: "Game is no longer active."});
    await gameRef.update({
        lastAction: Date.now(),
        active: false,
        revealed: gameData.revealed,
    });
    const prize = gameData.stake * calculateMinesweeperMultiplier(gameData.mines, gameData.revealed.length);
    await updateUserBalance(user.uid, prize)
    return void res.status(200).json({
        status: "won",
        state: [...gameData.map].map(char => char === "1" ? "mine" : "empty"),
        gameBalance: prize,
        revealedPositions: gameData.revealed,
        stake: gameData.stake,
        mines: gameData.mines
    });
})

router.post("/getgame", checkToken, async (req, res) => {
    const { user, body } = req as AuthorizedRequest;
    if(!body.gameId) return void res.status(404).json({error: "Game not found!"});
    const userRef = getUserReference(user.uid)!;
    try {
        const game = await userRef.collection("minesweeperGames").doc(body.gameId).get();
        const gameData = game.data() as MinesweeperGame;
        const prize = gameData.stake * calculateMinesweeperMultiplier(gameData.mines, gameData.revealed.length);
        if(gameData.active){
            return void res.status(200).json({
                status: "active",
                state: [...gameData.map].map((char, i) => {
                    if(gameData.revealed.includes(i)){
                        if(char === "1") return "mine";
                        else return "empty";
                    } else return "unknown";
                }),
                gameBalance: prize,
                revealedPositions: gameData.revealed,
                stake: gameData.stake,
                mines: gameData.mines
            })
        } else {
            const isLost = [...gameData.map].some((char, i) => {
                if(char === "1"){
                    return gameData.revealed.includes(i);
                } else {
                    return false;
                }
            })
            return void res.status(200).json({
                status: isLost ? "lost" : "won",
                state: [...gameData.map].map(char => char === "1" ? "mine" : "empty"),
                gameBalance: 0,
                revealedPositions: gameData.revealed,
                stake: gameData.stake,
                mines: gameData.mines
            })
        }
    } catch(err) {
        console.error(err);
        return void res.status(404).json({error: "Game not found!"});
    }

})

export default router;