import { Link  } from "react-router-dom";
import Icon from "../../Icon";
import Input from "../Input/Input";
import { useState } from "react";

export default function SignUp(){


    const [isLoading, setLoading] = useState<boolean>(false);
    const [isError, setError] = useState<boolean>(false);

    async function handleSubmit(e: React.FormEvent<HTMLFormElement>){
        e.preventDefault();
        setError(false);
        setLoading(true);
    }

    return (
        <form onSubmit={handleSubmit}>
            <h1>Sign Up</h1>
            {isError && <div className="form-error">Incorrect email or password.</div>}
            <Input type="text" placeholder="Name"/>
            <Input type="text" placeholder="Email"/>
            <Input type="password" placeholder="Password"/>
            <Input type="password" placeholder="Repeat password"/>
            { isLoading ?
                <button type="submit" disabled><Icon.Loading /></button>
                :
                <button type="submit">Sign up</button>
            }
            <div className="alt">
                Already have an account?
                <Link to="/auth/signin">Sign in</Link>
            </div>
        </form>
    )
}