import { Link, useNavigate  } from "react-router-dom";
import Icon from "../../Icon";
import Input from "../Input/Input";
import { useRef, useState } from "react";
import Api from "../../api";

export default function SignUp(){


    const [isLoading, setLoading] = useState<boolean>(false);
    const [formError, setFormError] = useState<string | false>(false);

    const navigate = useNavigate();

    async function handleSubmit(e: React.FormEvent<HTMLFormElement>){
        e.preventDefault();
        setFormError(false);
        setLoading(true);
        const email = emailRef.current?.value;
        const password = passwordRef.current?.value;
        const name = nameRef.current?.value;
        const res = await fetch(`${Api.URL}/auth/signup`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                email, name, password
            })
        })
        const data = await res.json();
        setLoading(false);
        if("error" in data) return void setFormError(data.error);
        
        navigate("/auth/signin");
    }

    const nameRef = useRef<HTMLInputElement>(null);
    const emailRef = useRef<HTMLInputElement>(null);
    const passwordRef = useRef<HTMLInputElement>(null);
    const secondPasswordRef = useRef<HTMLInputElement>(null);

    const [nameError, setNameError] = useState<string | false>();
    function handleName(e: React.ChangeEvent<HTMLInputElement>){
        const name = e.currentTarget.value;
        if(name.length < 3 || name.length > 20) return setNameError("Incorrect length!");
        if(nameError) setNameError(false);
    }

    const [emailError, setEmailError] = useState<string | false>();
    function handleEmail(e: React.ChangeEvent<HTMLInputElement>){
        const email = e.currentTarget.value;
        if(!(/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/).test(email)){
            return void setEmailError("Invalid email.");
        }
        if(emailError) setEmailError(false);
    }

    const [passwordError, setPasswordError ] = useState<string | false>();
    function handlePassword(e: React.ChangeEvent<HTMLInputElement>){
        const password = e.currentTarget.value;
        if(password.length < 8) return void setPasswordError("Too short!");
        if(!(/\d/).test(password)) return void setPasswordError("At least one number.");
        if(!(/[a-z]/).test(password)) return void setPasswordError("At least one lowercase letter.");
        if(!(/[A-Z]/).test(password)) return void setPasswordError("At least one uppercase letter.");
        if(passwordError) setPasswordError(false);
    }

    const [secondPasswordError, setSecondPasswordError] = useState<string | false>();
    function handleSecondPassword(e: React.ChangeEvent<HTMLInputElement>){
        const secondPassword = e.currentTarget.value;
        const firstPassword = passwordRef.current?.value;
        if(secondPassword !== firstPassword) return void setSecondPasswordError("Passwords don't match!");
        if(secondPassword) setSecondPasswordError(false);
    }

    const [checkboxError, setCheckboxError] = useState<boolean>();
    function handleCheckbox(e: React.ChangeEvent<HTMLInputElement>){
        if(!e.currentTarget.checked) setCheckboxError(true);
        else setCheckboxError(false);
    }

    const isValidated = [nameError, emailError, passwordError, secondPasswordError, checkboxError].every(e => e === false);

    return (
        <form onSubmit={handleSubmit}>
            <h1>Sign Up</h1>
            {formError && <div className="form-error">{formError}</div>}
            <Input type="text" placeholder="Name" ref={nameRef} onChange={handleName} error={nameError}/>
            <Input type="text" placeholder="Email" ref={emailRef} onChange={handleEmail} error={emailError}/>
            <Input type="password" placeholder="Password" ref={passwordRef} onChange={handlePassword} error={passwordError}/>
            <Input type="password" placeholder="Repeat password" ref={secondPasswordRef} onChange={handleSecondPassword} error={secondPasswordError}/>
            <label className="custom-checkbox">
                <input type="checkbox" onChange={handleCheckbox}/>
                <span className="checkbox-box"></span>
                <span>
                    I agree to the terms and conditions.
                </span>
            </label>
            { isLoading ?
                <button type="submit" disabled><Icon.Loading /></button>
                :
                <button type="submit" disabled={!isValidated}>Sign up</button>
            }
            <div className="alt">
                Already have an account?
                <Link to="/auth/signin">Sign in</Link>
            </div>
        </form>
    )
}