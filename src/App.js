import React, {useEffect, useState} from 'react';
import { Navigate } from 'react-router-dom';
import { HashRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Landing from './components/Landing.js';
import Chapter1 from './components/Chapter1.js';
import Chapter2 from './components/Chapter2.js';
import Profile from './components/Profile.js';
import {auth} from "./firebase.js"
import SignUp from "./components/SignUp.js";
import Login from "./components/Login.js";
import {onAuthStateChanged, signOut} from "firebase/auth"
import { GoTriangleUp, GoTriangleDown } from 'react-icons/go';
import './App.css';

function App() {
    const [menuOpen, setMenuOpen] = useState(false);
    const [user, setUser]=useState(null);
    const [isOpenSign, setIsOpenSign]=useState(false);
    const [isOpenLog, setIsOpenLog]=useState(false);
    const [scrolled, setScrolled] = useState(false);


    const toggleMenu = () => {
        setMenuOpen(!menuOpen);
    };

    const getNavUsername = () => {
        if (!user) {
            return "";
        }

        const fallbackName = user.email ? user.email.split("@")[0] : "profile";
        return `@${user.displayName || fallbackName}`;
    };

    const handleLogout = async () => {
        try {
            await signOut(auth);
        } catch (error) {
            console.error("Error signing out:", error.message);
        }
    };

    useEffect(() => {
        const unsubscribe=onAuthStateChanged(auth,(user)=>{
            if(user){
                setUser(user);
            }else{
                setUser(null);
            }
        })
        return () => {
            if (typeof unsubscribe === "function") {
                unsubscribe();
            }
        };
    }, []);

    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY > 50) {
                setScrolled(true);
            } else {
                setScrolled(false);
            }
        };

        window.addEventListener("scroll", handleScroll);
        return () => {
            window.removeEventListener("scroll", handleScroll);
        };
    }, []);

    return (
        <Router>
            <div>
                <nav id="gornomeni" style={{ backgroundColor: scrolled ? "#0d5b11" : "#fcfcf7" }} aria-label="Primary navigation">
                    <div id="fullMenu">
                        <div id="menuButton" >
                            <button className="chapters-toggle" onClick={toggleMenu} style={{ color: scrolled ? "white" : "black" }}>
                                Chapters {menuOpen ? <GoTriangleDown/> : <GoTriangleUp/>}
                            </button>
                        </div>
                        <div className={`menu ${menuOpen ? 'open' : ''}`} id="menu" style={{ backgroundColor: scrolled ? "#0d5b11" : "#fcfcf7", color:scrolled ? "white" : "black"}}>
                            <Link to="/" onClick={toggleMenu}>Introduction</Link>
                            <Link to="/chapter1" onClick={toggleMenu}>Chapter 1</Link>
                            <Link to="/chapter2" onClick={toggleMenu}>Chapter 2</Link>
                        </div>
                    </div>

                    <div className="menistuff" >
                        {user ? (
                            <Link className="vnatre profile-link" to="/profile" style={{ color: scrolled ? "white" : "black" }}>
                                {getNavUsername()}
                            </Link>
                        ) : (
                            <>
                                <button className="vnatre nav-action" onClick={() => setIsOpenSign(true)} style={{ color: scrolled ? "white" : "black" }}>Sign Up</button>
                                <button className="vnatre nav-action" onClick={() => setIsOpenLog(true)} style={{ color: scrolled ? "white" : "black" }}>Log In</button>
                            </>
                        )}
                        {user && (
                            <button className="vnatre nav-action" onClick={handleLogout} style={{ color: scrolled ? "white" : "black" }}>
                                Log Out
                            </button>
                        )}

                    </div>
                </nav>


                <div id="osnova">
                    <Routes>
                        <Route path="/" element={<Landing/>}/>
                        <Route path="/chapter1" element={<Chapter1/>}/>
                        <Route path="/chapter2" element={<Chapter2/>}/>
                        <Route path="/profile" element={<Profile user={user}/>}/>
                        <Route path="*" element={<Navigate to="/"/>}/>
                    </Routes>
                </div>
            </div>
            {isOpenSign && (
                <div className="modal_form">
                    <div className="modal-form-content">
                        <button className="close" onClick={() => setIsOpenSign(false)} aria-label="Close sign up form">&times;</button>
                        <SignUp onSuccess={() => setIsOpenSign(false)} />
                    </div>
                </div>
            )}
            {isOpenLog && (
                <div className="modal_form">
                    <div className="modal-form-content">
                        <button className="close" onClick={() => setIsOpenLog(false)} aria-label="Close login form">&times;</button>
                        <Login onSuccess={() => setIsOpenLog(false)} />
                    </div>
                </div>
            )}
        </Router>
    );
}

export default App;
