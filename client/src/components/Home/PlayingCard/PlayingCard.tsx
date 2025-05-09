import Icon from '../../../Icon';
import './PlayingCard.css'

interface PlayingCardProps {
    readonly figureIndex: number,
    readonly colorIndex: number,
    readonly revealed: boolean,
    readonly current?: boolean
}

const cardFigures = ["2", "3", "4", "5", "6", "7", "8", "9", "10", "J", "Q", "K", "A"];
const cardColors = ["club", "diamond", "heart", "spade"];
const cardIcons = [Icon.Card.Club, Icon.Card.Diamond, Icon.Card.Heart, Icon.Card.Spade ];

const cardSections = [
    [1, 0, 0, 0, 0, 0, 1], //2
    [1, 0, 0, 1, 0, 0, 1], //3
    [2, 0, 0, 0, 0, 0, 2], //4
    [2, 0, 0, 1, 0, 0, 2], //5
    [2, 0, 0, 2, 0, 0, 2], //6
    [2, 0, 1, 1, 1, 0, 2], //7
    [2, 0, 1, 2, 1, 0, 2], //8
    [2, 0, 2, 1, 2, 0, 2], //9
    [2, 1, 2, 0, 2, 1, 2], //10
    [0, 0, 0, "J", 0, 0, 0], //J
    [0, 0, 0, "Q", 0, 0, 0], //Q
    [0, 0, 0, "K", 0, 0, 0], //K
    [0, 0, 0, 1, 0, 0, 0] //A
]

export default function PlayingCard(props: PlayingCardProps){

    const CardIcon = cardIcons[props.colorIndex] || Icon.Close
    const figure = cardFigures[props.figureIndex]

    const sections = cardSections[props.figureIndex];

    return (
        <div className="playing-card" data-color={cardColors[props.colorIndex]} data-revealed={!props.revealed} data-animate={true} data-current={props.current === true}>
            <div className="playing-card-content">
                <div className="playing-card-back">
                    <div className="background">
                        <div className="logo">
                            CASINO
                        </div>
                    </div>
                </div>
                <div className="top playing-card-header">
                    <div className="figure">{figure}</div>
                    <div className="symbol">{<CardIcon />}</div>
                </div>
                <div className="shapes">
                    {sections.map((section, i) => (
                        <div className="section" key={i} data-reverse={i > 3}>
                            { typeof section === "string" ? <div className="special">{section}</div> :
                                Array.from({length: section}).map((_, j) => (
                                    <CardIcon key={j}/>
                                ))
                            }
                        </div>
                    ))}
                </div>
                <div className="bottom playing-card-header">
                    <div className="figure">{figure}</div>
                    <div className="symbol">{<CardIcon />}</div>
                </div>
            </div>
        </div>
    )
}