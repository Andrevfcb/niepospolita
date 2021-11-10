import React, { useContext } from 'react';
import { useHistory } from "react-router-dom";
import Button from '../FormElements/Button';
import { CartContext } from '../../context/cart-context';
import { isInCart } from '../../helper';


const ProductCard = ({id, name, price, image, description}) => {

    const product = { id, name, price, image, description };
    const { addProduct, cartItems } = useContext(CartContext)
    const history = useHistory()

    const goToCartSection = () => {
          history.push("/koszyk");
    }

    return (
        <React.Fragment>
            <div 
            className="item-card"
            >
                <div className="item-card__image">
                <img src={`${process.env.REACT_APP_AWS_URL}/${image}`} alt={name}></img>
                </div>
                <div className="item-card__info">
                <p className="name price">
                    <span style={{fontWeight: "bold", 
                    maxWidth: "70%"
                    }}>{name}</span>
                    <span style={{fontWeight: "bold", marginLeft: "0.7em"}}>{price} zł</span>
                </p>
                <p className="description">
                    {description}
                </p>
                {
                    !isInCart(product, cartItems) && <Button onClick={() => {
                        addProduct(product)
                    }}>Dodaj do koszyka</Button>
                }
                {
                    isInCart(product, cartItems) && <Button active={true} onClick={() => goToCartSection()}>Przejdź do koszyka</Button>
                }
                </div>
            </div>
        </React.Fragment>
    )
}

export default ProductCard
