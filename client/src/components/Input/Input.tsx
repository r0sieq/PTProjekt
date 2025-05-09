import { DetailedHTMLProps, InputHTMLAttributes } from 'react'
import './Input.css'
import Icon from '../../Icon';


    
interface InputProps extends DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement> {
    readonly error?: string | false;
}

export default function Input(props: InputProps){

    return (
        <div className="custom-input">
            {props.error && <div className='input-feedback'><Icon.Check />{props.error}</div>}
            <input type="text" {...props}/>
        </div>
    )
}