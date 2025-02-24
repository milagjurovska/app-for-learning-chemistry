import React, {useEffect, useState} from 'react';
import { Navigate } from 'react-router-dom';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Landing from './components/Landing.js';
import Chapter1 from './components/Chapter1.js';
import Chapter2 from './components/Chapter2.js';
import {auth} from "./firebase.js"
import SignUp from "./components/SignUp.js";
import Login from "./components/Login.js";
import Logout from "./components/Logout.js";
import {onAuthStateChanged} from "firebase/auth"
import { GoTriangleUp, GoTriangleDown } from 'react-icons/go';
import './App.css';

function App() {
    const [menuOpen, setMenuOpen] = useState(false);
    const [user, setUser]=useState(null);
    const [isOpenSign, setIsOpenSign]=useState(false);
    const [isOpenLog, setIsOpenLog]=useState(false);


    const toggleMenu = () => {
        setMenuOpen(!menuOpen);
    };

    const signupform=()=>{
        setIsOpenSign(true);
    }

    const loginform=()=>{
        setIsOpenLog(true);

    }

    useEffect(() => {
        const unsubscribe=onAuthStateChanged(auth,(user)=>{
            if(user){
                setUser(user);
            }else{
                setUser(null);
            }
        })
        return ()=>unsubscribe();
    }, []);

    return (
        <Router>
            <div>
                <div id="gornomeni">
                    <div id="fullMenu">
                        <div id="menuButton">
                            <span onClick={toggleMenu}>Chapters {menuOpen ? <GoTriangleDown/> : <GoTriangleUp/>}</span>
                        </div>
                        <div className={`menu ${menuOpen ? 'open' : ''}`} id="menu">
                            <Link to="/" onClick={toggleMenu}>Introduction</Link>
                            <Link to="/chapter1" onClick={toggleMenu}>Chapter 1</Link>
                            <Link to="/chapter2" onClick={toggleMenu}>Chapter 2</Link>
                        </div>
                    </div>

                    <div className="menistuff">
                        <Link className="vnatre" to="/SignUp" onClick={signupform}>Sign Up</Link>
                        <Link className="vnatre"  to="/Login" onClick={loginform}>Log In</Link>
                        <Link className="vnatre" to="/Logout" >Log Out</Link>
                    </div>
                </div>


                <div id="osnova">
                    <Routes>
                        <Route path="/" element={<Landing/>}/>
                        <Route path="/chapter1" element={<Chapter1/>}/>
                        <Route path="/chapter2" element={<Chapter2/>}/>
                        <Route path="*" element={<Navigate to="/"/>}/>
                    </Routes>
                </div>
            </div>
        </Router>
    );
}

export default App;