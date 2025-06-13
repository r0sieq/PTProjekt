import express from 'express';
import checkToken, { AuthorizedRequest } from './token';
import * as admin from 'firebase-admin';
import { getUserReference, updateUserBalance } from '../utils';

const router = express.Router();

router.post("/redeem", checkToken, async (req, res) => {
    const { user, body } = req as AuthorizedRequest;
    const code = body.code;

    if(!code || typeof code !== "string"){
        return res.status(400).json({error: "Gift code does not exist."});
    }

    const db = admin.firestore();

    const giftCodeRef = db.collection("giftCodes").doc(code);
    const userRef = getUserReference(user.uid)!;

    try {
        const value = await db.runTransaction(async (transaction) => {
            const [giftSnap, userSnap] = await Promise.all([
                transaction.get(giftCodeRef),
                transaction.get(userRef),
            ])

            if(!giftSnap.exists){
                throw new Error(`Code does not exist.`)
            }

            const giftData = giftSnap.data()!;
            const { globalLimit, personalLimit, value } = giftData;

            const userData = userSnap.data() || {};
            const usedGiftCodes = userData.usedGiftCodes || {};
            const currentPersonalUse = usedGiftCodes[code] || 0;

            const globalUsed = giftData.used || 0;

            if(currentPersonalUse >= personalLimit){
                throw new Error(`Code has been already redeemed.`);
            }

            if(globalUsed >= globalLimit){
                throw new Error(`Code expired.`);
            }

            usedGiftCodes[code] = currentPersonalUse + 1;

            transaction.update(userRef, {usedGiftCodes});
            transaction.update(giftCodeRef, {used: globalUsed + 1});

            return value;
        })

        updateUserBalance(user.uid, value);

        if(value === null) {
            return void res.status(400).json({error: "Could not redeem code. Try again later"});
        }

        return res.status(200).json({ addedValue: value})
    } catch(err: any) {
        return res.status(400).json({error: err.message || "Unexpected error occured. Try again later."})
    }
})

export default router;