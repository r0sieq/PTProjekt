import { NextFunction, Request, Response } from "express";
import * as admin from 'firebase-admin';
import { DecodedIdToken } from "firebase-admin/auth";

export interface AuthorizedRequest extends Request {
    user: DecodedIdToken
}

export default async function checkToken(req: Request, res: Response, next: NextFunction){
    const authHeader = req.headers.authorization;
    if(!authHeader || !authHeader.startsWith("Bearer "))
        return void res.status(401).json({error: "No authorization token provided."});
    const token = authHeader.split("Bearer ")[1];
    try {
        const user = await admin.auth().verifyIdToken(token);
        (req as any).user = user;
        next();
    } catch (e){
        console.log("Auth error!", e);
        res.status(401).json({ error: "Invalid authorization token." }); 
    }
}