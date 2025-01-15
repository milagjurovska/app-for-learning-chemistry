import React, { useState} from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Landing from "./components/Landing.js";
import Chapter1 from "./components/Chapter1.js";
import Chapter2 from "./components/Chapter2.js";
import './App.css';

function App() {
    const [menuOpen, setMenuOpen] = useState(false);

    const toggleMenu = () => {
        setMenuOpen(!menuOpen);
    };


    return (
        <Router>
            <div>
                <div className={`menu ${menuOpen ? 'open' : ''}`} id="menu">
                    <a href="#" className="kopce" onClick={toggleMenu}>
                        &times;
                    </a>
                    <Link to="/" onClick={toggleMenu}>Introduction</Link>
                    <Link to="/chapter1" onClick={toggleMenu}>Chapter 1</Link>
                    <Link to="/chapter2" onClick={toggleMenu}>Chapter 2</Link>
                </div>

                <div id="menuButton" className={menuOpen ? 'hidden' : ''}>
                    <span onClick={toggleMenu}>&#9776;</span>
                </div>

                <div id="osnova" className={menuOpen ? 'shifted' : ''}>
                    <Routes>
                        <Route path="/" element={<Landing />} />
                        <Route path="/chapter1" element={<Chapter1 />} />
                        <Route path="/chapter2" element={<Chapter2 />} />
                    </Routes>
                </div>
            </div>
        </Router>
    );
}

export default App;
