import React, { useState, useEffect, useContext } from 'react';
import "./Order.css"
import Button from '../FormElements/Button'
import LoadingSpinner from "../UIElements/LoadingSpinner"
import { useHttpClient } from '../hooks/http-hook';
import ErrorModal from "../UIElements/ErrorModal";
import { CartContext } from '../../context/cart-context';
import Card from '../UIElements/Card';
import { Link } from 'react-router-dom';
import { useStripe } from '@stripe/react-stripe-js'

import {
    VALIDATOR_REQUIRE,
    VALIDATOR_EMAIL
  } from '../util/validators';
  import Input from '../FormElements/Input';

import { useForm } from "../hooks/form-hook"

import Geocode from "react-geocode";

const Order = () => {
    

    const [items, setItems] = useState([])
    const [orderValid, setOrderValid] = useState(false)
    const { isLoading, error, sendRequest, clearError } = useHttpClient();
    const [minOrderValue, setMinOrderValue] = useState(false);
    const { cartItems, itemCount, removeProduct, increase, decrease, total } = useContext(CartContext);
    const stripe = useStripe();

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
            zipCode_start: {
                value: '',
                isValid: false
        },
            zipCode_end: {
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
        }
        },
        false
      );

    const formSubmitHandler = async event => {
        event.preventDefault();
        
        const line_items = cartItems.map(i => {
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
        

          try {
            const responseData = await sendRequest(
                `${process.env.REACT_APP_BACKEND_URL}/api/checkout/`,
                'POST',
                JSON.stringify({
                    line_items,
                    customer_email: formState.inputs.email.value
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
      };


    return (
        <React.Fragment>
        {isLoading && <LoadingSpinner asOverlay />}
        <ErrorModal error={error} onClear={clearError} />
        <div className="order">
                <h1>Uzupełnij dane do zamówienia</h1>
                <Card>
                <form
                onSubmit={formSubmitHandler}
                >
                    {/* <h3>Wypełnij dane do zamówienia</h3> */}
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
                    type="number"
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
                            <div className="address-city__zip-label">
                                <label>Kod pocztowy</label>
                            </div>
                            <div className="address-city__zip-input">
                            <Input 
                                id="zipCode_start"
                                element="input"
                                type="text"
                                // label="Kod pocztowy"
                                validators={[VALIDATOR_REQUIRE()]}
                                errorText={formState.inputs.zipCode_end.isValid && "Podaj poprawny kod pocztowy."}
                                onInput={inputHandler}
                            />
                            <span>-</span>
                            <Input 
                                id="zipCode_end"
                                element="input"
                                type="text"
                                // label="Nr lokalu"
                                validators={[VALIDATOR_REQUIRE()]}
                                errorText={formState.inputs.zipCode_start.isValid && "Podaj poprawny kod pocztowy."}
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
                    <Button type="submit"
                    disabled={!formState.isValid}>
                    PŁATNOŚĆ PRZY ODBIORZE
                    </Button>
                    <Button type="submit"
                    disabled={!formState.isValid}>
                    PŁATNOŚĆ ONLINE
                    </Button>
                    {/* <button onClick={() => console.log(formState.inputs)
                     }></button> */}
                </form>
                </Card>
            {/* {!items.length > 0 && <h3 style={{color: "white"}}>Brak produktów w koszyku</h3>}
            {items.length > 0 && <Button disabled={!orderValid}>Przejdź do zamówienia</Button>}
            {!items.length > 0 && <Link to="/"><Button>Przejdź do sklepu</Button></Link>} */}
        </div>
        </React.Fragment>
        
    )
}

export default Order
