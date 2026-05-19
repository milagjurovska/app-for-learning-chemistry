import React, {useState} from "react";
import {auth} from "../firebase.js";
import {signInWithEmailAndPassword} from "firebase/auth";

function Login({onSuccess}){
    const [email,setEmail]=useState("")
    const [password, setPassword]=useState("")

    const handleLogin=async (e)=>{
        e.preventDefault();
        try{
            const userCred=await signInWithEmailAndPassword(auth, email, password);
            console.log("User logged in: ",userCred.user);
            if (onSuccess) {
                onSuccess();
            }
        }catch (error){
            if (error.code === 'auth/user-not-found' || error.code === 'auth/wrong-password') {
                alert("Invalid email or password. Please try again.");
            } else {
                alert("Error logging in!");
                console.log("Error logging in: ", error.message);
            }
        }
    }
    return(
        <div>
            <h2>Login</h2>
            <form onSubmit={handleLogin} className="form" aria-label="Login form">
                <label htmlFor="login-email">Email</label>
                <input id="login-email" type="email" placeholder="example@email.com" value={email}
                       onChange={(e) => setEmail(e.target.value)}
                       required/>
                <label htmlFor="login-password">Password</label>
                <input id="login-password" type="password" placeholder="your password" value={password}
                       onChange={(e) => setPassword(e.target.value)}
                       required/>
                <div>
                    <button type="submit">Log In</button>
                </div>
            </form>
        </div>
    );
}


export default Login;
