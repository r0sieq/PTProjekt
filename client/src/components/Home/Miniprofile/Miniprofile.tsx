
import './Miniprofile.css'
import Api from "../../../api";
import Icon from "../../../Icon";
import { useNavigate } from 'react-router-dom';

interface MiniprofileProps {
    userData: Api.UserData;
}

export default function Miniprofile(props: MiniprofileProps){

    const navigate = useNavigate();

    async function handleLogout(){
        await Api.signOut();
        navigate("/auth")
    }

    return (
        <section className="miniprofile">
            <div className="user">
                <div className="picture">
                    <Icon.Person />
                </div>
                <div className="info">
                    <div className="pre">Signed in as</div>
                    <div className="name">
                        {props.userData.displayName}
                    </div>
                    <div className="balance">
                        Balance: <span>{props.userData.balance.toFixed(2)}</span> <Icon.Token />
                    </div>
                </div>
            </div>
            <div className="action">
                <button className="primary"><Icon.Plus/> Add funds</button>
                <button className="secondary" onClick={handleLogout}><Icon.Exit />Sign out</button>
            </div>
        </section>
    )
}