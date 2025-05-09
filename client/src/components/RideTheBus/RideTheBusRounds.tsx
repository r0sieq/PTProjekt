import Api from "../../api";

interface RideTheBusRoundsProps {
    game: Api.Ridethebus.GameState
}

export default function RideTheBusRounds(props: RideTheBusRoundsProps){

    return (
        <div className="rounds">
            <div className="round" data-active={props.game.round === 0} data-achieved={props.game.round > 0}>
                <div className="title">Round 1</div>
                <div className="desc">Red or black</div>
                <div className="multiplier">x1.5</div>
            </div>
            <div className="line">
                <div className="indicator" data-inprogress={props.game.cards.length > 0 && props.game.round > 0}></div>
            </div>
            <div className="round" data-active={props.game.round === 1} data-achieved={props.game.round > 1}>
                <div className="title">Round 2</div>
                <div className="desc">Higher or lower</div>
                <div className="multiplier">x3</div>
            </div>
            <div className="line">
                <div className="indicator" data-inprogress={props.game.cards.length > 1 && props.game.round > 1}></div>
            </div>
            <div className="round" data-active={props.game.round === 2} data-achieved={props.game.round > 2}>
                <div className="title">Round 2</div>
                <div className="desc">Inside or outside</div>
                <div className="multiplier">x6</div>
            </div>
            <div className="line">
                <div className="indicator" data-inprogress={props.game.cards.length > 2 && props.game.round > 2}></div>
            </div>
            <div className="round" data-active={props.game.round === 3} data-achieved={props.game.round > 3}>
                <div className="title">Round 4</div>
                <div className="desc">Guess the suit</div>
                <div className="multiplier">x15</div>
            </div>
            
        </div>
    )
}