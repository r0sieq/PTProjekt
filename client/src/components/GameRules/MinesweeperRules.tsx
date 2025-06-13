import { Link } from "react-router-dom";

export default function MinesweeperRules(){
    return (
        <main className="rules home">
            <div className="content">
                <h1>Minesweeper Game Rules</h1>
                <p>Minesweeper is a risk-based game where players select the number of mines hidden on a grid and place a bet. The objective is to uncover safe tiles one by one without hitting a mine. The multiplier increases with each safe tile uncovered, based on the total number of mines and how many have been revealed.</p>
                
                <ol>
                    <li>
                        <h2>Select Mines and Bet Amount</h2>
                        <div>Before starting, the player chooses how many mines will be hidden on the board and places their bet.</div>
                    </li>
                    <li>
                        <h2>Reveal Safe Tiles</h2>
                        <div>The player uncovers tiles one at a time, aiming to avoid mines. Each safe tile revealed increases the multiplier and the potential winnings.</div>
                    </li>
                    <li>
                        <h2>Multiplier Calculation</h2>
                        <div>The multiplier grows dynamically based on the ratio of total mines to safe tiles uncovered. The more safe tiles revealed without hitting a mine, the higher the multiplier.</div>
                    </li>
                    <li>
                        <h2>Mine Hit Ends Round</h2>
                        <div>If the player uncovers a tile with a mine, the round immediately ends and the bet is lost.</div>
                    </li>
                    <li>
                        <h2>Cash Out Anytime</h2>
                        <div>The player may choose to cash out their current winnings after any successful tile reveal before uncovering a mine.</div>
                    </li>
                    <li>
                        <h2>Minimum and Maximum Bet Limits</h2>
                        <div>The minimum bet is 1 chip. The maximum bet cannot exceed the number of chips currently available to the player.</div>
                    </li>
                    <li>
                        <h2>No Real Money Gambling</h2>
                        <div>This game is intended for entertainment purposes only and does not involve real money or gambling.</div>
                    </li>
                </ol>
                <Link to="/minesweeper" className='primary'>
                    Play
                </Link>
            </div>
        </main>
    )
}