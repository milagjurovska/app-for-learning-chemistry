import React, {useState} from "react";
import {auth} from "../firebase.js";
import {signInWithEmailAndPassword} from "firebase/auth";

function Login(){
    const [email,setEmail]=useState("")
    const [password, setPassword]=useState("")

    const handleLogin=async (e)=>{
        e.preventDefault();
        try{
            const userCred=await signInWithEmailAndPassword(auth, email, password);
            console.log("User logged in: ",userCred.user);
        }catch (error){
            console.log("Error logging in: ",error.message)
        }
    }
    return(
        <div>
            <h2>Login</h2>
            <form onSubmit={handleLogin}>
                <input type="email" placeholder="Email" value={email} onChange={(e)=>setEmail(e.target.value)}
                required/>
                <input type="password" placeholder="Password" value={password} onChange={(e)=>setPassword(e.target.value)}
                required/>
                <button type="submit">Login</button>
            </form>
        </div>
    );
}



export default Login;