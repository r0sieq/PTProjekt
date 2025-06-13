import { useState } from 'react';
import './Roulette.css'
import RouletteToolbar from './RouletteToolbar'
import RouletteWheel from './RouletteWheel'
import RouletteBetsPopup from './RouletteBetsPopup';
import Api from '../../api';
import useGlobalError from '../../hooks/useGlobalError';
import GameScorePopup from '../Home/GameScorePopup/GameScorePopup';
import useWallet from '../../hooks/useWallet';


export default function Roulette(){

    const [betsPopup, setBetsPopup] = useState<boolean>(false);
    const [bets, setBets] = useState<Api.Roulette.Bets>(Api.Roulette.DEFAULT_BETS);
    const [loading, setLoading] = useState<boolean>(false);
    const [game, setGame] = useState<Api.Roulette.GameState | null>(null);
    const [targetNumber, setTargetNumber] = useState<number>(-1);
    const [popupActive, setPopupActive] = useState<boolean>(false);
    const [defaultPosition, setDefaultPosition] = useState<number>(0);

    const { addError } = useGlobalError()
    const { balance, setBalance } = useWallet()

    async function handleSpin(e: React.FormEvent<HTMLFormElement>){
        e.preventDefault();
        setLoading(true);
        const headers = await Api.authToken();
        const res = await fetch(`${Api.URL}/game/roulette/start`, { 
            headers,
            method: "POST",
            body: JSON.stringify({
                bets
            })
        })
        const data = await res.json() as Api.Roulette.GameState;
        console.log("Nowe dane:", data)
        if("error" in data){
            addError(String(data), 5);
        } else {
            const g = game!;
            setGame(data);
            setTargetNumber(data.number);
            setBalance(balance - g.stake);
        }
    }

    function handleEnd(){
        const g = game!;
        setPopupActive(true);
        setBalance(balance + g.gameBalance);
        setLoading(false);
        setDefaultPosition(g.number);
    }

    return (
        <main className="roulette">
            <div className="content">
                <RouletteWheel spinTo={targetNumber} defaultPosition={defaultPosition} onEnd={handleEnd} key={game?.gameId}/>
                <RouletteToolbar setBetsPopup={setBetsPopup} bets={bets} setBets={setBets} onSpin={handleSpin} loading={loading}/>
            </div>
            {betsPopup && <RouletteBetsPopup setBetsPopup={setBetsPopup} setBets={setBets} bets={bets}/>}
            {popupActive && <GameScorePopup game={game!} gameTitle='Roulette' setPopupActive={setPopupActive} redirectUrl='/roulette'/>}
        </main>
    )
}