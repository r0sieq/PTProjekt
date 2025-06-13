import './BalancePopup.css'
import { createPortal } from "react-dom";
import Input from "../Input/Input";
import Icon from '../../Icon';
import useWallet from '../../hooks/useWallet';
import { useRef, useState } from 'react';
import Api from '../../api';

const container = document.querySelector("#balance-popup-container");

interface BalancePopupProps {
    setBalancePopup: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function BalancePopup(props: BalancePopupProps){

    const { balance, setBalance } = useWallet();

    const [loading, setLoading] = useState<boolean>(false);
    const [addedValue, setAddedValue] = useState<number>(-1);
    const [error, setError] = useState<string | undefined | false>();

    const codeInputRef = useRef<HTMLInputElement>(null);

    async function handleSubmitCode(e: React.FormEvent<HTMLFormElement>){
        e.preventDefault();
        const codeInput = codeInputRef.current;
        if(!codeInput) return;
        setLoading(true);
        const headers = await Api.authToken();
        const res = await fetch(`${Api.URL}/deposit/redeem`, { 
            headers,
            method: "POST",
            body: JSON.stringify({
                code: codeInput.value
            })
        })
        const data = await res.json();
        setLoading(false);
        if("error" in data){
            setError(data.error as string);
        } else {
            setBalance(balance + data.addedValue);
            setAddedValue(data.addedValue);
        }
    }

    function reset(){
        setAddedValue(-1);
        setError(false);
    }

    return createPortal(
        <div className="balance-popup">
            <h1>
                Deposit funds
                <button onClick={() => props.setBalancePopup(false)}>
                    <Icon.Close />
                </button>
            </h1>
            <div className="popup-content">
                <aside className="methods">
                    <button className="method">
                        <Icon.Gift />
                        Gift card
                    </button>
                    <button className="method" data-locked>
                        <Icon.Logo.Paypal />
                        Paypal
                        <Icon.Lock className='lock'/>
                    </button>
                    <button className="method" data-locked>
                        <Icon.Logo.Stripe />
                        Stripe
                        <Icon.Lock className='lock'/>
                    </button>
                    <button className="method" data-locked>
                        <Icon.Logo.Google />
                        Google Pay
                        <Icon.Lock className='lock'/>
                    </button>
                </aside>
                <form action="" className="main" onSubmit={handleSubmitCode}>
                    { addedValue === -1 ?
                        <>
                            <h2>Gift card</h2>
                            <Input 
                                placeholder="Your gift code..." 
                                disabled={loading} 
                                ref={codeInputRef} 
                                error={error} 
                                onChange={() => setError(undefined)}
                            />
                            <button type="submit" className="primary" disabled={loading}>
                                Redeem code
                                { loading && <Icon.Loading className='loading'/>}
                            </button>
                        </>
                        :
                        <>
                            <h2 className='success'>Success!</h2>
                            <div className="message">
                                <span className='value'>{addedValue}</span><Icon.Token /> added to your account!
                            </div>
                            <div className="buttons">
                                <button className="primary" onClick={reset}>Redeem another code</button>
                                <button className="secondary" onClick={() => props.setBalancePopup(false)}>Exit</button>
                            </div>
                        </>
                    }
                    
                </form>
            </div>
        </div>
    , container!)
}