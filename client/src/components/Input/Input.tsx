import { DetailedHTMLProps, InputHTMLAttributes } from 'react'
import './Input.css'
import Icon from '../../Icon';


    
interface InputProps extends DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement> {
    readonly error?: string | false;
}

export default function Input(props: InputProps){

    const {error, ...rest} = props;

    return (
        <div className="custom-input" data-state={typeof error === "string" ? "error" : null}>
            {error && <div className='input-feedback'><Icon.Info />{error}</div>}
            <input type="text" {...rest}/>
        </div>
    )
}