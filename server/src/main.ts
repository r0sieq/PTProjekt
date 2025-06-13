import express from "express";
import cors from "cors";
import * as admin from 'firebase-admin';
import path from "path";

const app = express();
app.use(express.json());
app.use(cors());
app.use(express.urlencoded({extended: true}))

const PORT = 3000;

const serviceAccount = require(path.resolve(__dirname, "../serviceAccountKey.json"));

admin.initializeApp({ credential: admin.credential.cert(serviceAccount) });

import authRouter from './routers/auth';
app.use("/auth", authRouter);

import gameRouter from './routers/game';
app.use("/game", gameRouter);

import depositRouter from './routers/deposit';
app.use("/deposit", depositRouter);

app.listen(PORT, () => console.log(`Listening on ${PORT}`));
app.listen(PORT, '0.0.0.0', () => console.log(`Listening on ${PORT}`));

export default app;

