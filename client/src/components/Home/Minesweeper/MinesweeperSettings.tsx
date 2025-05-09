import { useState } from "react";
import CustomSlider from "../../CustomSlider/CustomSlider";
import Input from "../../Input/Input";
import StakeSelector from "../../StakeSelector/StakeSelector";
import { MinesweeperSettingsData } from "./Minesweeper";

interface MinesweeperSettingsProps {
    handleSubmit?: (data: MinesweeperSettingsData) => void,
}

export default function MinesweeperSettings(props: MinesweeperSettingsProps){

    const [minesAmount, setMinesAmount] = useState<number>(5);
    const [stake, setStake] = useState<number>(0);

    const onStakeChange = (value: number) => setStake(value);



    return (
        <form className="minesweeper-settings minesweeper-aside" onSubmit={e => { e.preventDefault(); props.handleSubmit && props.handleSubmit({stake, mines: minesAmount})}}>
            <h1>Minesweeper</h1>
            <div className="mines-selector">
                <h2>Amount of mines: <span>{minesAmount}</span></h2>
                <CustomSlider 
                    onChange={value => setMinesAmount(value)}
                    defaultValue={5}
                    min={1}
                    max={24}
                    roundTo={1}
                />
            </div>
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