import { useEffect } from "react";

import './MinesweeperGame.css'
import Icon from "../../../Icon";
import Api from "../../../api";
import { useNavigate, useParams } from "react-router-dom";

interface MinesweeperGameProps {
    setGame: React.Dispatch<React.SetStateAction<Api.Minesweeper.GameState>>
    game: Api.Minesweeper.GameState
}

export default function MinesweeperGame(props: MinesweeperGameProps){

    const navigate = useNavigate();

    const params = useParams();
    const id = params["*"];

    async function handleReveal(index: number){
        const headers = await Api.authToken();
        const res = await fetch(`http://localhost:3000/game/minesweeper/reveal`, {
            headers,
            method: "POST",
            body: JSON.stringify({
                gameId: id,
                squareIndex: index,
            })
        })
        const data = await res.json() as Api.Minesweeper.GameState;
        console.log("Reveal", data)
        if("error" in data){
            console.error(data.error);
        } else props.setGame(data);
    }

    useEffect(() => {
        if(!id) return void props.setGame(Api.Minesweeper.DEFAULT_GAMESTATE);
        Api.authToken().then(async headers => {
            const res = await fetch(`http://localhost:3000/game/minesweeper/getgame`, { 
                headers,
                method: "POST",
                body: JSON.stringify({
                    gameId: id
                })
            })
            const data = await res.json() as Api.Minesweeper.GameState;
            console.log("Nowe dane:", data)
            if("error" in data){
                console.warn(data.error, id);
                navigate("/minesweeper");
            } else {
                props.setGame(data);
            }
        })
    }, [id])

    return (
        <div className="minesweeper-game" data-disabled={props.game.status !== "active" || props.game.stake === 0}>
            {props.game.state.map((value, i) => (
                <div className="minesweeper-square" key={i} role="button" onClick={() => handleReveal(i)} data-content={value}>
                    { value === "mine" && <Icon.Bomb /> }
                    { value === "unknown" && "?" }
                </div>
            ))}
        </div>
    )
}