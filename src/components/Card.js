function Card({card, id, klikni}){
    const cardsClass = card.status ? ` active ${card.status}` : "";

    return (
        <button
            type="button"
            className={"card" + cardsClass}
            onClick={()=>klikni(id)}
            aria-label={`Memory card ${id + 1}: ${card.name}`}
            data-testid={`memory-card-${id}`}
        >
            <img src={card.img} alt={card.name}/>
        </button>
    )
}

export default Card;
