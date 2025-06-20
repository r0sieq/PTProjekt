import { useEffect, useState } from 'react';
import Icon from '../../Icon';
import NavLink from '../NavLink/NavLink';
import './Nav.css'
import { Link, useLocation, useNavigate } from "react-router-dom";
import Api from '../../api';
import useWallet from '../../hooks/useWallet';
import useGlobalError from '../../hooks/useGlobalError';

interface NavProps {
    setBalancePopup: React.Dispatch<React.SetStateAction<boolean>>
}

export default function Nav(props: NavProps){

    const { addError } = useGlobalError();

    const [navActive, setNavActive] = useState<boolean>(false);

    const [loading, setLoading] = useState<boolean>(true);
    const {balance, setBalance} = useWallet();
    const [signedIn, setSignedIn] = useState<boolean>(false);

    const location = useLocation();

    const navigate = useNavigate();


    useEffect(() => {
        setLoading(true);
        async function f(){
            try {
                const data = await Api.getBasicUserData();
                if(data?.balance){
                    setBalance(data.balance);
                    setSignedIn(true);
                } else setSignedIn(false);
                setLoading(false);
            } catch(err: any) {
                addError((
                    <>
                        {err.message}
                        <Link to="/auth">here</Link>
                    </>
                ), 15, err.message);
            }
        }
        f()
    }, [location.pathname, location.key])

    return (
        <header data-active={navActive}>
            <button className='nav-toggle' onClick={() => setNavActive(current => !current)}>
                <Icon.Burger />
            </button>
            <Icon.Logo.Light onClick={() => navigate("/")}/>
            <nav onClick={() => setNavActive(false)}>
                <NavLink to="/">
                    HOME
                </NavLink>
                <NavLink to="/roulette">
                    ROULETTE
                </NavLink>
                <NavLink to="/ridethebus">
                    RIDE THE BUS
                </NavLink>
                <NavLink to="/slots">
                    SLOT MACHINES
                </NavLink>
                <NavLink to="/minesweeper">
                    MINESWEEPER
                </NavLink>
            </nav>
            { loading ?
                <div className="loading">
                    <Icon.Loading />
                </div>
                : signedIn === false ?
                    <div className="account">
                        <Link to="/auth">
                            Sign in <Icon.Person /> 
                        </Link>
                    </div>
                    :
                    <div className="balance">
                        <span>Balance: </span>
                        <span className='number' key={balance}>{Math.round(balance) === balance ? balance : balance.toFixed(2)}</span>
                        <button onClick={() => props.setBalancePopup(true)}>
                            <Icon.Plus />
                        </button>
                    </div>
            }

        </header>
    )
}