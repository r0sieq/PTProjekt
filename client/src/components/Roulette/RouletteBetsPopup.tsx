import { useState } from "react";
import Api from "../../api";
import Icon from "../../Icon";

import './RouletteBetsPopup.css'
import RouletteBet from "./RouletteBet";

interface RouletteBetsPopupProps {
    setBetsPopup: React.Dispatch<React.SetStateAction<boolean>>;
    setBets: React.Dispatch<React.SetStateAction<Api.Roulette.Bets>>;
    readonly bets: Api.Roulette.Bets;
}

export default function RouletteBetsPopup(props: RouletteBetsPopupProps) {

    const [activeBet, setActiveBet] = useState<Api.Roulette.BetName | null>(null);

    return (
        <div className="roulette-bets-popup-wrapper">
            <div className="roulette-bets-popup-window">
                <div className="top-bar">
                    <div className="title">Select new bet</div>
                    <button className="close" onClick={() => props.setBetsPopup(false)}>
                        <Icon.Close />
                    </button>
                </div>
                <div className="bets">
                    {betsInfos.map(([key, value]) => (
                        <RouletteBet 
                            {...value} 
                            betKey={key} 
                            setActiveBet={setActiveBet} 
                            activeBet={activeBet} 
                            key={key} 
                            setBets={props.setBets}
                            visible={!props.bets[key]}
                        />
                    ))}
                </div>
            </div>
        </div>
    )
}

export const betsInfos: Array<[Api.Roulette.BetName, { title: string | React.ReactNode, multiplier: number }]> = [
    ["onRed", { title: <><span className="red">Red</span> color</>, multiplier: 2}],
    ["onBlack", { title: <><span className="black">Black</span> color</>, multiplier: 2 }],
    ["onGreen", { title: <><span className="green">Green</span> color</>, multiplier: 14 }],
    ["onEven", { title: <><span className="black">Even</span> number</>, multiplier: 2 }],
    ["onOdd", { title: <><span className="black">Odd</span> number</>, multiplier: 2 }],
    ["onSt12", { title: <>in <span className="black">1st 12</span></>, multiplier: 3 }],
    ["onNd12", { title: <>in <span className="black">2nd 12</span></>, multiplier: 3 }],
    ["onRd12", { title: <>in <span className="black">3rd 12</span></>, multiplier: 3 }],
    ["onSt18", { title: <>in <span className="black">1 to 18</span> number</>, multiplier: 2 }],
    ["onNd18", { title: <>in <span className="black">19 to 36</span> number</>, multiplier: 2 }],
]