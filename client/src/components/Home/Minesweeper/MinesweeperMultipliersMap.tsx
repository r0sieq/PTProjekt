import Api from "../../../api"
import { calculateMinesweeperMultiplier } from "../../../utils";

interface MinesweeperMultipliersMapProps {
    game: Api.Minesweeper.GameState;
}

export default function MinesweeperMultipliersMap(props: MinesweeperMultipliersMapProps){

    const streak = props.game.revealedPositions.length;
    const mines = props.game.mines;
    const left = (25 - mines) - streak;
    const currentMultiplier = calculateMinesweeperMultiplier(mines, streak); 
    const nextMultiplier = calculateMinesweeperMultiplier(mines, streak + 1);
    const lastMultiplier = calculateMinesweeperMultiplier(mines, 25 - mines);

    const betweenSteps = Math.min(Math.max(0, left - 1), 3);

    return (
        <div className="mines-steps">
            <div className="mine-step" data-current="true" data-achieved={false}>
                <div className="circle-container">
                    <div className="circle">
                        <div className="line"></div>
                    </div>
                </div>
                <div className="text" key={streak} data-animate={streak !== 0}>
                    <span className="multiplier">
                        x{currentMultiplier.toFixed(2)}
                    </span>
                    <span className="desc">
                        current multiplier
                    </span>
                </div>
            </div>
            {(left !== 1) && <div className="mine-step" data-achieved={false}>
                <div className="circle-container">
                    <div className="circle">
                        <div className="line">
                            {Array.from({length: betweenSteps}).fill(0).map((_, i) => (
                                <div className="minicircle" key={i}></div>
                            ))}
                        </div>
                    </div>
                </div>
                <div className="text" key={streak} data-animate={streak !== 0}>
                    <span className="multiplier">
                        x{nextMultiplier.toFixed(2)}
                    </span>
                    <span className="desc">
                        next multiplier
                    </span>
                </div>
            </div>}
            <div className="mine-step" data-achieved={false}>
                <div className="circle-container">
                    <div className="circle">
                        <div className="line">
                        </div>
                    </div>
                </div>
                <div className="text" key={streak} data-animate={false}>
                    <span className="multiplier">
                        x{lastMultiplier.toFixed(2)}
                    </span>
                    <span className="desc">
                        final multiplier
                    </span>
                </div>
            </div>
        </div>    
    )
}