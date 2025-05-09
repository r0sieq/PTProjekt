import { Route, Routes } from 'react-router-dom';
import './App.css';
import './assets/font.css'
import Nav from './components/Nav/Nav';
import Home from './components/Home/Home';
import Auth from './components/Auth/Auth';
import RideTheBus from './components/RideTheBus/RideTheBus';
import Minesweeper from './components/Home/Minesweeper/Minesweeper';

export default function App(){
    return (
        <>
            <Nav />
            <Routes>
                <Route path='/' element={<Home />}/>
                <Route path='/auth/:mode' element={<Auth />}/>
                <Route path='/auth' element={<Auth />}/>
                <Route path='/ridethebus/*' element={<RideTheBus />}/>
                <Route path='/minesweeper/*' element={<Minesweeper />}/>
            </Routes>
        </>
    )
}