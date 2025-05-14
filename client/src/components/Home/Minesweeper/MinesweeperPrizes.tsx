import { useState } from "react";
import Icon from "../../../Icon";
import Api from "../../../api";
import { useNavigate, useParams } from "react-router-dom";
import MinesweeperMultipliersMap from "./MinesweeperMultipliersMap";

interface MineSweeperPrizesProps {
    setGame: React.Dispatch<React.SetStateAction<Api.Minesweeper.GameState>>
    game: Api.Minesweeper.GameState
}

export default function MinesweeperPrizes(props: MineSweeperPrizesProps){

    const params = useParams();

    const navigate = useNavigate();

    const [actionLoading, setActionLoading] = useState<boolean>(false);

    async function handleSubmit(e: React.FormEvent<HTMLFormElement>){
        e.preventDefault();
        if(props.game.status !== "active"){
            return void navigate("/minesweeper");
        }
        setActionLoading(true);
        const headers = await Api.authToken();
        const res = await fetch(`${Api.URL}/game/minesweeper/cashout`, {
            headers,
            method: "POST",
            body: JSON.stringify({
                gameId: params["*"]
            })
        });
        const data = await res.json() as Api.Minesweeper.GameState;
        if("error" in data){
            console.log(data.error);
        } else {
            props.setGame(data);
        }
        setActionLoading(false);
    }

    return (
        <form className="minesweeper-prizes minesweeper-aside" onSubmit={handleSubmit}>
            <h1>Minesweeper</h1>
            <h2>Amount of mines: <span>{props.game.mines}</span></h2>
            <div className="row">
                <h2>Stake: <span>{props.game.stake.toFixed(2)} <Icon.Token /></span></h2>
                <h2>Prize: <span>{props.game.gameBalance.toFixed(2)} <Icon.Token /></span></h2>
            </div>
            <MinesweeperMultipliersMap game={props.game}/>
            { props.game.revealedPositions.length === 0 || props.game.status !== "active" ?
                <button className="secondary" type="submit" disabled={actionLoading}>
                    { actionLoading ?  <Icon.Loading className="loading"/> : "Leave" }
                </button>
                :
                <button className="primary" type="submit" disabled={actionLoading}>
                    { actionLoading ? <Icon.Loading className="loading"/> : "Cash out" }
                </button>

            }
        </form>
    )
}