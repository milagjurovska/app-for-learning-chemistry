import React from 'react';
import '../Element.css';

export const getElementColor = (element) => {
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

const Element = ({ element, onClick, isEmpty, elements = [], isPouring = false }) => {
    const backgroundColor = isEmpty
        ? elements.length === 1
            ? getElementColor(elements[0])
            : elements.length === 2
                ? `linear-gradient(to top, ${elements.map(el => getElementColor(el)).join(', ')})`
                : null
        : getElementColor(element);

    const handleClick = () => {
        if (!isEmpty) {
            onClick(element);
        }
    };

    return (
        <button
            type="button"
            className={`test-tube ${isPouring ? "pouring" : ""}`}
            onClick={handleClick}
            aria-label={isEmpty ? "Empty test tube" : `Select ${element}`}
            data-testid={isEmpty ? "empty-test-tube" : `element-${element}`}
            style={{ "--liquid-color": backgroundColor }}
        >
            <div className="tube-body" style={{background: backgroundColor}}>
                {!isEmpty && <p className="element-symbol">{element}</p>}
            </div>
        </button>
    );
};

export default Element;
