import React from 'react';
import '../Element.css';

const Element = ({ element, onClick, isEmpty, elements }) => {
    const backgroundColor = isEmpty
        ? elements.length === 1
            ? getColor(elements[0])
            : elements.length === 2
                ? `linear-gradient(to top, ${elements.map(el => getColor(el)).join(', ')})`
                : null
        : getColor(element);

    const handleClick = (element) => {
        if (!isEmpty) {
            onClick(element);
        }
    };

    return (
        <div className="test-tube" onClick={handleClick}>
            <div className="tube-body" style={{background: backgroundColor}}>
                {!isEmpty && <p className="element-symbol">{element}</p>}
            </div>
        </div>
    );
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
            return '#ffffff';
    }
};

export default Element;
