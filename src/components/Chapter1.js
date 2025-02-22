import React, { useState} from 'react';
import '../App.css';
import Cards from "./Cards.js";
import hydrogen from '../images/hydrogen.png';
import oxygen from '../images/oxygen.png';
import carbon from '../images/carbon.png';
import fluorine from '../images/fluorine.png';
import nitrogen from '../images/nitrogen.png';
import chlorine from '../images/chlorine.png';

const ElementSection = ({ imgSrc, altText, content}) => {
    const [isOpen, setIsOpen] = useState(false);

    const openModal = () => {
        console.log('Element clicked:', altText);
        setIsOpen(true);
    };
    const closeModal = () => setIsOpen(false);


    return (
        <div>
            <img
                src={imgSrc}
                alt={altText}
                className="element-img"
                onClick={openModal}
            />
            {isOpen && (
                <>
                    <div className="overlay" onClick={closeModal}></div>
                    <div className="modal">
                        <div>
                            {content.map((paragraph, index) => (
                                <p key={index}>{paragraph}</p>
                            ))}
                        </div>
                        <button className='close-button' onClick={closeModal}>  &times;</button>
                    </div>
                </>
            )}
        </div>
    );
};


function Chapter1(){
    return (

        <div>
            <div id="osnova">
                <header className="one">
                    <h1>What is the world made out of?</h1>
                    <p>Now that we know what atoms and molecules are, we will learn about the different elements in the
                        universe. There are 118 elements that are arranged in the Periodic Table. These are some of the
                        most important elements in the universe. Click on any of the elements below to find out
                        more!</p>
                </header>

                <div id="ch1">
                    <ElementSection
                        imgSrc={hydrogen}
                        altText="hydrogen"
                        content={[
                            "Hydrogen is a super cool and important element that’s all around us! It’s the simplest and lightest of all the elements, kind of like the smallest building block in the universe. Imagine if everything was made of tiny LEGO pieces; hydrogen would be the smallest and most basic piece.",
                            <br/>,
                            "Hydrogen is really special because it’s a big part of water. When you drink water, you’re actually drinking something made of hydrogen and oxygen! Hydrogen is also the most common element in the whole universe. That means if you look up at the stars at night, a lot of what you see is made of hydrogen!",
                            <br/>,
                            "So, in short, hydrogen is like a tiny superhero that’s everywhere and helps make the world work!"
                        ]}

                    />
                    <ElementSection
                        imgSrc={carbon}
                        altText="carbon"
                        content={[
                            "Carbon is a really amazing and important element that’s found in lots of different things around us! Think of carbon like a special ingredient that helps make up everything from plants and animals to rocks and even the air we breathe.",
                            <br/>,
                            "One of the coolest things about carbon is that it can take on different forms. For example, when carbon is arranged in a special way, it can become something as soft as the lead in a pencil (called graphite), or as hard as a shiny diamond! Isn’t that cool?",
                            <br/>,
                            "Carbon is also a big part of life on Earth. It’s in all living things, including you! Your body is made of lots of carbon, and so are animals, trees, and even the food you eat. When plants take in sunlight, they use carbon from the air to grow, which is why carbon is sometimes called the “building block of life.”"
                        ]}

                    />
                    <ElementSection
                        imgSrc={nitrogen}
                        altText="nitrogen"
                        content={[
                            "Nitrogen is a pretty awesome element that’s all around us, even though we can’t see it! It makes up a big part of the air we breathe—about 78% of it, in fact! But nitrogen isn’t something we can breathe in like oxygen; it mostly just hangs out in the air, not doing much until it’s needed.",
                            <br/>,
                            "One of the really cool things about nitrogen is that it helps plants grow. Plants need nitrogen to make their leaves green and strong. But they can’t just grab it from the air like we do with oxygen. Instead, nitrogen needs to be turned into a form that plants can use, and that’s where tiny bacteria in the soil come in. These bacteria help change nitrogen into food for plants, like a chef preparing a meal.",
                            <br/>,
                            "Nitrogen is also important for making proteins, which are like the building blocks that help our bodies grow and stay healthy. So, even though we don’t see or think about nitrogen much, it’s a big part of helping everything grow, from plants to people."
                        ]}

                    />
                    <ElementSection
                        imgSrc={oxygen}
                        altText="oxygen"
                        content={[
                            "Oxygen is one of the most important elements on Earth, and it’s something we need every single day! It’s a gas that makes up about 21% of the air we breathe, and it’s essential for life. Imagine oxygen as the special ingredient in the air that our bodies need to keep going, just like a car needs fuel.",
                            <br/>,
                            "When you take a deep breath, you’re breathing in oxygen. Once it’s inside your lungs, your blood carries it all around your body, helping your heart, brain, and muscles work properly. Without oxygen, we wouldn’t be able to run, think, or even move!",
                            <br/>,
                            "Oxygen is also involved in things like fire. When something burns, it needs oxygen to keep burning. That’s why blowing on a fire can make it grow bigger, and why putting a lid on a candle can make it go out—because it stops the oxygen from getting in."
                        ]}

                    />
                    <ElementSection
                        imgSrc={fluorine}
                        altText="fluorine"
                        content={[
                            "Fluorine is a fascinating element, though it's not as well-known as some others like oxygen or carbon. It’s a pale yellow gas that’s actually very reactive, which means it likes to combine with other elements to form new things. Even though fluorine by itself can be a bit dangerous, it’s really useful when it’s part of a compound, which is when it’s mixed with other elements.",
                            <br/>,
                            "One of the most common places you’ll find fluorine is in your toothpaste! Fluorine, when combined with other elements, becomes fluoride, which is added to toothpaste to help keep your teeth strong and protect them from cavities. It’s like a shield for your teeth that helps stop them from getting holes in them.",
                            <br/>,
                            "In nature, fluorine is never found by itself because it likes to react with other things so much. Instead, it’s always part of a compound, like in certain minerals or even in the rocks that make up the Earth."
                        ]}

                    />
                    <ElementSection
                        imgSrc={chlorine}
                        altText="chlorine"
                        content={[
                            "Chlorine is an interesting element that you might not know much about, but it plays an important role in our everyday lives! Chlorine is a greenish-yellow gas, but you usually find it as part of something else, like in table salt, which is a combination of chlorine and another element called sodium.",
                            <br/>,
                            "One of the places you might have heard about chlorine is in swimming pools. Chlorine is added to pool water to help keep it clean by killing bacteria and germs. It’s like a superhero that fights off the bad guys so that the water stays safe for us to swim in.",
                            <br/>,
                            "Even though chlorine is really helpful, it’s important to remember that it can be dangerous if not used carefully. That’s why we don’t touch or breathe in chlorine directly; we just let it do its job in places like pools or in cleaning products."
                        ]}
                    />
                </div>
                <div className='one'>
                    <p>After learning all about the elements, it is time to test your knowledge with this fun memory game.
                        For every element you learned about, there is a fun fact about the element that you have to
                        match with the chemical symbol. Have fun! </p>
                </div>

            </div>
            <div id='memory'>
                <div className="border-wrapper">
                    <h2>Memory Game</h2>
                    <div className="container">
                    <Cards />
                    </div>
                </div>
            </div>
            <div className='one'>
                <a href="https://www.flaticon.com/packs/periodic-table-73" title="icons">
                    All the element icons are created by bearicons - Flaticon
                </a>
            </div>
        </div>

    );
}
export default Chapter1;
