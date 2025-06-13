import { useEffect, useState } from 'react';
import './StakeSelector.css'
import useHoldAction from '../../hooks/useHoldAction';
import useWallet from '../../hooks/useWallet';

interface StakeSelectorProps {
    defaultValue: number,
    onChange?: (value: number) => void;
}

export default function StakeSelector(props: StakeSelectorProps){

    const [value, setValue] = useState<number>(props.defaultValue || 0);

    const { balance } = useWallet();

    const incHold = useHoldAction(() => setValue(current => Math.min(current + 1, Math.floor(balance))));
    const decHold = useHoldAction(() => setValue(current => Math.max(0, current - 1)));

    function handleInput(e: React.FormEvent<HTMLInputElement>){

        let input = e.currentTarget.value.replace(",", "").replace(".", "");

        if(input === "0k" || input === "0K"){
            input = input.replace("k", "1000");
        } else {
            input = input.replace("k", "000");
        }

        if(input === ""){
            setValue(0);
            return;
        }

        if(isNaN(Number(input))) return void e.preventDefault(); 

        while(input.length > 1 && input.startsWith("0")) input = input.replace("0", "");
        const parsed = Math.abs(Number(input));
        setValue(Math.floor(parsed));
    }

    function handleBlur(){
        setValue(Math.min(Math.floor(balance), value));
    }

    useEffect(() => props.onChange && props.onChange(value), [value]);

    return (
        <div className="stake-selector">
            <div className="numeric">
                <button 
                    className="dec" 
                    type='button' 
                    onPointerDown={decHold.start}
                    onPointerUp={decHold.stop}
                    onPointerOut={decHold.stop}
                    disabled={value === 0}
                >-</button>
                <input type='text' 
                    value={value} 
                    onChange={handleInput} 
                    onBlur={handleBlur}
                />
                <button 
                    className="inc" 
                    type='button' 
                    onPointerDown={incHold.start}
                    onPointerUp={incHold.stop}
                    onPointerOut={incHold.stop}
                    disabled={value === Math.floor(balance)}
                >+</button>
            </div>
            <div className="controlls">
                <button type='button' onClick={() => setValue(0)}>
                    reset
                </button>
                <button type="button" onClick={() => setValue(current => Math.round(current / 2))}>
                    ½
                </button>
                <button type="button" onClick={() => setValue(current => Math.min(Math.floor(balance), current * 2))}>
                    ×2
                </button>
                <button type="button" onClick={() => setValue(Math.floor(balance))}>
                    max
                </button>
            </div>
        </div>
    )
}