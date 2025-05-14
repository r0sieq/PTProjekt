import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "./firebase";

namespace Api {
    
    export const URL = "https://api-ue2hpd3waa-uc.a.run.app"
    //export const URL = window.location.host === "192.168.8.100:5173" ? "http://192.168.8.100:3000" : "http://localhost:3000";
    //export const URL = "/api"

    export async function authToken(){
        const user = auth.currentUser;
        const token = await user?.getIdToken();
        return { Authorization: `Bearer ${token ?? localStorage.getItem("token") ?? ""}`, "Content-Type": "application/json"}
    }

    export async function signIn(email: string, password: string) {
        try {
            console.log("signin attempt:", email, password);
            const userCredential = await signInWithEmailAndPassword(auth, email, password);
            const token = await userCredential.user.getIdToken(false);   
            localStorage.setItem("token", token);
            console.log("signin succes", userCredential.user);
        } catch (e){
            console.error(e);
            throw new Error("Incorrect email or password!");
        }
    }

    export async function signOut(){
        await auth.signOut();
        localStorage.removeItem("token");
    }

    export interface UserData {
        readonly uid: string,
        readonly balance: number,
        readonly displayName: string
    }

    export async function getBasicUserData(){
        try {
            const headers = await authToken();
            const res = await fetch(`${Api.URL}/auth/me`, { headers });
            if(!res.ok) return null;
            const data = await res.json();
            if("error" in data) return null;
            return data as UserData;
        } catch {
            return null;
        }
    }

    export interface GameCreationResponse {
        readonly gameId: string,
        readonly balance: number
    }

    export interface Game {
        id: string,
        name: string,
        game: {
            stake: number,
            active: boolean,
            lastAction: number
        }
    }
        

    export namespace Ridethebus {
        
        export interface GameState {
            stake: number,
            status: "active" | "won" | "lost",
            round: number,
            cards: string[],
            gameBalance: number,
        }

        export const DEFAULT_GAMESTATE: GameState = {
            stake: 0,
            status: "active",
            round: -1,
            cards: [],
            gameBalance: 0
        }

        export async function createGame(stake: number){
            try {
                const headers = await authToken();
                const res = await fetch(`${Api.URL}/game/ridethebus/start`, { 
                    headers,
                    method: "POST",
                    body: JSON.stringify({
                        stake
                    })
                });
                const data = await res.json() as GameCreationResponse;
                return data;
            } catch(error) {
                console.warn(error)
                return null;
            }
        }
    }

    export namespace Minesweeper {

        export interface GameState {
            revealedPositions: number[],
            state: Array<"mine" | "unknown" | "empty">,
            status: "active" | "won" | "lost",
            gameBalance: number,
            stake: number,
            mines: number,
        }

        export const DEFAULT_GAMESTATE: GameState = {
            revealedPositions: [],
            state: new Array(25).fill("unknown"),
            status: "active",
            gameBalance: 0,
            stake: 0,
            mines: 0
        }

        export async function createGame(stake: number, mines: number){
            console.log(stake, mines)
            try {
                const headers = await authToken();
                const res = await fetch(`${Api.URL}/game/minesweeper/start`, { 
                    headers,
                    method: "POST",
                    body: JSON.stringify({
                        mines,
                        stake
                    })
                });
                const data = await res.json() as GameCreationResponse;
                return data;
            } catch(error) {
                console.warn(error)
                return null;
            }
        }

    }
}

export default Api;