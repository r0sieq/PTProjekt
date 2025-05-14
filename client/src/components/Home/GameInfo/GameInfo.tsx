import { useNavigate } from 'react-router-dom'
import Api from '../../../api'
import Icon from '../../../Icon'
import './GameInfo.css'
import useWallet from '../../../hooks/useWallet'
import { useState } from 'react'

interface GameInfoProps {
    details: Api.Game
}

export default function GameInfo(props: GameInfoProps){

    const date = new Date(props.details.game.lastAction)

    const [hours, minutes] = date.toLocaleTimeString().split(":");

    const navigate = useNavigate();

    const { balance, setBalance } = useWallet();

    const [deleted, setDeleted] = useState<boolean>(false);

    function handleContinue(){
        navigate(`/${props.details.name}/${props.details.id}`);
    }

    async function handleCancel(){
        const headers = await Api.authToken();
        const res = await fetch(`${Api.URL}/game/${props.details.name}/cashout`, {
            headers,
            method: "POST",
            body: JSON.stringify({
                gameId: props.details.id
            })
        })
        const data = await res.json();
        if("gameBalance" in data){
            setBalance(balance + data.gameBalance);
            setDeleted(true);
        }
    }

    return (
        <div className="game-info" data-deleted={deleted}>
            <div className="mode">
                {props.details.name}
            </div>
            <div className="details">
                <div className="date">
                    {date.toLocaleDateString()} - {hours}:{minutes}
                </div>
                <div className="stake">
                    {props.details.game.stake.toFixed(2)} <Icon.Token />
                </div>
            </div>
            <div className="action">
                <button onClick={handleContinue}>
                    <Icon.Play />
                    <div className="label">&nbsp;Continue</div>
                </button>
                <button onClick={handleCancel}>
                    <Icon.Trash/>
                    <div className="label">&nbsp;Cancel</div>
                </button>
            </div>
        </div>
    )
}