import express from 'express';
import checkToken, { AuthorizedRequest } from './token';
import { getUserReference } from '../utils';
import { Game, MinesweeperGame, RidethebusGame } from '../types';

const router = express.Router();

const gameNames = ["minesweeper", "ridethebus"];

router.post("/getgames", checkToken, async (req, res) => {
    const { user } = req as AuthorizedRequest;
    const userRef = getUserReference(user.uid);
    if(!userRef) return void res.status(401).json({error: "Invalid session token."});
    const userGames: Game[] = [];
    for(const name of gameNames){
        const gamesRef = userRef.collection(`${name}Games`).where("active", "==", true);
        const games = await gamesRef.get();
        userGames.push(...games.docs.map(game => {
            const gameData = game.data() as MinesweeperGame | RidethebusGame;
            return {name: name, game: { stake: gameData.stake, lastAction: gameData.lastAction, active: gameData.active }, id: game.id} as Game;
        }))
    }
    return void res.json(userGames);
})

import minesweeperRouter from './games/minesweeper';
router.use("/minesweeper", minesweeperRouter);

import ridethebusRouter from './games/ridethebus';
router.use("/ridethebus", ridethebusRouter);

import rouletteRouter from './games/roulette';
router.use("/roulette", rouletteRouter);

export default router;