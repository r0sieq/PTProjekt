import { Link } from "react-router-dom";

export default function SlotMachineRules(){
    return (
        <main className="rules home">
            <div className="content">
                <h1>Slot Machine Game Rules</h1>
                <p>
                    Slot Machine is a random game where you place a bet and spin the reels to land winning combinations of symbols with crazy multipliers.
                </p>

                <ol>
                    <li>
                        <h2>Place Your Bet</h2>
                        <div>Choose your bet amount before spinning the reels.</div>
                    </li>
                    <li>
                        <h2>Spin the Reels</h2>
                        <div>Hit the spin button and watch the reels turn and stop on random symbols.</div>
                    </li>
                    <li>
                        <h2>Winning Combinations</h2>
                        <div>You win if matching symbols land on the payline. Each symbol has a specific multiplier:</div>
                        <ul>
                            <li>🍒 – x2</li>
                            <li>🍋 – x3</li>
                            <li>🍇 – x5</li>
                            <li>🍉 – x8</li>
                            <li>💎 – x15</li>
                            <li>🔥 – x30</li>
                            <li>💀 – x100</li>
                        </ul>
                    </li>
                    <li>
                        <h2>Bonus Combos</h2>
                        <div>Special symbol combos increase your multiplier:</div>
                        <ul>
                            <li>💎 + 💎 + 🔥 → x20 multiplier</li>
                            <li>💀 + 🔥 + 💀 → x50 multiplier</li>
                        </ul>
                    </li>
                    <li>
                        <h2>Jackpot</h2>
                        <div>Three 💀 in a row triggers the jackpot: x1000 multiplier with special effects.</div>
                    </li>
                    <li>
                        <h2>Bet Limits</h2>
                        <div>Minimum bet is 1 chip, maximum bet is your available chips.</div>
                    </li>
                    <li>
                        <h2>No Real Money Gambling</h2>
                        <div>This game is for entertainment only and does not involve real money gambling.</div>
                    </li>
                </ol>
                <Link to="/slots" className='primary'>
                    Play
                </Link>
            </div>
        </main>
    )
}