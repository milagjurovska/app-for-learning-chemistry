import React, { useEffect, useState } from "react";
import { db } from "../firebase.js";
import { onAuthStateChanged } from "firebase/auth";
import SignUp from "./SignUp.js";
import Login from "./Login.js";
import Logout from "./Logout.js";

function App() {
    const [user, setUser] = useState(null);

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(db, (user) => {
            if (user) {
                setUser(user);
            } else {
                setUser(null);
            }
        });

        return () => unsubscribe();
    }, []);

    return (
        <div>
            <h1>Welcome to My App</h1>
            {user ? (
                <div>
                    <p>Hello, {user.email}</p>
                    <Logout />
                </div>
            ) : (
                <div>
                    <SignUp />
                    <Login />
                </div>
            )}
        </div>
    );
}

export default App;