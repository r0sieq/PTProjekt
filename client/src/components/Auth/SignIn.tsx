import { Link, useNavigate } from "react-router-dom";
import Input from "../Input/Input";
import { useRef, useState } from "react";
import Api from "../../api";
import Icon from "../../Icon";

export default function SignIn(){

    const emailRef = useRef<HTMLInputElement>(null);
    const passwordRef = useRef<HTMLInputElement>(null);

    const navigate = useNavigate();

    const [isLoading, setLoading] = useState<boolean>(false);
    const [isError, setError] = useState<boolean>(false);

    async function handleSubmit(e: React.FormEvent<HTMLFormElement>){
        e.preventDefault();
        setError(false);
        setLoading(true);
        try {
            await Api.signIn(emailRef.current?.value ?? "", passwordRef.current?.value ?? "");
            navigate("/");
        } catch {
            setError(true);
        }
        setLoading(false);
        
    }

    return (
        <form onSubmit={handleSubmit}>
            <h1>Sign In</h1>
            {isError && <div className="form-error">Incorrect email or password.</div>}
            <Input type="text" placeholder="Email" ref={emailRef}/>
            <Input type="password" placeholder="Password" ref={passwordRef}/>
            { isLoading ?
                <button type="submit" disabled><Icon.Loading /></button>
                :
                <button type="submit">Sign in</button>
            }
            <div className="alt">
                Don't have an account yet?
                <Link to="/auth/signup">Sign up</Link>
            </div>
        </form>
    )
}