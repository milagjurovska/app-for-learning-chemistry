import React, {useState} from "react";
import {auth} from "../firebase.js";
import {createUserWithEmailAndPassword} from "firebase/auth";

function SignUp(){
    const [email,setEmail]=useState("");
    const [password, setPassword]=useState("");

    const handleSignUp=async (e)=>{
        e.preventDefault();
        const hasNumber = /\d/;
        const hasUpperCase = /[A-Z]/;

        if (!hasNumber.test(password) || !hasUpperCase.test(password)) {
            alert("Password must contain at least one uppercase letter and one number.");
            return;
        }

        try{
            const userCred=await createUserWithEmailAndPassword(auth,email,password);
            console.log("User registered:", userCred.user);
        }catch (error){
            console.error("Error signing up:", error.message);
        }
    };


    return(<div>
            <h2>Sign Up</h2>
            <form onSubmit={handleSignUp} className="form">
                <p>Please enter your email.</p>
                <input type="email" placeholder="example@email.com" value={email}
                       onChange={(e) => setEmail(e.target.value)}
                       required/>
                <p>Please enter a password that contains at least one uppercase letter and a number.</p>
                <input
                    type="password"
                    placeholder="your new password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                />
                <div>
                    <button type="submit">Sign Up</button>
                </div>
            </form>
        </div>
    );
}

export default SignUp;