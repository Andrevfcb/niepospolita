import React, { useState, useEffect, useContext } from 'react';
import "./Order.css"
import Button from '../FormElements/Button'
import LoadingSpinner from "../UIElements/LoadingSpinner"
import { useHttpClient } from '../hooks/http-hook';
import ErrorModal from "../UIElements/ErrorModal";
import { CartContext } from '../../context/cart-context';
import Card from '../UIElements/Card';
import { useHistory } from 'react-router-dom';
import { useStripe } from '@stripe/react-stripe-js'
import { TimePickerComponent } from '@syncfusion/ej2-react-calendars'
import { useDate } from '../hooks/date-hook';

import {
    VALIDATOR_REQUIRE,
    VALIDATOR_EMAIL
  } from '../util/validators';
  import Input from '../FormElements/Input';

import { useForm } from "../hooks/form-hook"

const Order = () => {
    

    const { isLoading, error, sendRequest, clearError } = useHttpClient();
    
    const [deliveryPrice, setDeliveryPrice] = useState(false);
    const [timepickerValue, setTimepickerValue] = useState('nie określono');
    const [minTime, setMinTime] = useState();
    const [maxTime, setMaxTime] = useState();
    const [isToLateToOrder, setIsToLateToOrder] = useState(false);
    const [paymentOffline, setPaymentOffline] = useState(false);
    const [minBonusDeliveryPrice, setMinBonusDeliveryPrice] = useState(false);
    const [minBonusItemsPrice, setMinBonusItemsPrice] = useState(false);

    const [deliveryHours, setDeliveryHours] = useState(false);
    const stripe = useStripe();
    let history = useHistory();
    
    const { today, dayId, currentHour, currentMinute } = useDate();
    const { cartItems, total, bonusItem } = useContext(CartContext);

    useEffect(() => {
        window.scrollTo(0, 0)
            const getDeliveryPrice = async () => {
                
                try {
                    const responseData = await sendRequest(
                        `${process.env.REACT_APP_BACKEND_URL}/api/delivery/${process.env.REACT_APP_DELIVERY_PRICE_ID}`
                      );
                      setDeliveryPrice(responseData.delivery_price.value);
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
            getDeliveryPrice()
            getDeliveryHours()
            getBonusItemsPrice()
            getBonusDeliveryPrice()
    }, [sendRequest])

    useEffect(() => {
        let minOrderTime
        let maxOrderTime
        if(deliveryHours && today && dayId && currentHour && currentMinute) {
            const currentDay = deliveryHours.find(time => time._id === dayId)
            const startHour = currentDay.time.start.hour
            let startMinute = currentDay.time.start.minute
            const endHour = currentDay.time.end.hour
            let endMinute = currentDay.time.end.minute

            if (currentDay.time.start.minute < 10) {
                startMinute = currentDay.time.start.minute + '0'
            } else {
                startMinute = currentDay.time.start.minute
            }

            if (currentDay.time.end.minute < 10) {
                endMinute = currentDay.time.end.minute + '0'
            } else {
                endMinute = currentDay.time.end.minute
            }
            
            maxOrderTime = (endHour + ':' + endMinute).toString()
            
            
            if(currentHour > startHour) {
                if(currentMinute > 45) {
                    minOrderTime = (currentHour + 2 + ':00').toString()
                } else if (currentMinute > 30) {
                    minOrderTime = (currentHour + 1 + ':45').toString()
                } else if (currentMinute > 15) {
                    minOrderTime = (currentHour + 1 + ':30').toString()
                } else {
                    minOrderTime = (currentHour + 1 + ':15').toString()
                }
                
            } else if (currentHour === startHour && currentMinute > startMinute) {
                if(currentMinute > 45) {
                    minOrderTime = (currentHour + 2 + ':00').toString()
                } else if (currentMinute > 30) {
                    minOrderTime = (currentHour + 1 + ':45').toString()
                } else if (currentMinute > 15) {
                    minOrderTime = (currentHour + 1 + ':30').toString()
                } else {
                    minOrderTime = (currentHour + 1 + ':15').toString()
                }
            } else minOrderTime = (startHour + 1 + ':' + startMinute).toString()

            if(currentHour >= endHour || (currentHour === (endHour - 1) && (currentMinute > endMinute )) ) {
                setIsToLateToOrder(true)
            }
        }
            if(minOrderTime && maxOrderTime) {
                setMinTime(new Date(`8/3/2017 ${minOrderTime}`))
                setMaxTime(new Date(`8/3/2017 ${maxOrderTime}`))
            }
    }, [deliveryHours, today, dayId, currentHour, currentMinute])

    const [formState, inputHandler] = useForm(
        {
            street: {
                value: '',
                isValid: false
        },
            local: {
                value: '',
                isValid: false
        },
            apartament: {
                value: null,
                isValid: true
        },
            zipCode: {
                value: '',
                isValid: false
        },
            city: {
                value: '',
                isValid: false
        },
            email: {
                value: '',
                isValid: false
        },
            phoneNumber: {
                value: '',
                isValid: false
        },
        message: {
            value: null,
            isValid: true
        },
        },
        false
      );

    const formSubmitHandler = async event => {
        event.preventDefault();
        
        let customer_items = cartItems.map(i => {
            return {
                quantity: i.quantity,
                name: i.name,
                price: i.price
            }
        })
        let line_items
        if (cartItems && deliveryPrice) {
            line_items = cartItems.map(i => {
                return {
                    quantity: i.quantity,
                    price_data: {
                        currency: "pln",
                        unit_amount: i.price * 100,
                        product_data: {
                            name: i.name,
                            description: i.description
                        }
                    }  
                }
            })
    
            const delivery_price = {
                quantity: 1,
                price_data: {
                    currency: "pln",
                    unit_amount: deliveryPrice * 100,
                    product_data: {
                        name: 'opłata za dowóz'
                    }
                }  
            }

            if (total <= minBonusDeliveryPrice) {
                line_items.push(delivery_price)
            }
            
            if (total >= minBonusItemsPrice && bonusItem) {
                line_items.push({
                    quantity: 1,
                    price_data: {
                        currency: "pln",
                        unit_amount: 0 * 100,
                        product_data: {
                            name: bonusItem.item + " gratis"
                        }}})
            }
        }
        
        let address = {
            street: formState.inputs.street.value,
            local: formState.inputs.local.value,
            zipCode: formState.inputs.zipCode.value,
            city: formState.inputs.city.value
        }
        if (!!formState.inputs.apartament.value) {
            address = {
                ...address,
                apartament: formState.inputs.apartament.value
            }
        } else {
            address = {
                ...address,
                apartament: false
            }
        }
        let message
        if (!!formState.inputs.message.value) {
            message = formState.inputs.message.value
        } else {
            message = 'brak'
        }
        if (event.target.id === "payment-online" && !isToLateToOrder) {
            try {
                const responseData = await sendRequest(
                    `${process.env.REACT_APP_BACKEND_URL}/api/checkout/`,
                    'POST',
                    JSON.stringify({
                        line_items,
                        customer_email: formState.inputs.email.value,
                        message,
                        deliveryHour: timepickerValue.toString(),
                        phone: formState.inputs.phoneNumber.value,
                        address,
                        productName: '',
                        option: 'order'
                    }),
                    {
                      'Content-Type': 'application/json'
                    }
                );
                const { sessionId } = responseData
                await stripe.redirectToCheckout({
                    sessionId
                })
            } catch (err) {}
        } else if (event.target.id === "payment-offline" && !isToLateToOrder) {

            let delivery_info
            let totalAmount
            const paymentMethod = event.target.name
            if (total && deliveryPrice && total <= minBonusDeliveryPrice ) {
                delivery_info = deliveryPrice + "zł"
                totalAmount = total + deliveryPrice
            } else {
                delivery_info = "dostawa gratis"
                totalAmount = total
            }
            let bonusItemName = 'brak'
            if(bonusItem && total > minBonusItemsPrice ) {
                bonusItemName = bonusItem.item
            }
            
            try { 
                await sendRequest(
                    `${process.env.REACT_APP_BACKEND_URL}/api/mail/`,
                    'POST',
                    JSON.stringify({
                        customer_email: formState.inputs.email.value,
                        customer_phoneNumber: formState.inputs.phoneNumber.value,
                        customer_address: address,
                        customer_items,
                        message,
                        total: totalAmount,
                        delivery_info,
                        bonusItemName,
                        timepickerValue,
                        paymentMethod,
                        option: 'order'
                    }),
                    {
                      'Content-Type': 'application/json'
                    }
                );
                await history.push("/success")
                window.location.reload()
              } catch (err) {}
        } 
      };

    const handleTimeValue = (e) => {
        let hours
        let minutes
        if (e.target.value) {
            hours = e.target.value.getHours()
            minutes = e.target.value.getMinutes()
            if (minutes < 10) {
                minutes = '0' + e.target.value.getMinutes()
            }
            setTimepickerValue(hours + ':' + minutes)
        } else {setTimepickerValue('nie określono')}
      }

    const handleOfflinePayment = (e) => {
        e.preventDefault();
        setPaymentOffline(prevPayment => !prevPayment)
    }
    
    return (
        <React.Fragment>
        {isLoading && <LoadingSpinner asOverlay />}
        <ErrorModal error={error} onClear={clearError} />
        <div className="order">
                <h1>Uzupełnij dane do zamówienia</h1>
                <Card>
                {!isToLateToOrder &&  
                <form
                >
                    <div className="address-street">
                    <Input 
                    id="street"
                    element="input"
                    type="text"
                    label="Ulica"
                    validators={[VALIDATOR_REQUIRE()]}
                    errorText="Wprowadź poprawną nazwę ulicy."
                    onInput={inputHandler}
                    />
                    <Input 
                    id="local"
                    element="input"
                    type="text"
                    label="Nr lokalu"
                    validators={[VALIDATOR_REQUIRE()]}
                    errorText="Podaj poprawny nr lokalu."
                    onInput={inputHandler}
                    />
                    <Input 
                    id="apartament"
                    element="input"
                    type="text"
                    label="Nr mieszkania"
                    validators={null}
                    initialValid={true}
                    onInput={inputHandler}
                    />
                    </div>
                    <div className="address-city">
                        <div className="address-city__zip" style={{position: 'relative'}}>
                            <div className="address-city__zip-input">
                            <Input 
                                id="zipCode"
                                element="input"
                                type="text"
                                label="Kod pocztowy"
                                validators={[VALIDATOR_REQUIRE()]}
                                errorText={"Podaj poprawny kod pocztowy."}
                                onInput={inputHandler}
                            />
                            </div>
                        </div>
                    <div className="address-city__city">
                    <Input 
                    id="city"
                    element="input"
                    type="text"
                    label="Miasto"
                    validators={[VALIDATOR_REQUIRE()]}
                    errorText="Podaj poprawną nazwę miasta."
                    onInput={inputHandler}
                    />
                    </div>
                    
                    </div>
                    <Input 
                    id="email"
                    element="input"
                    type="email"
                    label="Email"
                    validators={[VALIDATOR_REQUIRE(), VALIDATOR_EMAIL]}
                    errorText="Podaj poprawny email."
                    onInput={inputHandler}
                    />
                    <Input 
                    id="phoneNumber"
                    element="input"
                    type="text"
                    label="Numer telefonu"
                    validators={[VALIDATOR_REQUIRE()]}
                    errorText="Podaj nr telefonu."
                    onInput={inputHandler}
                    />
                    <Input 
                    id="message"
                    element="textarea"
                    type="text"
                    label="Komentarz do dostawcy"
                    validators={null}
                    initialValid={true}
                    onInput={inputHandler}
                    />
                    <label style={{fontWeight: 'bold', marginBottom: '0.5rem', minHeight: '28px'}}>Wybierz oczekiwany czas dowozu:</label>
                    <div className='timepicker'>
                    <TimePickerComponent
                    placeholder="wybierz godzinę"
                    format="HH:mm"
                    step={15}
                    min={minTime}
                    max={maxTime}
                    onChange={handleTimeValue}
                    ></TimePickerComponent>
                    </div>
                    <div>
                    <Button
                    disabled={!formState.isValid || isToLateToOrder}
                    id="payment-offline"
                    onClick={handleOfflinePayment}
                    isClicked={paymentOffline}
                    >
                    PŁATNOŚĆ PRZY ODBIORZE
                    </Button>
                    <Button
                    disabled={!formState.isValid || isToLateToOrder || paymentOffline}
                    id="payment-online"
                    onClick={formSubmitHandler}
                    >
                    PŁATNOŚĆ ONLINE
                    </Button>
                    </div>
                    {paymentOffline && <div style={{margin: '1em'}}>
                    <Button
                    disabled={!formState.isValid || isToLateToOrder}
                    id="payment-offline"
                    payment="karta"
                    onClick={formSubmitHandler}
                    >
                    PŁATNOŚĆ KARTĄ
                    </Button>
                    <Button
                    disabled={!formState.isValid || isToLateToOrder}
                    id="payment-offline"
                    payment="gotówka"
                    onClick={formSubmitHandler}
                    >
                    PŁATNOŚĆ GOTÓWKĄ
                    </Button>
                    </div>}
                </form>}
                {isToLateToOrder && <p style={{color: 'red'}}>Dziś już nie dowozimy, zapraszamy ponownie.</p>}
                </Card>
        </div>
        </React.Fragment>
        
    )
}

export default Order
