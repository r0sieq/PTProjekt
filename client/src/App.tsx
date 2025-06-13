import { Route, Routes } from 'react-router-dom';
import './App.css';
import './assets/font.css'
import Nav from './components/Nav/Nav';
import Home from './components/Home/Home';
import Auth from './components/Auth/Auth';
import RideTheBus from './components/RideTheBus/RideTheBus';
import Minesweeper from './components/Home/Minesweeper/Minesweeper';
import Roulette from './components/Roulette/Roulette';
import GlobalErrors from './components/GlobalErrors/GlobalErrors';
import { useState } from 'react';
import BalancePopup from './components/BalancePopup/BalancePopup';
import RouletteRules from './components/GameRules/RouletteRules';
import RideTheBusRules from './components/GameRules/RidethebusRules';
import MinesweeperRules from './components/GameRules/MinesweeperRules';
import SlotMachine from './components/SlotMachine/SlotMachine';
import SlotMachineRules from './components/GameRules/SlotmachineRules';

export default function App(){

    const [balancePopup, setBalancePopup] = useState<boolean>(false);

    return (
        <>
            <Nav setBalancePopup={setBalancePopup}/>
            <Routes>
                <Route path='/' element={<Home setBalancePopup={setBalancePopup}/>}/>
                <Route path='/auth/:mode' element={<Auth />}/>
                <Route path='/auth' element={<Auth />}/>
                <Route path='/ridethebus/*' element={<RideTheBus />}/>
                <Route path='/minesweeper/*' element={<Minesweeper />}/>
                <Route path='/roulette/*' element={<Roulette />}/>
                <Route path='/slots' element={<SlotMachine />}/>
                <Route path='/rules/roulette' element={<RouletteRules />}/>
                <Route path='/rules/ridethebus' element={<RideTheBusRules />}/>
                <Route path='/rules/minesweeper' element={<MinesweeperRules />}/>
                <Route path='/rules/slots' element={<SlotMachineRules />}/>
            </Routes>
            <GlobalErrors />
            { balancePopup && <BalancePopup setBalancePopup={setBalancePopup}/> }
        </>
    )
}