import Icon from "../../Icon";
import Api from "../../api";
import { betsInfos } from "./RouletteBetsPopup";
import useWallet from "../../hooks/useWallet";

interface RouletteToolbarProps {
    readonly bets: Api.Roulette.Bets;
    setBetsPopup: React.Dispatch<React.SetStateAction<boolean>>;
    setBets: React.Dispatch<React.SetStateAction<Api.Roulette.Bets>>;
    onSpin: (e: React.FormEvent<HTMLFormElement>) => void;
    readonly loading: boolean
}

export default function RouletteToolbar(props: RouletteToolbarProps){

    const { balance } = useWallet();

    const stakeSum = [...betsInfos].map(([key]) => props.bets[key]).reduce((a, b) => a + b);

    return (
        <form className="roulette-toolbar" onSubmit={props.onSpin}>
            <div className="top">
                <button type="submit" className="primary" disabled={stakeSum > balance || props.loading || stakeSum <= 0}>
                    Spin
                </button>
                <div className="stake">
                    {stakeSum === 0 ? 
                        "for free" 
                        : 
                        stakeSum > balance ? 
                            "not enough balance!"
                            :
                            <> stake: {stakeSum}<Icon.Token /></>
                    }
                </div>
            </div>
            <div className="bottom">
                <div className="bets">
                    {[...betsInfos].filter(([key]) => props.bets[key]).map(([key, value]) => (
                        <div className="placed-bet" key={key}>
                            <div className="name">
                                {value.title}
                            </div>
                            <div className="stake">
                                {props.bets[key]}<Icon.Token />
                            </div>
                            <div className="multiplier">
                                x{value.multiplier}
                            </div>
                            <button type="button" onClick={() => props.setBets(current => ({...current, [key]: 0}))}>
                                <Icon.Trash />
                            </button>
                        </div>
                    ))}
                </div>
                <button className="add-bet" type="button" onClick={() => props.setBetsPopup(true)}>
                    <Icon.Plus /> Add bet
                </button>
            </div>
        </form>
    )
}