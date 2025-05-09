import { useEffect, useState } from 'react';
import './Minesweeper.css'

import MinesweeperSettings from "./MinesweeperSettings";
import MinesweeperPrizes from './MinesweeperPrizes';
import MinesweeperGame from './MinesweeperGame';
import Api from '../../../api';
import { Route, Routes, useNavigate } from 'react-router-dom';
import GameScorePopup from '../GameScorePopup/GameScorePopup';

export interface MinesweeperSettingsData {
    mines: number,
    stake: number
}

export default function Minesweeper(){

    const navigate = useNavigate();

    const [game, setGame] = useState<Api.Minesweeper.GameState>(Api.Minesweeper.DEFAULT_GAMESTATE);
    const [popupActive, setPopupActive] = useState<boolean>(game.status === "won" || game.status === "lost");

    async function handleStart(settings: MinesweeperSettingsData){
        Api.Minesweeper.createGame(settings.stake, settings.mines).then(data => {
            navigate(`/minesweeper/${data?.gameId}`);
        });
    }

    useEffect(() => {
        setPopupActive(game.status === "won" || game.status === "lost");
    }, [game])

    return (
        <main className="minesweeper">
            <div className="content">
                <Routes>
                    <Route path='/' element={
                        <MinesweeperSettings handleSubmit={handleStart}/>
                    }/>
                    <Route path='/:id' element={
                        <MinesweeperPrizes game={game} setGame={setGame}/>
                    }/>
                </Routes>
                <MinesweeperGame game={game} setGame={setGame}/>
            </div>
            {popupActive && <GameScorePopup game={game} gameTitle='Minesweeper' setPopupActive={setPopupActive} redirectUrl='/minesweeper'/>}
        </main>
    )
}