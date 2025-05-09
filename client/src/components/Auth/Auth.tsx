import SignIn from "./SignIn";
import './Auth.css'
import { useParams } from "react-router-dom";
import SignUp from "./SignUp";

export default function Auth(){

    const params = useParams();

    const mode = params.mode ?? "signin";

    console.log(params);

    return (
        <main className="auth">
            {mode === "signin" ? <SignIn /> : <SignUp />}
        </main>
    )
}