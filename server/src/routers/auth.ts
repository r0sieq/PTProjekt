import express from 'express';
import { getUser, registerUser, validateEmail, validateName, validatePassword } from '../utils';
import checkToken, { AuthorizedRequest } from './token';
import { UserData } from '../types';

const router = express.Router();

router.post("/signup", async (req, res) => {
    const body = req.body;
        if(!validateEmail(body.email)) return void res.status(400).json({error: "Invalid email."});
        if(!validateName(body.name)) return void res.status(400).json({error: "Invalid name."});
        if(!validatePassword(body.password)) return void res.status(400).json({error: "Invalid password."});

        
    try {
        const user = await registerUser(body.email, body.password, body.name);
        res.status(201).json(user);
    } catch(error: any) {
        console.error("Signing up error.", error);
        return void res.status(500).json({error: error.message})
    }
    return void res.status(200).json({ok: true});
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