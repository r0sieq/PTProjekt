
import './Miniprofile.css'
import Api from "../../../api";
import Icon from "../../../Icon";
import { useNavigate } from 'react-router-dom';
import useWallet from '../../../hooks/useWallet';

interface MiniprofileProps {
    userData: Api.UserData;
    setBalancePopup: React.Dispatch<React.SetStateAction<boolean>>
}

export default function Miniprofile(props: MiniprofileProps){

    const navigate = useNavigate();

    const { balance, setBalance } = useWallet();

    async function handleLogout(){
        await Api.signOut();
        setBalance(0);
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
                        Balance: <span>{(balance ?? 0).toFixed(2)}</span> <Icon.Token />
                    </div>
                </div>
            </div>
            <div className="action">
                <button className="primary" onClick={() => props.setBalancePopup(true)}><Icon.Plus/> Add funds</button>
                <button className="secondary" onClick={handleLogout}><Icon.Exit />Sign out</button>
            </div>
        </section>
    )
}