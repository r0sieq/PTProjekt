import { useState } from "react";
import Api from "../../api"
import Icon from "../../Icon";
import { useNavigate } from "react-router-dom";

interface RideTheBusChoicesProps {
    game: Api.Ridethebus.GameState;
    setGame: React.Dispatch<React.SetStateAction<Api.Ridethebus.GameState>>
    id: string | undefined,
}


const choices = [
    ["Black", "Red"],
    ["Higher", "Lower"],
    ["Inside", "Outside"],
    ["Club", "Diamond", "Spade", "Heart"]
]

export default function RideTheBusChoices(props: RideTheBusChoicesProps){

    const navigate = useNavigate();

    const choice = choices[props.game.round];

    const [loading, setLoading] = useState<boolean>(false);


    async function handleChoice(choiceIndex: number){
        setLoading(true);
        console.log(props.id, choiceIndex)
        const headers = await Api.authToken();
        console.log("pobieranie stanu gry")
        const res = await fetch("http://localhost:3000/game/ridethebus/placebet", {
            headers,
            method: "POST",
            body: JSON.stringify({
                gameId: props.id,
                guess: choiceIndex
            })
        })
        console.log("pobrano nowy stan gry");
        const data = await res.json() as Api.Ridethebus.GameState;
        console.log("zparsowano nowy stan gry")
        setLoading(false);
        if("error" in data){
            console.warn(data.error);
            navigate("/ridethebus");
        } else {
            console.log("new data:", data);
            props.setGame(data);
        }
        
    }

    return (
        <div className="choices">
            { loading ?
                <div className="loading">
                    <Icon.Loading className="loading"/>
                </div>
                : props.game.status === "active" ?
                    choice?.map((option, i) => (
                        <div className="choice" key={i} onClick={() => handleChoice(i)}>{option}</div>
                    ))
                : null
            }
        </div>
    )
}