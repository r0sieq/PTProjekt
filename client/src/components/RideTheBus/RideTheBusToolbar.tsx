import { useState } from "react";
import Api from "../../api";
import Icon from "../../Icon";
import RideTheBusRounds from "./RideTheBusRounds";
import RideTheBusChoices from "./RideTheBusChoices";
import { useNavigate, useParams } from "react-router-dom";

interface RideTheBusToolbarProps {
    game: Api.Ridethebus.GameState,
    setGame: React.Dispatch<React.SetStateAction<Api.Ridethebus.GameState>>
}

export default function RideTheBusToolbar(props: RideTheBusToolbarProps){
    
    const params = useParams();
    const navigate = useNavigate();

    const id = params["*"];
    
    const [actionLoading, setActionLoading] = useState<boolean>(false);
    
    async function handleAction(e: React.FormEvent<HTMLFormElement>){
        e.preventDefault();
        if(props.game.status !== "active"){
            return void navigate("/ridethebus");
        }
        setActionLoading(true);
        const headers = await Api.authToken();
        const res = await fetch(`${Api.URL}/game/ridethebus/cashout`, {
            headers,
            method: "POST",
            body: JSON.stringify({gameId: id})
        })
        const data = await res.json() as Api.Ridethebus.GameState;
        if("error" in data){
            console.warn(data.error);
            navigate("/ridethebus");
        } else {
            props.setGame(data);
        }
        setActionLoading(false);
    }

    return (
        <form className="ridethebus-toolbar ridethebus-bottom" onSubmit={handleAction}>
            <RideTheBusRounds game={props.game}/>
            <RideTheBusChoices game={props.game} setGame={props.setGame} id={id}/>
            <div className="controlls">
                <h2>Stake: <span>{props.game.stake.toFixed(2)}</span> <Icon.Token /></h2>
                { props.game.cards.length === 0 || props.game.status !== "active" ?
                    <button className="secondary" type="submit" disabled={actionLoading}>
                        { actionLoading ?  <Icon.Loading className="loading"/> : "Leave" }
                    </button>
                    :
                    <button className="primary" type="submit" disabled={actionLoading}>
                        { actionLoading ? <Icon.Loading className="loading"/> : "Cash out" }
                    </button>
                
                }
                <h2>Prize: <span>{props.game.gameBalance.toFixed(2)}</span> <Icon.Token /></h2>
            </div>
        </form>
    )
}