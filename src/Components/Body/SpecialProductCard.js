import React, {useState} from 'react';
import Button from '../FormElements/Button';


const SpecialProductCard = ({ id, name, price, image, description, quantity, changeClickedProductId, quantityChange }) => {

    const [menuQuantity, setMenuQuantity] = useState(quantity)

    const menuQuantityChange = (e) => {
        console.log(e.target.className.includes('fa-minus'));
        
        if (e.target.className.includes('fa-minus')) {
            if(menuQuantity > 1) {
                setMenuQuantity(prevQuantity => prevQuantity - 1)
            } else {
                setMenuQuantity(1)
            }
        } else {
            if(menuQuantity < 9) {
                setMenuQuantity(prevQuantity => prevQuantity + 1)
            } else {setMenuQuantity(9)}
        }
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
                <p className=" name price">
                    <span style={{fontWeight: "bold"}}>{name}</span>
                    <span style={{fontWeight: "bold", marginLeft: "0.7em"}}>{price} zł</span>
                </p>
                <p className="description">
                    {description}
                </p>
                <div>
                    {/* Wybierz liczbę: <input 
                    type='number' 
                    id={id} 
                    onChange={quantityChange}
                    min={1}
                    value={quantity}
                    /> */}
                    <span style={{color: 'white'}}>Liczba:</span> 
                    <span 
                    class="fas fa-minus item-quantity__handler"
                    id={id} 
                    onClick={(e) => {
                        menuQuantityChange(e)
                        quantityChange(e)
                        }}></span>
                    <span style={{color: 'white'}}>{menuQuantity}</span>
                    <span
                    class="fas fa-plus item-quantity__handler"
                    id={id}
                    onClick={(e) => {
                        menuQuantityChange(e)
                        quantityChange(e)
                        }}></span>
                <Button 
                id={id}
                onClick={changeClickedProductId}
                >WYBIERZ</Button>
                </div>
                </div>
            </div>
        </React.Fragment>
    )
}

export default SpecialProductCard
