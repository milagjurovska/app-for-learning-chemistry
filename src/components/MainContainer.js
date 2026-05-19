import React, { useEffect, useState } from 'react';
import Element, { getElementColor } from './Element.js';
import '../App.css';
import { checkReaction as checkReactionApi, isBackendConfigured } from '../services/api.js';

const MainContainer = () => {
    const elements = ['H', 'C', 'Na', 'O', 'Cl'];
    const [pouredElements, setPouredElements] = useState([]);
    const [message, setMessage] = useState('');
    const [isCorrect, setIsCorrect] = useState(false);
    const [successfulReactions, setSuccessfulReactions] = useState([]);
    const [pourAnimation, setPourAnimation] = useState(null);

    const correctReactions = {
        HO: 'H<sub>2</sub>O',
        CO: 'CO<sub>2</sub>',
        NaCl: 'NaCl'
    };

    const handlePour = (element, event) => {
        if (pouredElements.length < 2) {
            const sourceRect = event?.currentTarget?.getBoundingClientRect?.();
            const targetRect = document
                .querySelector('[data-testid="selected-elements-tube"]')
                ?.getBoundingClientRect();

            if (sourceRect && targetRect) {
                setPourAnimation({
                    element,
                    fromX: sourceRect.left + sourceRect.width / 2,
                    fromY: sourceRect.top + sourceRect.height / 2,
                    toX: targetRect.left + targetRect.width / 2,
                    toY: targetRect.top + targetRect.height / 2,
                });
            }

            setPouredElements([...pouredElements, element]);
            setMessage('');
            setIsCorrect(false);
        }
    };

    useEffect(() => {
        if (!pourAnimation) {
            return undefined;
        }

        const timeoutId = window.setTimeout(() => {
            setPourAnimation(null);
        }, 900);

        return () => window.clearTimeout(timeoutId);
    }, [pourAnimation]);

    const resolveReactionLocally = (selectedElements) => {
        const [first, second] = selectedElements;
        const key1 = first + second;
        const key2 = second + first;
        return correctReactions[key1] || correctReactions[key2] || null;
    };

    const applyReactionResult = (reaction) => {
        if (reaction) {
            setMessage(`Correct! You got ${reaction}!`);
            setIsCorrect(true);
            setSuccessfulReactions(prev => prev.includes(reaction) ? prev : [...prev, reaction]);
            setPouredElements([]);
        } else {
            setMessage('False! Try again.');
            setIsCorrect(false);
            setPouredElements([]);
        }
    };

    const checkReactionWithBackend = async (selectedElements) => {
        let reaction = resolveReactionLocally(selectedElements);

        try {
            const backendResult = await checkReactionApi(selectedElements);
            if (backendResult) {
                reaction = backendResult.correct ? backendResult.formulaHtml : null;
            }
        } catch (error) {
            console.warn("Backend reaction check unavailable, using local rules.", error.message);
        }

        applyReactionResult(reaction);
    };

    const checkReaction = () => {
        if (pouredElements.length === 2) {
            if (isBackendConfigured()) {
                checkReactionWithBackend(pouredElements);
                return;
            }

            applyReactionResult(resolveReactionLocally(pouredElements));
        } else {
            setMessage('Please select two elements.');
            setIsCorrect(false);
        }
    };

    const getFinalMessage = () => {
        if (successfulReactions.length >= 3) {
            return 'Congratulations! You have successfully completed all reactions!';
        }
        return '';
    };

    return (
        <div className="main-container" data-testid="chemical-reactions-lab">
            <div className="top-container">
                <div className="test-tube selected-test-tube" aria-label="Selected elements tube" data-testid="selected-elements-tube">
                    <div className="tube-body">
                        <div className="selected-liquid" aria-hidden="true">
                            {pouredElements.map((element, index) => (
                                <span
                                    key={`${element}-${index}`}
                                    className="liquid-layer"
                                    style={{
                                        backgroundColor: getElementColor(element),
                                        height: `${100 / pouredElements.length}%`,
                                    }}
                                />
                            ))}
                        </div>
                        <span
                            className={pouredElements.length === 0 ? "selected-elements-label is-empty" : "selected-elements-label"}
                            data-testid="selected-elements"
                        >
                            {pouredElements.length > 0 ? pouredElements.join(" + ") : "Empty"}
                        </span>
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
                            onClick={(event) => handlePour(element, event)}
                            isEmpty={false}
                        />
                    </div>
                ))}
            </div>
            <button onClick={checkReaction} className="check-button">Check Reaction</button>
            <p className="reaction-progress" data-testid="reaction-progress">
                {successfulReactions.length} of 3 reactions completed
            </p>
            {message && (
                <p
                    className={`reaction-message ${isCorrect ? 'correct' : 'incorrect'}`}
                    role="status"
                    data-testid="reaction-message"
                    dangerouslySetInnerHTML={{ __html: message }}
                ></p>
            )}
            {successfulReactions.length >= 3 && (
                <p className="final-message">{getFinalMessage()}</p>
            )}
            {pourAnimation && (
                <div
                    className="flying-pour-tube"
                    aria-hidden="true"
                    style={{
                        "--from-x": `${pourAnimation.fromX}px`,
                        "--from-y": `${pourAnimation.fromY}px`,
                        "--to-x": `${pourAnimation.toX}px`,
                        "--to-y": `${pourAnimation.toY}px`,
                        "--liquid-color": getElementColor(pourAnimation.element),
                    }}
                >
                    <div className="tube-body" style={{background: getElementColor(pourAnimation.element)}}>
                        <p className="element-symbol">{pourAnimation.element}</p>
                    </div>
                </div>
            )}
        </div>
    );
};

export default MainContainer;
