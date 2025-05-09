import { useEffect, useState } from 'react';
import './RideTheBus.css';
import Api from '../../api';
import RideTheBusSettings from './RideTheBusSettings';
import RideTheBusGame from './RideTheBusGame';
import { Route, Routes, useNavigate } from 'react-router-dom';
import RideTheBusToolbar from './RideTheBusToolbar';
import GameScorePopup from '../Home/GameScorePopup/GameScorePopup';

export interface RidethebusSettingsData {
    stake: number
}

export default function RideTheBus(){

    const navigate = useNavigate();

    const [game, setGame] = useState<Api.Ridethebus.GameState>(Api.Ridethebus.DEFAULT_GAMESTATE);
    const [popupActive, setPopupActive] = useState<boolean>(game.status === "won" || game.status === "lost");

    async function handleStart(settings: RidethebusSettingsData){
        Api.Ridethebus.createGame(settings.stake).then(data => {
            navigate(`/ridethebus/${data?.gameId}`);
        });
    }

    useEffect(() => {
        if(game.status === "active"){
            setPopupActive(false);
            return;
        } else if(game.status === "won"){
            setPopupActive(true);
            return;
        }
        const timeout = setTimeout(() => setPopupActive(true), 1000)
        return () => clearTimeout(timeout);
    }, [game])

    return (
        <main className="ridethebus">
            <div className="content">
                <RideTheBusGame game={game} setGame={setGame}/>
                <Routes>
                    <Route path='/' element={
                        <RideTheBusSettings handleSubmit={handleStart}/>
                    }/>
                    <Route path='/:id' element={
                        <RideTheBusToolbar game={game} setGame={setGame}/>
                    }/>
                </Routes>
                
            </div>
            {popupActive && <GameScorePopup game={game} gameTitle='Minesweeper' setPopupActive={setPopupActive} redirectUrl='/ridethebus'/>}
        </main>
    )
}