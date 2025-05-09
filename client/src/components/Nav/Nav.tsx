import { useEffect, useState } from 'react';
import Icon from '../../Icon';
import NavLink from '../NavLink/NavLink';
import './Nav.css'
import { Link, useLocation } from "react-router-dom";
import Api from '../../api';
import useWallet from '../../hooks/useWallet';

export default function Nav(){

    const [loading, setLoading] = useState<boolean>(true);
    const {balance, setBalance} = useWallet();
    const [signedIn, setSignedIn] = useState<boolean>(false);

    const location = useLocation();

    useEffect(() => {
        Api.getBasicUserData().then(data => {
            setLoading(false);
            if(data?.balance){
                setBalance(data.balance);
                setSignedIn(true);
            }
            setLoading(false);
        });
    }, [location.pathname])

    return (
        <header>
            <nav>
                <NavLink to="/">
                    PLAY
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
                        <button>
                            <Icon.Plus />
                        </button>
                    </div>
            }

        </header>
    )
}