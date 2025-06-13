import React, { useState } from "react"
import StakeSelector from "../StakeSelector/StakeSelector";
import Api from "../../api";

interface RouletteBetProps {
    readonly title: React.ReactNode | string,
    readonly multiplier?: number;
    readonly betKey: Api.Roulette.BetName;
    readonly visible: boolean;
    setActiveBet: React.Dispatch<React.SetStateAction<Api.Roulette.BetName | null>>;
    activeBet: Api.Roulette.BetName | null;
    setBets: React.Dispatch<React.SetStateAction<Api.Roulette.Bets>>
}

export default function RouletteBet(props: RouletteBetProps){
    const [stake, setStake] = useState<number>(0);
    
    function handleSubmit(e: React.FormEvent<HTMLFormElement>){
        e.preventDefault();
        props.setBets(current => {
            return { ...current, [props.betKey]: stake };
        })
        props.setActiveBet(null);
    }

    function handleReset(){
        setStake(0);
        props.setActiveBet(null);
    }

    return (
        <div className="bet" key={props.betKey} onClick={() => props.setActiveBet(props.betKey)} data-visible={props.visible}>
            <div className="head">
                <div className="name">{props.title}</div>
                <div className="multiplier">x{props.multiplier}</div>
            </div>
            <form onSubmit={handleSubmit} onReset={handleReset} data-active={props.activeBet === props.betKey}>
                <StakeSelector onChange={value => setStake(value)} defaultValue={0}/>
                <div className="buttons">
                    <button type="reset" className="secondary">
                        Cancel
                    </button>
                    <button type="submit" className="primary" disabled={stake < 1}>
                        Confirm
                    </button>
                </div>
            </form>

        </div>
    )
}