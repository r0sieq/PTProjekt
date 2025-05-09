import './Gamemode.css'
import { HTMLAttributes, ReactNode } from "react";
import { Link } from "react-router-dom";

interface GamemodeProps extends HTMLAttributes<HTMLDivElement> {
    title: string,
    children: ReactNode | ReactNode[],
    infoURL?: string,
    playURL?: string,
    "data-mode": string,
}

export default function Gamemode(props: GamemodeProps){

    return (
        <section className="gamemode" data-mode={props["data-mode"]}>
            <div className="wrapper">
                <h1>{props.title}</h1>
                <p>{props.children}</p>
                <div className="buttons">
                    <Link to={props.playURL ?? "/"} className="primary">
                        Play
                    </Link>
                    <Link to={props.infoURL ?? "/"} className="secondary">
                        More
                    </Link>
                </div>
            </div>
        </section>
    )
}