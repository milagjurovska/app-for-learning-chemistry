import React, { useState, useEffect } from 'react';
import Card from './Card.js';
import { useNavigate } from 'react-router-dom';
import hydrogen from '../images/hydrogen.png';
import hydrogen1 from '../images/hydrogen1.png';
import carbon from '../images/carbon.png';
import carbon1 from '../images/carbon1.png';
import nitrogen from '../images/nitrogen.png';
import nitrogen1 from '../images/nitrogen1.png';
import oxygen from '../images/oxygen.png';
import oxygen1 from '../images/oxygen1.png';
import fluorine from '../images/fluorine.png';
import fluorine1 from '../images/fluorine1.png';
import chlorine from '../images/chlorine.png';
import chlorine1 from '../images/chlorine1.png';

export default function Cards(){
    const navigate = useNavigate();

    const initialCards = [
        {id: 0, name: 'hydrogen', status: '', img: hydrogen},
        {id: 0, name: 'hydrogen', status: '', img: hydrogen1},
        {id: 1, name: 'carbon', status: '', img: carbon},
        {id: 1, name: 'carbon', status: '', img: carbon1},
        {id: 2, name: 'nitrogen', status: '', img: nitrogen},
        {id: 2, name: 'nitrogen', status: '', img: nitrogen1},
        {id: 3, name: 'oxygen', status: '', img: oxygen},
        {id: 3, name: 'oxygen', status: '', img: oxygen1},
        {id: 4, name: 'fluorine', status: '', img: fluorine},
        {id: 4, name: 'fluorine', status: '', img: fluorine1},
        {id: 5, name: 'chlorine', status: '', img: chlorine},
        {id: 5, name: 'chlorine', status: '', img: chlorine1}
    ];

    const [cards, setCards] = useState([]);
    const [prev, setPrev] = useState(-1);
    const [completed, setCompleted] = useState(false);

    useEffect(() => {
        const shuffledCards = initialCards.sort(() => Math.random() - 0.5);
        setCards(shuffledCards);
    }, []);
    const goToChapter2=()=>{
        window.scrollTo(0, 0);
        navigate('/chapter2');
    }


    function check(current) {
        if (cards[current].id === cards[prev].id) {
            cards[current].status = "correct";
            cards[prev].status = "correct";
            setCards([...cards]);
            setPrev(-1);
            checkGameCompletion();
        } else {
            cards[current].status = "wrong";
            cards[prev].status = "wrong";
            setCards([...cards]);
            setTimeout(() => {
                cards[current].status = "";
                cards[prev].status = "";
                setCards([...cards]);
                setPrev(-1);
            }, 1000);
        }
    }

    function checkGameCompletion() {
        if (cards.every(card => card.status === "correct")) {
            setCompleted(true);
        }
    }

    function klikni(id) {
        if (prev === -1) {
            cards[id].status = "active";
            setCards([...cards]);
            setPrev(id);
        } else {
            check(id);
        }
    }

    return (
        <div className="container">
            {cards.map((card, index) => (
                <Card key={index} card={card} id={index} klikni={klikni} />
            ))}
            {completed &&
                <div className="vrz">
                    <div>Congratulations! You've completed the game!</div>
                    <button onClick={goToChapter2}>Go to Chapter 2!</button>
                </div>
            }
        </div>
    );
}

