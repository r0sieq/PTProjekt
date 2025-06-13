import { Link } from "react-router-dom";

export default function RideTheBusRules(){
    return (
        <main className="rules home">
            <div className="content">
                <h1>Ride the Bus Game Rules</h1>
                <p>Ride the Bus is a card-guessing game where players go through a series of increasingly difficult questions about the cards drawn from a standard deck. The game tests memory, luck, and logical deduction, and is commonly played as a party game or drinking game in its original form.</p>
                <ol>
                    <li>
                        <h2>Guess the Color</h2>
                        <div>The player guesses whether the first card will be red (hearts or diamonds) or black (spades or clubs). A correct guess pays <strong>1.5×</strong> the bet.</div>
                    </li>
                    <li>
                        <h2>Guess Higher or Lower</h2>
                        <div>For the second card, the player must guess whether it will be higher or lower in value than the first one. Ace is the highest card. A correct guess pays <strong>3×</strong> the bet.</div>
                    </li>
                    <li>
                        <h2>Guess Inside or Outside</h2>
                        <div>For the third card, the player guesses whether its value falls between (inside) or outside the values of the first two cards. A correct guess pays <strong>6×</strong> the bet.</div>
                    </li>
                    <li>
                        <h2>Guess the Suit</h2>
                        <div>The fourth card requires the player to guess its exact suit: hearts, diamonds, spades, or clubs. A correct guess pays <strong>15×</strong> the bet.</div>
                    </li>
                    <li>
                        <h2>One Attempt per Stage</h2>
                        <div>If the player guesses incorrectly at any stage, the game resets to the beginning of the sequence.</div>
                    </li>
                    <li>
                        <h2>Progressive Difficulty</h2>
                        <div>Each correct guess advances the player to the next round. Successfully guessing all four cards completes the ride.</div>
                    </li>
                    <li>
                        <h2>Minimum and Maximum Bet Limits</h2>
                        <div>The minimum bet per selection is 1 chip. The total value of all active bets cannot exceed the number of chips currently available to the player.</div>
                    </li>
                    <li>
                        <h2>No Real Money or Drinking Required</h2>
                        <div>This is a digital, entertainment-only version of the game. No alcohol or real money is involved.</div>
                    </li>
                </ol>
                <Link to="/ridethebus" className='primary'>
                    Play
                </Link>
            </div>
        </main>
    )
}