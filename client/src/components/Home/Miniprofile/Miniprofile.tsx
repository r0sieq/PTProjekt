import { Link } from "react-router-dom";

import './Miniprofile.css'

export default function Miniprofile(){

    return (
        <section className="miniprofile">
            <div className="wrapper">
                <h1>Hello... well, that's the problem.</h1>
                <p>
                    It seems, like you are not signed in yet. Such action is required to participate in games.
                    </p>
                <div className="buttons">
                    <Link to="/auth" className="primary">Sign in</Link>
                    <Link to="/auth" className="secondary">Create an account</Link>
                </div>
            </div>
        </section>
    )
}