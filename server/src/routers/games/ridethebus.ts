import express from 'express';
import { updateUserBalance, getUserReference, generateRidethebusGame } from '../../utils';
import checkToken, { AuthorizedRequest } from '../token';
import { RidethebusGame } from '../../types';

const router = express.Router();

const roundMultipliers = [1, 1.5, 3, 6, 15];

router.post("/start", checkToken, async (req, res) => {
    const { user, body } = req as AuthorizedRequest;
    if(!body.stake || isNaN(parseInt(body.stake)) || body.stake <= 0) return void res.status(400);
    const newBalance = await updateUserBalance(user.uid, -body.stake);
    if(newBalance === null) return res.status(400).json({error: "Insufficient funds."});
    const userRef = getUserReference(user.uid);
    if(!userRef) return void res.status(401).json({error: "Token expired."});
    const game = generateRidethebusGame();
    const ref = await userRef.collection("ridethebusGames").add({
        stake: body.stake,
        round: 0,
        cards: game.cards,
        answers: game.answers,
        active: true,
        lastAction: Date.now()
    })
    return void res.status(200).json({balance: newBalance, gameId: ref.id});
})

router.post("/placebet", checkToken, async (req, res) => {
    const { user, body } = req as AuthorizedRequest;
    console.log(body);
    if(!body.gameId || isNaN(body.guess)) return void res.status(400).json({error: "Bad request."});
    const userRef = getUserReference(user.uid)!;
    const gameRef = userRef.collection("ridethebusGames").doc(body.gameId);
    const game = await gameRef.get();
    if(!game.exists) return void res.status(404).json({error: "Game not found."});
    const gameData = game.data() as RidethebusGame;

    if(gameData.answers[gameData.round] === body.guess){
        console.log("poprawny wybor");
        const round = gameData.round + 1;
        await gameRef.update({ active: round < 4, round: round });
        return void res.status(200).json({
            stake: gameData.stake,
            status: round === 4 ? "won" : "active",
            round: round,
            cards: gameData.cards.slice(0, round),
            gameBalance: roundMultipliers[round] * gameData.stake
        })
    } else {
        console.log("niepoprawny wybor")
        await gameRef.update({ active: false });
        return void res.status(200).json({
            stake: gameData.stake,
            status: "lost",
            round: gameData.round,
            cards: gameData.cards.slice(0, gameData.round + 1),
            gameBalance: 0,
        })
    } 
})

router.post("/getgame", checkToken, async (req, res) => {
    const { user, body } = req as AuthorizedRequest;
    if(!body.gameId) return void res.status(400);
    const userRef = getUserReference(user.uid)!;
    const gameRef = userRef.collection("ridethebusGames").doc(body.gameId);
    const game = await gameRef.get();
    if(!game.exists) return void res.status(404).json({error: "Game not found."});
    const gameData = game.data() as RidethebusGame;
    if(gameData.active === false) return void res.status(400).json({error: "Game is no longer available."});
    return void res.status(200).json({
        stake: gameData.stake,
        status: "active",
        round: gameData.round,
        cards: gameData.cards.slice(0, gameData.round),
        gameBalance: gameData.stake * roundMultipliers[gameData.round]
    })
})

router.post("/cashout", checkToken, async (req, res) => {
    const { user, body } = req as AuthorizedRequest;
    if(!body.gameId) return void res.status(400);
    const userRef = getUserReference(user.uid);
    if(!userRef) return void res.status(400);
    const gameRef = userRef.collection("ridethebusGames").doc(body.gameId);
    const game = await gameRef.get();
    if(!game.exists) return void res.status(404).json({error: "Game not found."});
    const gameData = game.data() as RidethebusGame;
    if(!gameData.active) return void res.status(404).json({error: "Game no longer available."});
    await gameRef.update({
        active: false,
    })
    await updateUserBalance(user.uid, gameData.stake * roundMultipliers[gameData.round])
    return void res.json({
        stake: gameData.stake,
        status: "won",
        round: gameData.round,
        cards: gameData.cards.slice(0, gameData.round),
        gameBalance: gameData.stake * roundMultipliers[gameData.round]
    })

})

export default router;