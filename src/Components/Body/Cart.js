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

    

    const [items, setItems] = useState([])
    const [orderValid, setOrderValid] = useState({valid: false, message: ''})
    const { isLoading, error, sendRequest, clearError } = useHttpClient();
    const [minOrderValue, setMinOrderValue] = useState(false);
    const [deliveryHours, setDeliveryHours] = useState(false);
    const { cartItems, itemCount, removeProduct, increase, decrease, total } = useContext(CartContext);
    const { today, dayId, currentHour, currentMinute } = useDate();

    // const checkOrderValidation = () => {
    //     let validation = false
    //     if (cartItems && total && minOrderValue) {
    //         if(total < minOrderValue) {
    //             validation = false
    //         }
    //         else {
    //             validation = true
    //         }
    //     }
    //     return validation
    // }
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
            getMinOrderValue()
            getDeliveryHours()
    }, [sendRequest])

    useEffect(() => {
        const orderValidation = {valid: false, message: ''}
        if(cartItems && deliveryHours && today && dayId && currentHour && currentMinute) {
            const currentDay = deliveryHours.find(time => time._id === dayId)
            const startHour = currentDay.time.start.hour
            const startMinute = currentDay.time.start.minute
            const endHour = currentDay.time.end.hour
            const endMinute = currentDay.time.end.minute
            
                if (!currentDay.available) {
                    orderValidation.valid = false
                    orderValidation.message = 'W dzisiejszym dniu nie dowozimy'
                } else if (total < minOrderValue.value) {
                    orderValidation.valid = false
                    orderValidation.message = `Minimalna kwota zamówienia to ${minOrderValue.value} zł`
                } else if (startHour > currentHour || endHour < currentHour || (startHour === currentHour && startMinute >= currentMinute) || (endHour === currentHour && endMinute <= currentMinute)) {
                orderValidation.valid = false
                orderValidation.message = `W dzisiejszym dniu dania można zamawiać od ${startHour < 10 ? '0' + startHour : startHour }:${startMinute < 10 ? '0' + startMinute : startMinute} do ${endHour < 10 ? '0' + endHour : endHour }:${endMinute < 10 ? '0' + endMinute : endMinute}`
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

    const showCartItems = cartItems.map(item => {
        const product = { id: item.id, name: item.name, price: item.price, image: item.image, description: item.description };
        const price = item.price * item.quantity

        return (
        <li className="item-card" key={item.id}>
            <img src={`${process.env.REACT_APP_BACKEND_URL}/${item.image}`} alt={item.name}></img>
            <span className="item-name">{item.name}</span>
            <span class="fas fa-minus item-quantity__handler" onClick={() => {
                decrease(product)
                checkProductQuantity(item.quantity, product)
                }}></span>
            <span class="item-quantity" onClick={() => {getCoordinates()}}>{item.quantity}</span>
            <span class="fas fa-plus item-quantity__handler" onClick={() => {increase(product)}}></span>
            <span class="item-price">{price} zł</span>
            <span class="fas fa-times item-remove" onClick={() => {removeProduct(product)}}></span>
        </li>
            )
    })

    return (
        <React.Fragment>
        {isLoading && <LoadingSpinner asOverlay />}
        <ErrorModal error={error} onClear={clearError} />
        <div className="cart">
                <h1>Twój koszyk</h1>
                {cartItems.length > 0 && <Card>
            <div className="cart-products">
            <li className="item-card titles">
                    <span className='item-name'>Nazwa produktu</span>
                    <span style={{width: '20%'}}>Ilość</span>
                    <span style={{width: '10%'}}>Cena</span>
                    <span style={{width: '10%', marginLeft: '5px'}}></span>
            </li>
                {showCartItems}
            <li className="item-card summary ">
                    <span className='item-name'></span>
                    <span style={{width: '25%'}}>SUMA:  <b style={{marginLeft: "5px", color: "white"}}>{total} zł</b></span>
                    <span style={{width: '5%', marginLeft: '5px'}}></span>
            </li>
            <li className="item-card__alert">
                    <span>{!orderValid.valid && minOrderValue && <p>{orderValid.message}</p>}</span>
            </li>
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
