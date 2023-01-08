import React, { useRef } from "react";
import { auth } from "../firebase";
import "./SignUpScreen.css"

function SignUpScreen() {

    const emailRef = useRef(null);
    const passwordRef = useRef(null);

    const register = (e) => {
        e.prevetDefault();

        auth.createUserWithEmailAndPassword(
            emailRef.current.value,
            passwordRef.current.value
        )
    }

    const signIn = (e) => {
        e.prevetDefault();
    }

    return (
        <div className='signUpScreen'>
            <form>
                <h1>Sign In</h1>
                <input ref={emailRef} placeholder="Email" type="email" />
                <input ref={passwordRef} placeholder="Password" type="password" />
                <button type="submit" onClick={signIn}>Sign In</button>

                <h4>
                    <span className="signUpScreen_gray">New to Netflix? </span>
                    <span className="signUpScreen_link" onClick={register}>
                        Sign Up now.
                    </span>
                </h4>
            </form>
        </div>
    );
}

export default SignUpScreen;