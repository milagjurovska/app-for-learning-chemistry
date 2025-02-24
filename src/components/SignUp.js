import React, {useState} from "react";
import {auth} from "../firebase.js";
import {createUserWithEmailAndPassword} from "firebase/auth";

function SignUp(){
    const [email,setEmail]=useState("");
    const [password, setPassword]=useState("");

    const handleSignUp=async (e)=>{
        e.preventDefault();
        try{
            const userCred=await createUserWithEmailAndPassword(auth,email,password);
            console.log("User registered:", userCred.user);
        }catch (error){
            console.error("Error signing up:", error.message);
        }
    };

    return(<div>
            <h2>Sign Up</h2>
            <form onSubmit={handleSignUp}>
                <input
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                />
                <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                />
                <button type="submit">Sign Up</button>
            </form>
        </div>
    );
}

export default SignUp;