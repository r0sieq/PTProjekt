import * as admin from 'firebase-admin';

export async function registerUser(email: string, password: string, displayName: string){
    const user = await admin.auth().createUser({
        email,
        password,
        displayName
    })

    const uid = user.uid;

    const userData = {
        uid,
        displayName,
        balance: 0
    }

    await admin.firestore().collection("casino/users").doc(uid).set(userData);

    return userData;
}

export async function getUser(id: string){
    try {
        const user = await admin.firestore().collection("users").doc(id).get();
        if(!user.exists) return null;
        return user;
    } catch(e) {
        console.log(e)
        return null;
    }
}

export function getUserReference(id: string){
    try {
        const userRef = admin.firestore().collection("users").doc(id);
        return userRef
    } catch {
        return null;
    }
}

export async function getUserBalance(id: string){
    try {
        const user = await getUser(id);
        if(!user) return null;
        return user.get("balance") as number;
    } catch {
        return null;
    }
}

export async function updateUserBalance(id: string, difference: number){
    try {
        const user = await admin.firestore().collection("users").doc(id).get();
        const previousBalance = user?.get("balance") as number ?? 0;
        const newBalance = previousBalance + difference;
        if(newBalance < 0) return null;
        await admin.firestore().collection("users").doc(id).update({"balance": newBalance});
        return newBalance;
    } catch {
        return null;
    }
}

export async function createMinesweeperGame(uid: string, stake: number, mines: number){
    const userRef = getUserReference(uid);
    if(!userRef) return null;
    const ref = await userRef.collection("minesweeperGames").add({
        mines,
        stake,
        map: createMinesweeperMap(mines),
        revealed: []
    })
    
    return ref.id;
}

export function createMinesweeperMap(mines: number = 0){
    const indexesToFlip = new Set<number>;
    const map = Array(25).fill(0);
    while(indexesToFlip.size < mines){
        indexesToFlip.add(Math.floor(Math.random() * 25));
    }

    for(const index of indexesToFlip) map[index] = "1";

    return map.join("");
}

export function calculateMinesweeperMultiplier(mines: number, streak: number){

    if(streak === 0) return 1;

    const totalTiles = 25;
    const safeTiles = totalTiles - mines;
    if(mines >= totalTiles) return 0;
    if(streak > safeTiles) return 0;

    let probability = 1;

    for(let i = 0; i < streak; i++){
        probability *= (safeTiles - i) / (totalTiles - i);
    }

    if(probability === 0) return 0;

    const houseEdge = .99;
    const multiplier = houseEdge / probability;

    return parseFloat(multiplier.toFixed(4));
}

export function getRandomCards(){
    const totalColors = 4;
    const totalFigures = 13;
    const deck: string[] = [];

    for(let color = 0; color < totalColors; color++){
        for(let figure = 0; figure < totalFigures; figure++){
            deck.push(`${color}-${figure}`);
        }
    }

    for(let i = deck.length - 1; i > 0; i--){
        const j = Math.floor(Math.random() * (i + 1));
        [deck[i], deck[j]] = [deck[j], deck[i]];
    }

    return deck.slice(4);
}

export function generateRidethebusGame(){
    const totalColors = 4;
    const totalFigures = 13;

    const deck: [number, number][] = [];
    for (let color = 0; color < totalColors; color++) {
            for (let figure = 0; figure < totalFigures; figure++) {
                deck.push([color, figure]);
            }
    }

    for (let i = deck.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [deck[i], deck[j]] = [deck[j], deck[i]];
    }

    const selected = deck.slice(0, 4);

    const [card1, card2, card3, card4] = selected;

    const isFirstBlack = (card1[0] === 0 || card1[0] === 3) ? 0 : 1; // clubs or spades
    const isSecondHigher = card2[1] > card1[1] ? 0 : 1;

    const min12 = Math.min(card1[1], card2[1]);
    const max12 = Math.max(card1[1], card2[1]);
    const isThirdBetween = (card3[1] > min12 && card3[1] < max12) ? 0 : 1;

    const fourthSuit = card4[0];

    const answers = [
        isFirstBlack,
        isSecondHigher,
        isThirdBetween,
        fourthSuit
    ];

    // Konwersja do stringów "COLOR-FIGURE"
    const cards = selected.map(([color, figure]) => `${color}-${figure}`);

    return { cards, answers };
}