import React, { useState, useEffect, useContext } from 'react';
import "./Order.css"
import Button from '../FormElements/Button'
import LoadingSpinner from "../UIElements/LoadingSpinner"
import { useHttpClient } from '../hooks/http-hook';
import ErrorModal from "../UIElements/ErrorModal";
import { CartContext } from '../../context/cart-context';
import Card from '../UIElements/Card';
import { Link, useHistory } from 'react-router-dom';
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
    const { cartItems, total } = useContext(CartContext);
    const [deliveryPrice, setDeliveryPrice] = useState(false);
    const [bonusItems, setBonusItems] = useState([]);
    const [timepickerValue, setTimepickerValue] = useState('nie określono');
    const [minTime, setMinTime] = useState();
    const [maxTime, setMaxTime] = useState();
    const [isToLateToOrder, setIsToLateToOrder] = useState(false);

    const [deliveryHours, setDeliveryHours] = useState(false);
    const stripe = useStripe();
    let history = useHistory();
    
    const { today, dayId, currentHour, currentMinute } = useDate();

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
            const getBonusItems = async () => {
                
                try {
                    const responseData = await sendRequest(
                        `${process.env.REACT_APP_BACKEND_URL}/api/bonus/`
                      );
                      setBonusItems(responseData.bonusItems);
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
            getDeliveryPrice()
            getBonusItems()
            getDeliveryHours()
    }, [sendRequest])

    useEffect(() => {
        let minOrderTime
        let maxOrderTime
        if(deliveryHours && today && dayId && currentHour && currentMinute) {
            const currentDay = deliveryHours.find(time => time._id === dayId)
            const startHour = currentDay.time.start.hour
            const startMinute = currentDay.time.start.minute + '0'
            const endHour = currentDay.time.end.hour
            const endMinute = currentDay.time.end.minute + '0'
            
            maxOrderTime = (endHour + ':' + endMinute).toString()

            if(currentHour > startHour) {
                if(currentMinute > 30) {
                    minOrderTime = (currentHour + 1 + ':30').toString()
                } else {
                    minOrderTime = (currentHour + 1 + ':00').toString()
                }
                
            } else if (currentHour === startHour && currentMinute > startMinute) {
                if(currentMinute > 30) {
                    minOrderTime = (currentHour + 1 + ':30').toString()
                } else {
                    minOrderTime = (currentHour + 1 + ':00').toString()
                }
            } else minOrderTime = (startHour + ':' + startMinute).toString()
            const endTimeDifference = endMinute - currentMinute

            if(currentHour >= endHour || (currentHour === endHour && (currentMinute > endMinute || endTimeDifference < 30 )) ) {
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
        //   name: {
        //     value: '',
        //     isValid: false
        // },
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
            
            if (total >= 80 && bonusItems.length > 0) {
                bonusItems.map(i => {
                    return line_items.push({
                    quantity: 1,
                    price_data: {
                        currency: "pln",
                        unit_amount: 0 * 100,
                        product_data: {
                            name: i.name + " gratis"
                        }}})})
            } else if (total <= 60) {
                line_items.push(delivery_price)
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
        if (!!formState.inputs.message.value) {
            address = {
                ...address,
                message: formState.inputs.message.value
            }
        } else {
            address = {
                ...address,
                message: "brak"
            }
        }
        if (event.target.id === "payment-online") {
            try {
                const responseData = await sendRequest(
                    `${process.env.REACT_APP_BACKEND_URL}/api/checkout/`,
                    'POST',
                    JSON.stringify({
                        line_items,
                        customer_email: formState.inputs.email.value,
                        message: formState.inputs.message.value,
                        deliveryHour: timepickerValue.toString(),
                        phone: formState.inputs.phoneNumber.value,
                        address
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
        } else if (event.target.id === "payment-offline") {

            let delivery_info
            let totalAmount
            if (total && deliveryPrice && total <= 60 ) {
                delivery_info = deliveryPrice + "zł"
                totalAmount = total + deliveryPrice
            } else {
                delivery_info = "dostawa gratis"
                totalAmount = total
            }
            let bonusItemsNames = 'brak - za mała kwota zamówienia'
            if(bonusItems.length > 0 && total > 80 ) {
                bonusItemsNames = bonusItems.map(item => {
                    return `${item.name} `
                })
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
                        total: totalAmount,
                        delivery_info,
                        bonusItemsNames,
                        timepickerValue
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
    
    return (
        <React.Fragment>
        {isLoading && <LoadingSpinner asOverlay />}
        <ErrorModal error={error} onClear={clearError} />
        <div className="order">
                <h1 onClick={() => console.log(timepickerValue)
                }>Uzupełnij dane do zamówienia</h1>
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
                    // validators={[VALIDATOR_REQUIRE()]}
                    // errorText="Podaj poprawny nr mieszkania."
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
                    // errorText="Podaj nr telefonu."
                    onInput={inputHandler}
                    />
                    <label style={{fontWeight: 'bold', marginBottom: '0.5rem', minHeight: '28px'}}>Wybierz oczekiwany czas dowozu:</label>
                    <div className='timepicker'>
                    <TimePickerComponent
                    placeholder="wybierz godzinę"
                    format="HH:mm"
                    step={30}
                    // value={timepickerValue}
                    min={minTime}
                    max={maxTime}
                    onChange={handleTimeValue}
                    ></TimePickerComponent>
                    </div>
                    
                    <Button
                    disabled={!formState.isValid || isToLateToOrder}
                    id="payment-offline"
                    onClick={formSubmitHandler}
                    >
                    PŁATNOŚĆ PRZY ODBIORZE
                    </Button>
                    <Button
                    disabled={!formState.isValid || isToLateToOrder}
                    id="payment-online"
                    onClick={formSubmitHandler}
                    >
                    PŁATNOŚĆ ONLINE
                    </Button>
                </form>}
                {isToLateToOrder && <p style={{color: 'red'}}>Dziś już nie dowozimy, zapraszamy ponownie.</p>}
                </Card>
        </div>
        </React.Fragment>
        
    )
}

export default Order
