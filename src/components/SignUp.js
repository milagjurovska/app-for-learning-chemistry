import React, {useState} from "react";
import {auth, db} from "../firebase.js";
import {createUserWithEmailAndPassword, updateProfile} from "firebase/auth";
import {doc, setDoc} from "firebase/firestore";

function SignUp({onSuccess}){
    const [email,setEmail]=useState("");
    const[firstName,setFirstName]=useState("");
    const[lastName,setLastName]=useState("")
    const [username, setUsername] = useState("");
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
            await updateProfile(user, { displayName: username });

            await setDoc(doc(db, "users", user.uid), {
                firstName,
                lastName,
                username,
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
            <form onSubmit={handleSignUp} className="form" aria-label="Sign up form">
                <label htmlFor="signup-first-name">Name</label>
                <input id="signup-first-name" type="text" placeholder="John" value={firstName}
                       onChange={(e) => setFirstName(e.target.value)}
                       required/>
                <label htmlFor="signup-last-name">Surname</label>
                <input id="signup-last-name" type="text" placeholder="Doe" value={lastName}
                       onChange={(e) => setLastName(e.target.value)}
                       required/>
                <label htmlFor="signup-username">Username</label>
                <input id="signup-username" type="text" placeholder="chemist123" value={username}
                       onChange={(e) => setUsername(e.target.value.trim().toLowerCase())}
                       minLength="3"
                       required/>
                <label htmlFor="signup-email">Email</label>
                <input id="signup-email" type="email" placeholder="example@email.com" value={email}
                       onChange={(e) => setEmail(e.target.value)}
                       required/>
                <label htmlFor="signup-password">Password</label>
                <p id="signup-password-help">Please enter a password that contains at least one uppercase letter and a number.</p>
                <input
                    id="signup-password"
                    type="password"
                    placeholder="your new password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    aria-describedby="signup-password-help"
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
