import Gamemode from './Gamemode/Gamemode'
import './Home.css'
import Miniprofile from './Miniprofile/Miniprofile'

export default function Home(){
    return (
        <main className='home'>
            <div className="content">
                <div className="row">
                    <Miniprofile />
                    <Gamemode title='Roulette' data-mode='roulette'>
                        Roulette is a casino game which was likely developed from the Italian game Biribi. In the game, a player may choose to place a bet on a single number, various groupings of numbers, the color red or black, whether the number is odd or even, or if the number is high or low.
                    </Gamemode>
                </div>
                <div className="row">
                    <Gamemode title='Ride The Bus' data-mode='ridethebus' playURL='/ridethebus'>
                        Ride the Bus is a fast-paced card game adapted for casino-style play. Players must correctly guess card attributes (color, higher/lower, inside/outside, suit) in a sequence. 
                    </Gamemode>
                    <Gamemode title='Slot Machines' data-mode='slotmachines'>
                        One-Armed Bandit is a classic casino slot machine game. Players spin the reels by pulling a lever or pressing a button, aiming to match symbols across paylines. Wins depend on symbol combinations and payouts vary by game.
                    </Gamemode>
                </div>
                <div className="row">
                    <Gamemode title='Minesweeper' data-mode='minesweeper' playURL='/minesweeper'>
                    In this casino version of Minesweeper, players are presented with a 5x5 grid. Before starting, the player chooses the number of mines hidden on the board — anywhere from 1 to 24 — and places their bet. The goal is to uncover safe tiles without hitting a mine. Each safe tile revealed increases the potential winnings, and the player can choose to cash out at any time. Hitting a mine ends the round and the player loses the bet.
                    </Gamemode>
                </div>
            </div>
        </main>
    )
}