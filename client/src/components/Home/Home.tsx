import { useEffect, useState } from 'react'
import Gamemode from './Gamemode/Gamemode'
import './Home.css'
import Miniprofile from './Miniprofile/Miniprofile'
import Api from '../../api'
import { Link, useLocation } from 'react-router-dom'
import MyGamesMini from './MyGamesMini/MyGamesMini'
import useGlobalError from '../../hooks/useGlobalError'

interface HomeProps {
    setBalancePopup: React.Dispatch<React.SetStateAction<boolean>>
}

export default function Home(props: HomeProps){

    const { addError } = useGlobalError()
    const [userData, setUserData] = useState<Api.UserData | null>(null);

    const location = useLocation();

    useEffect(() => {
        async function f(){
            try {
                const data = await Api.getBasicUserData();
                setUserData(data);
            } catch(err: any) {
                addError((
                    <>
                        {err.message}
                        <Link to="/auth">here</Link>
                    </>
                ), 15, err.message);
            }
        }
        f()
    }, [location.pathname])

    return (
        <main className='home'>
            <div className="content">
                {userData != null ? <Miniprofile userData={userData} setBalancePopup={props.setBalancePopup} /> : null}
                {userData != null ? <MyGamesMini /> : null}
                <h2>Classic gamemodes</h2>
                <div className="row">
                    <Gamemode title='Roulette' data-mode='roulette' playURL='/roulette'>
                        Roulette is a casino game which was likely developed from the Italian game Biribi. In the game, a player may choose to place a bet on a single number, various groupings of numbers, the color red or black, whether the number is odd or even, or if the number is high or low.
                    </Gamemode>
                    <Gamemode title='Slot Machines' data-mode='slotmachines'>
                        One-Armed Bandit is a classic casino slot machine game. Players spin the reels by pulling a lever or pressing a button, aiming to match symbols across paylines. Wins depend on symbol combinations and payouts vary by game.
                    </Gamemode>
                </div>
                <h2>New & popular</h2>
                <div className="row">
                    <Gamemode title='Ride The Bus' data-mode='ridethebus' playURL='/ridethebus'>
                        Ride the Bus is a fast-paced card game adapted for casino-style play. Players must correctly guess card attributes (color, higher/lower, inside/outside, suit) in a sequence. 
                    </Gamemode>
                    <Gamemode title='Minesweeper' data-mode='minesweeper' playURL='/minesweeper'>
                        In this casino version of Minesweeper, players are presented with a 5x5 grid. Before starting, the player chooses the number of mines hidden on the board. The goal is to uncover safe tiles without hitting a mine. 
                    </Gamemode>
                </div>
                <div className="row">
                </div>
            </div>
        </main>
    )
}