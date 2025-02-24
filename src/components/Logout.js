import React from "react";
import { auth } from "../firebase.js";
import { signOut } from "firebase/auth";

function Logout() {
    const handleLogout = async () => {
        try {
            await signOut(auth);
            console.log("User signed out");
        } catch (error) {
            console.error("Error signing out:", error.message);
        }
    };

    return (
        <div>
            <p onClick={handleLogout}>Logout</p>
        </div>
    );
}

export default Logout;