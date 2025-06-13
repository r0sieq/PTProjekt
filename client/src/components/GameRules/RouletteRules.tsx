
import { Link } from 'react-router-dom';
import './GameRules.css';

export default function RouletteRules(){
    return (
        <main className="rules home">
            <div className="content">
                <h1>Roulette rules</h1>
                <p>Roulette is a classic casino game in which players place bets on the outcome of a spinning wheel. The wheel is divided into numbered pockets, and bets can be placed on color, ranges of numbers, or even/odd results. The game combines chance and strategy, and remains one of the most popular gambling games worldwide.</p>
                <ol>
                    <li>
                        <h2>Spin the Wheel Yourself</h2>
                        <div>The player manually initiates each round by spinning the wheel. Just click the button to start the game.</div>
                    </li>
                    <li>
                        <h2>No Single Number Bets</h2>
                        <div>This version of roulette does not include bets on individual numbers. All other standard bet types are available.</div>
                    </li>
                    <li>
                        <h2>Multiple Bets Per Round</h2>
                        <div>Players can place multiple types of bets in a single round. For example, you can bet on red, even numbers, and the 1–18 range simultaneously.</div>
                    </li>
                    <li>
                        <h2>Available Bet Types</h2>
                        <div>
                            <ul>
                            <li>Color (Red / Black) – pays 1:1</li>
                            <li>Even / Odd – pays 1:1</li>
                            <li>Number Ranges (1–18 / 19–36) – pays 1:1</li>
                            <li>Dozens (1–12, 13–24, 25–36) – pays 2:1</li>
                            </ul>
                        </div>
                    </li>
                    <li>
                        <h2>Single Zero Included</h2>
                        <div>The wheel includes a single green "0" pocket. If the ball lands on zero, all bets lose except a direct bet on zero (if available).</div>
                    </li>
                    <li>
                        <h2>Minimum and Maximum Bet Limits</h2>
                        <div>The minimum bet per selection is 1 chip. The total value of all active bets cannot exceed the number of chips currently available to the player.</div>
                    </li>
                    <li>
                        <h2>No Real Money Betting</h2>
                        <div>This game is for entertainment purposes only and does not involve real money or gambling.</div>
                    </li>
                </ol>
                <Link to="/roulette" className='primary'>
                    Play
                </Link>
            </div>
        </main>
    )
}