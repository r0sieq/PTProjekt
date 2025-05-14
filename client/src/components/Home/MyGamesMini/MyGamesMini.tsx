import { useEffect, useState } from "react"
import Api from "../../../api"
import GameInfo from "../GameInfo/GameInfo"

import './MyGamesMini.css'
import Icon from "../../../Icon"

export default function MyGamesMini(){

    const DEFAULT_DISPLAY_COUNT = 3;

    const [games, setGames] = useState<Api.Game[] | null>(null)

    const [displayCount, setDisplayCount] = useState<number>(DEFAULT_DISPLAY_COUNT);

    const [refresh, setRefresh] = useState<number>(Date.now());

    const [loading, setLoading] = useState<boolean>(false);

    useEffect(() => {
        Api.authToken().then(async headers => {
            setLoading(true);
            const res = await fetch(`${Api.URL}/game/getgames`, {
                headers,
                method: "POST",
                body: ""
            })
            const data = await res.json() as Api.Game[];
            setGames(data.sort((a, b) => b.game.lastAction - a.game.lastAction));
            setDisplayCount(DEFAULT_DISPLAY_COUNT);
            setLoading(false);
        })

    }, [refresh])

    return (
        <div className="mygames-mini" data-loading={loading}>
            <h2>
                Active games
                <button onClick={() => setRefresh(Date.now())}>
                    <Icon.Refresh />
                </button>
            </h2>
            <div className="games">
                {games?.map(game => <GameInfo details={game} key={game.id}/>).slice(0, displayCount)}
            </div>
            {(games && games.length === 0) ? <div className="empty">No recent activity.</div> : null}
            <button className="expand" onClick={() => setDisplayCount(current => current + DEFAULT_DISPLAY_COUNT)} disabled={displayCount > (games?.length ?? 0)}>
                Show more
            </button>
        </div>
    )
}