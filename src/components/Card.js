function Card({card, id, klikni}){
    const cardsClass = card.status ? ` active ${card.status}` : "";

    return (
        <div className={"card" + cardsClass} onClick={()=>klikni(id)}>
            <img src={card.img} alt={card.name}/>
        </div>
    )
}

export default Card;