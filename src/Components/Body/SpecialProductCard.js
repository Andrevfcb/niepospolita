import React, { useState, useContext } from 'react';
import { useHistory } from "react-router-dom";
import Button from '../FormElements/Button';
import { CartContext } from '../../context/cart-context';
import { isInCart } from '../../helper';


const SpecialProductCard = ({ id, name, price, image, description, specialItemCheckedId, changeClickedProductId }) => {

    const product = { id, name, price, image, description };
    const { addProduct, cartItems } = useContext(CartContext)
    const history = useHistory()
    // const [showReservation, setShowReservation] = useState(false);

    return (
        <React.Fragment>
            <div 
            className="item-card"
            >
                <div className="item-card__image">
                <img src={`${process.env.REACT_APP_AWS_URL}/${image}`} alt={name}></img>
                </div>
                <div className="item-card__info">
                <p>
                    <span style={{fontWeight: "bold"}}>{name}</span>
                    <span style={{fontWeight: "bold"}}>{price} zł</span>
                </p>
                <Button 
                id={id}
                onClick={changeClickedProductId}
                isClicked={id === specialItemCheckedId}
                >WYBIERZ</Button>
                </div>
            </div>
        </React.Fragment>
    )
}

export default SpecialProductCard
