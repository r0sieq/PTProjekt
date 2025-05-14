import express from 'express';
import { getUser, registerUser } from '../utils';
import checkToken, { AuthorizedRequest } from './token';
import { UserData } from '../types';

const router = express.Router();

router.post("/signup", async (req, res) => {
    const body = req.body;
    if(!body) 
        return void res.status(400).json({ error: "Unexpected error." });
    if("email" in body && "password" in body && "displayName" in body){
        try {
            const user = await registerUser(body.email, body.password, body.displayName);
            res.status(201).json(user);
        } catch(error) {
            console.error("Signing up error.", error);
            return void res.status(500).json({error})
        }
        return void res.status(200).json({ok: true});
    } else return void res.status(400).json({ error: "Unexpected error." });
})

router.get("/me", checkToken, async (req, res) => {
    const userId = (req as AuthorizedRequest).user.uid;
    console.log(userId)
    try {
        const user = await getUser(userId);
        if(user === null) return void res.status(400).json({error: "User does not exist."});
        const userData = user.data() as UserData;
        return void res.json(userData);
    } catch {
        return void res.status(500).json({error: "Internal server error."});
    }
})

export default router;