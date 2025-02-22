import React from 'react';
import '../App.css';
import water from "../images/water.png";
import carbondioxide from "../images/carbon dioxide.png";
import tablesalt from "../images/table salt.png";
import MainContainer from "./MainContainer.js";

function Chapter2(){

    return (
        <div id="osnova">
            <header className="one">
                <h1> How about learning different chemical equations? </h1>
                <p>Chemical equations are like special recipes that show how different substances mix together to create something new.
                    Just like when you bake a cake by mixing flour, sugar, and eggs, a chemical equation shows what ingredients (called reactants) you start with and what products you get in the end. </p>
            </header>
            <div id="ch2">
                <div className="reaction">
                    <div className="text2">
                        <p>
                            One of the most important, and easiest reaction is that of water. Imagine you’re building a
                            water molecule, and you have two special building blocks called hydrogen (H) and one called
                            oxygen (O).
                            When you put two hydrogen blocks together with one oxygen block, they snap together to form
                            something new: water!</p> <br/>
                        <p>It’s like magic! Two hydrogen friends join with an oxygen buddy, and together they make
                            water, the stuff we drink, swim in, and use every day.
                            It’s a super simple equation, but it’s behind one of the most important things on Earth!</p>
                    </div>
                    <img src={water} alt="water"/>

                </div>
                <div className="reaction">
                    <div className="text2">
                        <p>Carbon dioxide, or CO₂, is like a little puzzle made of one carbon piece and two oxygen
                            pieces.
                            Even though you can't see it, it's all around us in the air we breathe.
                            When we exhale, we're actually blowing out carbon dioxide! </p> <br/>
                        <p>In this equation, one carbon atom and two oxygen atoms come together to make a molecule of
                            carbon
                            dioxide. This gas is all around us in the air, and it’s what we breathe out when we exhale.
                            But
                            guess what? Plants breathe it in!
                            They use carbon dioxide to help them grow and make oxygen, which we need to breathe. So,
                            carbon
                            dioxide is super important, even though we can’t see it!</p>
                    </div>
                    <img src={carbondioxide} alt="carbon dioxide"/>
                </div>
                <div className="reaction">
                    <div className="text2">
                        <p>Table salt, or sodium chloride (NaCl), is something you probably sprinkle on your food every day, but it has a fascinating story!
                            It’s made up of two very different elements: sodium (Na) and chlorine (Cl). </p> <br/>
                        <p>Imagine sodium as a very active and shiny metal. On its own, sodium is so reactive that it can even explode if it touches water!
                            Chlorine, on the other hand, is a yellow-green gas that’s very dangerous by itself. It’s so strong that it’s used to clean swimming pools and kill germs.
                            But when these two elements come together, something amazing happens! They join forces to form a stable, safe substance that we know as table salt.</p>
                    </div>
                    <img src={tablesalt} alt="sodium chloride"/>
                </div>
            </div>
            <div className="chemicallab">
                <h2>Chemical Reactions Lab</h2>
                <p>Below you can see some bottles with elements. To test your knowledge, you need to choose two elements to pour into the empty bottle to make the correct reaction. </p>
                <MainContainer />
            </div>
        </div>
    );
}
export default Chapter2;