import { useEffect } from "react";
import Api from "../../api"
import PlayingCard from "../Home/PlayingCard/PlayingCard"
import { useNavigate, useParams } from "react-router-dom";

interface RideTheBusGameProps {
    game: Api.Ridethebus.GameState,
    setGame: React.Dispatch<React.SetStateAction<Api.Ridethebus.GameState>>
}

export default function RideTheBusGame(props: RideTheBusGameProps){

    const navigate = useNavigate();

    const params = useParams();
    const id = params["*"];

    useEffect(() => {
        if(!id) return void props.setGame(Api.Ridethebus.DEFAULT_GAMESTATE);
        Api.authToken().then(async headers => {
            const res = await fetch(`${Api.URL}/game/ridethebus/getgame`, { 
                headers,
                method: "POST",
                body: JSON.stringify({
                    gameId: id
                })
            })
            const data = await res.json() as Api.Ridethebus.GameState;
            console.log("Nowe dane:", data)
            if("error" in data){
                console.warn(data.error, id);
                navigate("/ridethebus");
            } else {
                props.setGame(data);
            }
        })
    }, [id])

    const cards = props.game.cards.map((card) => {
        const [colorString, figureString] = card.split("-");
        const colorIndex = parseInt(colorString);
        const figureIndex = parseInt(figureString);
        console.log(colorString, colorIndex)
        return {figureIndex, colorIndex, revealed: true}
    });

    while(cards.length < 4) cards.push({figureIndex: 2, colorIndex: 2, revealed: false})

    return (
        <div className="ridethebus-game">
            <div className="cards">
                {cards.map((card, i) => (
                    <PlayingCard 
                        figureIndex={card.figureIndex} 
                        colorIndex={card.colorIndex} 
                        current={props.game.round === i} 
                        revealed={card.revealed}
                        key={i}
                    />
                ))}
            </div>
        </div>
    )
}