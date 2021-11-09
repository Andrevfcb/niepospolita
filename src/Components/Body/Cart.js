import React, { useState, useEffect, useContext } from 'react';
import "./Cart.css"
import Button from '../FormElements/Button'
import LoadingSpinner from "../UIElements/LoadingSpinner"
import { useHttpClient } from '../hooks/http-hook';
import { useDate } from '../hooks/date-hook';
import ErrorModal from "../UIElements/ErrorModal";
import { CartContext } from '../../context/cart-context';
import Card from '../UIElements/Card';
import { Link } from 'react-router-dom';

import Geocode from "react-geocode";

const Cart = () => {

    const [orderValid, setOrderValid] = useState({valid: false, message: ''})
    const { isLoading, error, sendRequest, clearError } = useHttpClient();
    const [minOrderValue, setMinOrderValue] = useState(false);
    const [deliveryHours, setDeliveryHours] = useState(false);
    const [deliveryPrice, setDeliveryPrice] = useState(false);
    const [minBonusDeliveryPrice, setMinBonusDeliveryPrice] = useState(false);
    const [minBonusItemsPrice, setMinBonusItemsPrice] = useState(false);
    const [bonusItemCheckedId, setBonusItemCheckedId] = useState(false);
    const [bonusItems, setBonusItems] = useState([]);
    const { cartItems, removeProduct, increase, decrease, total, addBonusItem, bonusItem } = useContext(CartContext);
    const { today, dayId, currentHour, currentMinute } = useDate();

    useEffect(() => {
        window.scrollTo(0, 0)
            const getMinOrderValue = async () => {
                try {
                    const responseData = await sendRequest(
                    `${process.env.REACT_APP_BACKEND_URL}/api/value/${process.env.REACT_APP_MIN_VALUE_ID}`
                  );
                
                setMinOrderValue(responseData.value)
                } catch (err) {}
            }
            const getDeliveryHours = async () => {
                
                try {
                    const responseData = await sendRequest(
                    `${process.env.REACT_APP_BACKEND_URL}/api/time/`
                  );
                
                  setDeliveryHours(responseData.time)
                } catch (err) {}
            } 
            const getDeliveryPrice = async () => {
                
                try {
                    const responseData = await sendRequest(
                        `${process.env.REACT_APP_BACKEND_URL}/api/delivery/${process.env.REACT_APP_DELIVERY_PRICE_ID}`
                      );
                      setDeliveryPrice(responseData.delivery_price.value);
                } catch (err) {}
            }
            const getBonusItems = async () => {
                
                try {
                    const responseData = await sendRequest(
                        `${process.env.REACT_APP_BACKEND_URL}/api/bonus/`
                      );
                      setBonusItems(responseData.bonusItems);
                } catch (err) {}
            }
            const getBonusItemsPrice = async () => {
                
                try {
                    const responseData = await sendRequest(
                        `${process.env.REACT_APP_BACKEND_URL}/api/bonus-items/${process.env.REACT_APP_BONUS_ITEMS_PRICE_ID}`
                      );
                      setMinBonusItemsPrice(responseData.bonus_items_price.value);
                } catch (err) {}
            }
            const getBonusDeliveryPrice = async () => {
                
                try {
                    const responseData = await sendRequest(
                        `${process.env.REACT_APP_BACKEND_URL}/api/bonus-delivery/${process.env.REACT_APP_BONUS_DELIVERY_PRICE_ID}`
                      );
                      setMinBonusDeliveryPrice(responseData.bonus_delivery_price.value);
                } catch (err) {}
            }
            getMinOrderValue()
            getDeliveryHours()
            getDeliveryPrice()
            getBonusItems()
            getBonusItemsPrice()
            getBonusDeliveryPrice()
    }, [sendRequest])

    useEffect(() => {
        const orderValidation = {valid: false, message: ''}
        if(cartItems && deliveryHours && today && dayId && currentHour && currentMinute) {
            const currentDay = deliveryHours.find(time => time._id === dayId)
            // const startHour = currentDay.time.start.hour
            // const startMinute = currentDay.time.start.minute
            const endHour = currentDay.time.end.hour
            const endMinute = currentDay.time.end.minute
            
                if (!currentDay.available) {
                    orderValidation.valid = false
                    orderValidation.message = 'W dzisiejszym dniu nie dowozimy'
                } else if (total < minOrderValue.value) {
                    orderValidation.valid = false
                    orderValidation.message = `Minimalna kwota zamówienia to ${minOrderValue.value} zł`
                } 
                // else if (startHour > currentHour || endHour < currentHour || (startHour === currentHour && startMinute >= currentMinute) || (endHour === currentHour && endMinute <= currentMinute)) {
                // orderValidation.valid = false
                // orderValidation.message = `W dzisiejszym dniu dania można zamawiać od ${startHour < 10 ? '0' + startHour : startHour }:${startMinute < 10 ? '0' + startMinute : startMinute} do ${endHour < 10 ? '0' + endHour : endHour }:${endMinute < 10 ? '0' + endMinute : endMinute}`
                // }
                else if (endHour < currentHour || (endHour === currentHour && endMinute <= currentMinute)) {
                    orderValidation.valid = false
                    orderValidation.message = `W dzisiejszym dniu już nie dowozimy. Zapraszamy ponownie.`
                    }
                else {
                    orderValidation.valid = true
                    orderValidation.message = ''
            }
        }
        return (
            setOrderValid(orderValidation)
            )
    }, [cartItems, deliveryHours, today, dayId, currentHour, currentMinute, total, minOrderValue])

    const getCoordinates = () => {
        Geocode.setApiKey('AIzaSyCC2-7o0QiPK0-IoueeS0VgFOgUbWNE_Gw')
        Geocode.fromAddress("Eiffel Tower").then(
        (response) => {
          const { lat, lng } = response.results[0].geometry.location;
          console.log(lat, lng);
        },
        (error) => {
          console.error(error);
        }
      );
    }

    const checkProductQuantity = (quantity, product) => {
        if(quantity <= 0) removeProduct(product)
    }

    const changeBonusItem = (e) => {
        setBonusItemCheckedId(e.target.id)
    }

    const showCartItems = cartItems.map(item => {
        const product = { id: item.id, name: item.name, price: item.price, image: item.image, description: item.description };
        const price = item.price * item.quantity
        return (
        <li className="item-card" key={item.id}>
            <img src={`${process.env.REACT_APP_AWS_URL}/${item.image}`} alt={item.name}></img>
            <span className="item-name">{item.name}</span>
            <span class="fas fa-minus item-quantity__handler" onClick={() => {
                decrease(product)
                checkProductQuantity(item.quantity, product)
                }}></span>
            <span class="item-quantity" onClick={() => {getCoordinates()}}>{item.quantity}</span>
            <span class="fas fa-plus item-quantity__handler" onClick={() => {increase(product)}}></span>
            <span class="item-price">{price.toFixed(2)} zł</span>
            <span class="fas fa-times item-remove" onClick={() => {removeProduct(product)}}></span>
        </li>
            )
    })

    const showBonusItems = bonusItems.map(item => {
        return <li className="item-card bonus-item" key={item._id}>
            <img src={`${process.env.REACT_APP_BACKEND_URL}/${item.image}`} alt={item.image}></img>
            <div>
                <span>{item.name}</span>
                <input id={item._id} type='checkbox' 
                onChange={changeBonusItem}
                onClick={() => addBonusItem(item)}
                checked={item._id === (bonusItemCheckedId || (bonusItem && bonusItem.id))} 
                style={{display: 'block', margin: 'auto', marginTop: '1em'}} />
            </div>
            
        </li>
    })

    return (
        <React.Fragment>
        {isLoading && <LoadingSpinner asOverlay />}
        <ErrorModal error={error} onClear={clearError} />
        <div className="cart">
                <h1 onClick={() => console.log(bonusItem)}
                >Twój koszyk</h1>
                {cartItems.length > 0 &&<div className="cart-info">
                    <p>Koszt dowozu: <b>{deliveryPrice && deliveryPrice} zł</b>, w przypadku dowozu poza Lublin koszt obliczany wg odległości.</p>
                    {minBonusDeliveryPrice && <p>Zamówienie powyżej {minBonusDeliveryPrice} zł <b style={{color: "lightgreen"}}>dostawa gratis!</b></p>}
                    {bonusItems.length > 0 && minBonusItemsPrice && <p >Zamówienie powyżej {minBonusItemsPrice} zł <b style={{color: "lightgreen"}}>produkt gratis!</b></p>}
                </div>}
                {cartItems.length > 0 && <Card>
            <div className="cart-products">
            <li className="item-card titles">
                    <span className='item-name'>Produkt</span>
                    <span style={{width: '20%'}}>Ilość</span>
                    <span style={{width: '20%'}}>Cena</span>
                    <span style={{width: '10%', marginLeft: '5px'}}></span>
            </li>
                {showCartItems}
            <li className="item-card summary ">
                    <span className='item-name'></span>
                    <span className='total'>SUMA:  <b style={{marginLeft: "5px", color: "white"}}>{total.toFixed(2)} zł</b> 
                    {total.toFixed(2) <= minBonusDeliveryPrice ? <b> + ({deliveryPrice} zł dostawa)</b> : <span style={{fontSize: "0.7em", color: "lightgreen"}}>(powyżej {minBonusDeliveryPrice} zł dostawa gratis)</span>} </span>
            </li>
            <li className="item-card__alert">
                    <span>{!orderValid.valid && minOrderValue && <p>{orderValid.message}</p>}</span>
            </li>
            {total.toFixed(2) > minBonusItemsPrice && <div>
                <h3>Wybierz produkt gratis</h3>
                <div className="bonus">
                {showBonusItems}
                </div>
            </div>}
            </div>
            
            </Card>}
            {!cartItems.length > 0 && <h3 style={{color: "white"}}>Brak produktów w koszyku</h3>}
            {cartItems.length > 0 && <Link to="/zamowienie"><Button disabled={!orderValid.valid}>Przejdź do zamówienia</Button></Link>}
            {!cartItems.length > 0 && <Link to="/"><Button>Przejdź do sklepu</Button></Link>}
        </div>
        </React.Fragment>
        
    )
}

export default Cart