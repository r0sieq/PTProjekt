import Drum from "./SlotMachineDrum";
import './SlotMachine.css'
import { useState } from "react";
import Icon from "../../Icon";
import StakeSelector from "../StakeSelector/StakeSelector";
import useGlobalError from "../../hooks/useGlobalError";
import Api from "../../api";
import useWallet from "../../hooks/useWallet";
import GameScorePopup from "../Home/GameScorePopup/GameScorePopup";

export default function SlotMachine(){
    
    const [, setDefaultPositions] = useState<[number, number, number]>([0, 0, 0]);

    const [stake, setStake] = useState<number>(0);
    const [game, setGame] = useState<Api.SlotMachine.GameState | null>(null);
    const [popupActive, setPopupActive] = useState<boolean>(false);

    const [isLocked, setLocked] = useState<boolean>(false);

    const { addError } = useGlobalError();

    const { setBalance, balance } = useWallet()

    const [spinCount, setSpinCount] = useState<number>(0);

    async function handleSubmit(e: React.FormEvent<HTMLFormElement>){
        e.preventDefault();
        const headers = await Api.authToken();
        setBalance(balance - stake);
        setLocked(true);
        const res = await fetch(`${Api.URL}/game/slotmachines/start`, {
            headers,
            method: "POST",
            body: JSON.stringify({stake})
        });
        const data = await res.json();
        if("error" in data){
            addError(`${data.error}`, 15, data.error);
        } else {
            setSpinCount(c => c + 1);
            setGame(data);
        }

    }
    
    function onEnd(){
        setTimeout(() => {
            setDefaultPositions(game?.symbols! as [number, number, number]);
        })
        setLocked(false);
        if(!game) return;
        setBalance(balance + game.gameBalance);
        if(game.status === "won") setPopupActive(true);
    }

    console.log(game);

    const gameId = game?.gameId ?? "";

    return (
        <main className="slots home">
            <div className="content">
                <div className="drums">
                    <Drum defaultPosition={0} spinTo={game?.symbols[0] ?? -1} onEnd={onEnd} spinSessionId={spinCount} key={gameId + "1"}/>
                    <Drum defaultPosition={0} spinTo={game?.symbols[1] ?? -1} spinSessionId={spinCount} key={gameId + "2"}/>
                    <Drum defaultPosition={0} spinTo={game?.symbols[2] ?? -1} spinSessionId={spinCount} key={gameId + "3"}/>
                </div>
                <form className="slots-toolbar" onSubmit={handleSubmit}>
                    <button type="submit" className="primary" disabled={stake < 1 || isLocked}>
                        Spin
                    </button>
                    <div className="stake">
                        {stake === 0 ? "for free" : <> stake: {stake}<Icon.Token /></>}
                    </div>
                    <StakeSelector onChange={setStake} defaultValue={0}/>
                </form>
            </div>
            {popupActive && <GameScorePopup game={game!} gameTitle="Slot Machines" redirectUrl="/slots" setPopupActive={setPopupActive}/>}
        </main>
    )
}