import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import gif from '../images/chemistryset_dribbble.gif';
import { quiz } from "./Quiz.js";

function Landing() {
    const [index, setIndex] = useState(0);
    const [question, setQuestion] = useState(quiz[index]);
    const [lock, setLock] = useState(false);
    const [rezultat, setRezultat] = useState(false);
    const [score, setScore] = useState(0);
    const navigate = useNavigate();

    let opt1 = useRef(null);
    let opt2 = useRef(null);
    let opt3 = useRef(null);
    let opt4 = useRef(null);
    let niza = [opt1, opt2, opt3, opt4];

    const prov = (ele, ans) => {
        if (!lock) {
            if (question.ans === ans) {
                ele.target.classList.add("tochno");
                setLock(true);
                setScore(prev => prev + 1);
            } else {
                ele.target.classList.add("greshno");
                setLock(true);
                niza[question.ans - 1].current.classList.add("tochno");
            }
        }
    };

    const next = () => {
        if (lock) {
            if (index === quiz.length - 1) {
                setRezultat(true);
                return;
            }
            setIndex(prevIndex => prevIndex + 1);
            setQuestion(quiz[index + 1]);
            setLock(false);
            niza.map((option) => {
                option.current.classList.remove("greshno");
                option.current.classList.remove("tochno");
                return null;
            });
        }
    };

    const reset = () => {
        setIndex(0);
        setQuestion(quiz[0]);
        setScore(0);
        setLock(false);
        setRezultat(false);
    };

    const goToChapter1 = () => {
        window.scrollTo(0, 0);
        navigate('/chapter1');
    };

    return (
        <div>
            <div id="osnova">
                <header>
                    <div id="banner">
                        <h1>Learn Chemistry the fun way!</h1>
                    </div>
                </header>
                <div id="intro">
                    <div id="text">
                        <p>
                            Hey there, young scientist! 🧪✨ Are you ready to dive into the amazing world of chemistry?
                            It’s like magic, but it’s all real! Chemistry is the science that helps us understand the
                            stuff around us and how it changes.
                            Imagine mixing colorful liquids, making bubbles, and creating cool experiments—chemistry is
                            all about exploring and discovering new things!
                        </p>
                        <br/>
                        <p>
                            Think about the food you eat, the toys you play with, and even the air you breathe.
                            Chemistry is everywhere!
                            It's the reason why cookies are sweet, why balloons float, and how we can make cool slime.
                            When you learn chemistry, you become a detective, solving the mysteries of how things work
                            and why things happen.
                        </p>
                        <br/>
                        <p>
                            So grab your lab coat and goggles, and get ready for some fun experiments! You’ll mix,
                            measure, and marvel at the wonders of science.
                            Are you excited? Let’s jump into the world of chemistry and start our adventure! Watch the
                            video below to learn about atoms and molecules!
                        </p>
                    </div>
                    <div id="gif">
                        <img src={gif} alt="Gif of flasks"/>
                    </div>
                </div>
                <div id="videoItekst">
                    <div id="video">
                        <iframe
                            id="yt-video"
                            width="600"
                            height="380"
                            src="https://www.youtube.com/embed/rTC7w6bKh_4?enablejsapi=1"
                            title="YouTube video player"
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                            referrerPolicy="strict-origin-when-cross-origin"
                            allowFullScreen
                        ></iframe>
                    </div>
                    <div id='sledno'>
                        <p>Atoms bond together in different ways to form molecules, and the type of bond determines the
                            properties of the substance:</p> <br/>
                        <ol>
                            <li><b>Ionic Bonds: </b>Formed when one atom donates an electron to another, creating
                                positive
                                and negative ions that attract each other. Example: Sodium chloride (table salt).
                            </li>
                            <li><b>Covalent Bonds: </b>Formed when two atoms share electrons, creating a strong bond.
                                Example: Water (H₂O).
                            </li>
                            <li><b>Metallic Bonds: </b>Found in metals, where electrons are shared across many atoms,
                                giving
                                metals their strength and conductivity.
                            </li>
                        </ol>
                        <br/>
                        <p>These bond types are fundamental to the structure and behavior of all matter. Let's see what
                            you
                            learned from this lesson. Test your knowledge with this easy five question
                            quiz!
                        </p>
                    </div>
                </div>

            </div>
            <div className='quiz'>
                <h2>Quiz</h2>
                {rezultat ? (
                    <>
                        <h3>You Scored {score} out of 5!</h3>
                        <button onClick={reset}>Reset</button>
                        <button onClick={goToChapter1}>Go to Chapter 1</button>
                    </>
                ) : (
                    <>
                        <h3>{index + 1}. {question.question}</h3>
                        <ul>
                            <li ref={opt1} onClick={(ele) => prov(ele, 1)}>{question.option1}</li>
                            <li ref={opt2} onClick={(ele) => prov(ele, 2)}>{question.option2}</li>
                            <li ref={opt3} onClick={(ele) => prov(ele, 3)}>{question.option3}</li>
                            <li ref={opt4} onClick={(ele) => prov(ele, 4)}>{question.option4}</li>
                        </ul>
                        <button onClick={next}>Next</button>
                        <div className="index">{index + 1} of 5 questions</div>
                    </>
                )}
            </div>
        </div>
    );
}

export default Landing;
