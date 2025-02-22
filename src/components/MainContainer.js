import React, { useState } from 'react';
import { useSpring, animated } from 'react-spring';
import Element from './Element.js';
import '../App.css';

const MainContainer = () => {
    const elements = ['H', 'C', 'Na', 'O', 'Cl'];
    const [pouredElements, setPouredElements] = useState([]);
    const [message, setMessage] = useState('');
    const [isCorrect, setIsCorrect] = useState(false);
    const [successfulReactions, setSuccessfulReactions] = useState(0);
    const [activeElement, setActiveElement] = useState(null);

    const correctReactions = {
        HO: 'H<sub>2</sub>O',
        CO: 'CO<sub>2</sub>',
        NaCl: 'NaCl'
    };

    const handlePour = (element) => {
        if (pouredElements.length < 2) {
            setActiveElement(element);
            setPouredElements([...pouredElements, element]);
            setMessage('');
            setIsCorrect(false);
        }
    };

    const checkReaction = () => {
        if (pouredElements.length === 2) {
            const [first, second] = pouredElements;
            const key1 = first + second;
            const key2 = second + first;
            const reaction = correctReactions[key1] || correctReactions[key2];

            if (reaction) {
                setMessage(`Correct! You got ${reaction}!`);
                setIsCorrect(true);
                if (!message.includes(reaction)) {
                    setSuccessfulReactions(prev => prev + 1);
                }
                setPouredElements([]);
                setActiveElement(null);
            } else {
                setMessage('False! Try again.');
                setIsCorrect(false);
                setPouredElements([]);
                setActiveElement(null);
            }
        } else {
            setMessage('Please select two elements.');
            setIsCorrect(false);
        }
    };

    const getFinalMessage = () => {
        if (successfulReactions >= 3) {
            return 'Congratulations! You have successfully completed all reactions!';
        }
        return '';
    };

    const getColor = (element) => {
        switch (element) {
            case 'H':
                return '#a2d2ff';
            case 'C':
                return '#fdffb6';
            case 'Na':
                return '#ffc8dd';
            case 'O':
                return '#fec89a';
            case 'Cl':
                return '#cdb4db';
            default:
                return 'transparent';
        }
    };

    const getBackgroundStyle = () => {
        if (pouredElements.length === 1) {
            const color = getColor(pouredElements[0]);
            return { background: color };
        } else if (pouredElements.length === 2) {
            const color1 = getColor(pouredElements[0]);
            const color2 = getColor(pouredElements[1]);
            return { background: `linear-gradient(${color1}, ${color2})` };
        }
        return { background: 'transparent' };
    };

    const pourAnimation = useSpring({
        height: pouredElements.length > 0 ? '100%' : '0%',
        config: { duration: 1000 },
    });

    return (
        <div className="main-container">
            <div className="top-container">
                <div className="test-tube">
                    <div className="tube-body">
                        <animated.div
                            className="liquid"
                            style={{ ...pourAnimation, ...getBackgroundStyle() }}
                        ></animated.div>
                    </div>
                </div>
            </div>
            <div className="bottom-container">
                {elements.map((element, index) => (
                    <div
                        key={index}
                        className="element-container"
                    >
                        <Element
                            element={element}
                            onClick={() => handlePour(element)}
                            isEmpty={false}
                        />
                    </div>
                ))}
            </div>
            <button onClick={checkReaction} className="check-button">Check Reaction</button>
            {message && (
                <p
                    className={`reaction-message ${isCorrect ? 'correct' : 'incorrect'}`}
                    dangerouslySetInnerHTML={{ __html: message }}
                ></p>
            )}
            {successfulReactions >= 3 && (
                <p className="final-message">{getFinalMessage()}</p>
            )}
        </div>
    );
};

export default MainContainer;
