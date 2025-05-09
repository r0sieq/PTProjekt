import { useState } from "react";
import { RidethebusSettingsData } from "./RideTheBus"
import StakeSelector from "../StakeSelector/StakeSelector";

interface RideTheBusSettingsProps {
    handleSubmit: (settings: RidethebusSettingsData) => void;
}

export default function RideTheBusSettings(props: RideTheBusSettingsProps){

    const [stake, setStake] = useState<number>(0);
    
    const onStakeChange = (value: number) => setStake(value);

    return (
        <form className="ridethebus-bottom ridethebus-settings" onSubmit={e => {e.preventDefault(); props.handleSubmit({stake})}}>
            <h1>Ride The Bus</h1>
            <div className="stake">
                <h2>Stake</h2>
                <StakeSelector defaultValue={0} onChange={onStakeChange}/>
            </div>
            <button className="primary" type="submit" disabled={stake <= 0}>
                Play
            </button>
        </form>
    )
}