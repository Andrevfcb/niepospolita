import React from 'react';
import Button from '../FormElements/Button';


const SpecialProductCard = ({ id, name, price, image, description, specialItemCheckedId, changeClickedProductId }) => {

    return (
        <React.Fragment>
            <div
            className="item-card"
            >
                <div className="item-card__image">
                <img src={`${process.env.REACT_APP_AWS_URL}/${image}`} alt={name}></img>
                </div>
                <div className="item-card__info">
                <p className=" name price">
                    <span style={{fontWeight: "bold"}}>{name}</span>
                    <span style={{fontWeight: "bold", marginLeft: "0.7em"}}>{price} zł</span>
                </p>
                <p className="description">
                    {description}
                </p>
                <Button 
                id={id}
                onClick={changeClickedProductId}
                isClicked={id.toString() === specialItemCheckedId}
                >WYBIERZ</Button>
                </div>
            </div>
        </React.Fragment>
    )
}

export default SpecialProductCard
