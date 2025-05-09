import { Link } from 'react-router-dom';
import Icon from '../../../Icon';
import './GameScorePopup.css';

interface GameScorePopupProps {
    game: {
        gameBalance: number,
        status: "won" | "lost" | "active",
        stake: number,
    };
    gameTitle: string,
    redirectUrl: string,
    setPopupActive: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function GameScorePopup(props: GameScorePopupProps){

    return (
        <div className="game-popup-container">
            <div className="game-popup-window" data-status={props.game.status}>
                <div className="main">
                    <h1>{props.game.status === "won" ? "You win!" : "You lost!"}</h1>
                    <div className='game-title'>{props.gameTitle}</div>
                    <div className="summary">
                        <div className="difference">
                            {props.game.gameBalance > 0 ? "+" : "-"}
                            {props.game.gameBalance === 0 ? props.game.stake.toFixed(2) : props.game.gameBalance.toFixed(2)} 
                            {" "}<Icon.Token />
                        </div>
                        <div className="multiplier">
                            x{(props.game.gameBalance / props.game.stake).toFixed(2)}
                        </div>
                    </div>
                </div>
                <div className="buttons">
                    <Link to={props.redirectUrl} className='primary' onClick={() => props.setPopupActive(false)}>
                        Play again
                    </Link>
                    <button className="secondary" onClick={() => props.setPopupActive(false)}>
                        Continue
                    </button>
                </div>
            </div>
        </div>
    )
}