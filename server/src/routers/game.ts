import express from 'express';
import { getUser, registerUser } from '../utils';
import checkToken, { AuthorizedRequest } from './token';

const router = express.Router();

router.post("/", checkToken, async (req, res) => {
    
})

import minesweeperRouter from './games/minesweeper';
router.use("/minesweeper", minesweeperRouter);

import ridethebusRouter from './games/ridethebus';
router.use("/ridethebus", ridethebusRouter);

export default router;