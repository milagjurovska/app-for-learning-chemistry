import React, {useState} from "react";
import {auth, db} from "../firebase.js";
import {createUserWithEmailAndPassword, updateProfile} from "firebase/auth";
import {doc, setDoc} from "firebase/firestore";

function SignUp({onSuccess}){
    const [email,setEmail]=useState("");
    const[firstName,setFirstName]=useState("");
    const[lastName,setLastName]=useState("")
    const [password, setPassword]=useState("");

    const handleSignUp=async (e)=>{
        e.preventDefault();
        const hasNumber = /\d/;
        const hasUpperCase = /[A-Z]/;

        if (!hasNumber.test(password)) {
            alert("Password must contain at least one number.");
            return;
        }
        if (!hasUpperCase.test(password)) {
            alert("Password must contain at least one uppercase letter.");
            return;
        }

        try{
            const userCred=await createUserWithEmailAndPassword(auth,email,password);
            const user=userCred.user;
            await updateProfile(user, { displayName: `${firstName} ${lastName}` });

            await setDoc(doc(db, "users", user.uid), {
                firstName,
                lastName,
                email
            });

            console.log("User registered:", user);
            onSuccess();
        }catch (error){
            if (error.code === 'auth/email-already-in-use') {
                alert("Email already in use. Please log in or use a different email.");
            } else {
                alert("Error signing up!");
                console.error("Error signing up:", error.message);
            }
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