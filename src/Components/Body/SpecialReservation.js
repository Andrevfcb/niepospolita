import React, { useState, useEffect, useRef } from 'react';
import "./SpecialReservation.css"
import { useHttpClient } from '../hooks/http-hook';
import SpecialProductCard from './SpecialProductCard';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useStripe } from '@stripe/react-stripe-js'
import Input from '../FormElements/Input';
import { VALIDATOR_REQUIRE, VALIDATOR_MIN, VALIDATOR_MAX } from '../util/validators';
import { useForm } from '../hooks/form-hook';
import Button from '../FormElements/Button';

import LoadingSpinner from "../UIElements/LoadingSpinner"
import ErrorModal from "../UIElements/ErrorModal"

const SpecialReservation = () => {

    const [reservation, setReservation] = useState([]);
    const [available, setAvailable] = useState(false);
    const [message, setMessage] = useState('');
    const [startDate, setStartDate] = useState(new Date(new Date().getFullYear(), new Date().getMonth(), new Date().getDate() + 1));
    const [maxGuests, setMaxGuests] = useState(0)
    const [specialItemCheckedId, setSpecialItemCheckedId] = useState(false);
    const [items, setItems] = useState([]);
    const { isLoading, error, sendRequest, clearError } = useHttpClient();
    const stripe = useStripe();
    const formElements = useRef()

    const [formState, inputHandler] = useForm(
        {
            hour: {
              value: '',
              isValid: false
          },
          guests: {
            value: '',
            isValid: false
        },
          email: {
            value: '',
            isValid: false
        },
        phone: {
            value: '',
            isValid: false
        }
        },
        false
    );

    useEffect(() => {
        // window.scrollTo(0, 0)
        const fetchItems = async () => {
                try {
                    const responseData = await sendRequest(
                    `${process.env.REACT_APP_BACKEND_URL}/api/items/`
                  );
                
                  const filteredItems = responseData.items.filter(item => item.special === true)
                setItems(filteredItems)
                } catch (err) {}
            }
            let day
            if (startDate) {
                day = startDate.getDay() - 1
                if (day < 0 ) {
                    day = 6
                }
            }
            console.log(day);
            
            const fetchSpecialReservation = async () => {
                try {
                  const responseData = await sendRequest(
                    `${process.env.REACT_APP_BACKEND_URL}/api/reservation`
                  );
                  setAvailable(responseData.reservations[0].available.value)
                  setMessage(responseData.reservations[0].available.message)
                  
                  setReservation(responseData.reservations[0].days[day].availableHours);
                  if (formState.inputs.hour.isValid) {
                    const availableGuests = responseData.reservations[0].days[day].availableHours.find(h => h.hour === parseInt(formState.inputs.hour.value))
                    setMaxGuests(availableGuests.guests)
                  }
            } catch (err) {}     
        };
        fetchSpecialReservation();
            fetchItems()
        }, [sendRequest, startDate, formState.inputs.hour.isValid, formState.inputs.hour.value] )

        const changeClickedProductId = (e) => {
            e.preventDefault();
            if (specialItemCheckedId === e.target.value) {
                return setSpecialItemCheckedId(false)
            } else {
            setSpecialItemCheckedId(e.target.value)
            formElements.current.scrollIntoView({ behavior: 'smooth', block: 'start' })
        }
        }

        const itemList = () => {
            let item_list
            let sortItems
            if(items.length > 0) {
                sortItems = items.sort((a, b) => a.name > b.name ? 1 : -1)
                item_list = sortItems.map((i, id) => {
                return (<SpecialProductCard key={id} id={id} name={i.name} price={i.price} description={i.description} image={i.image} changeClickedProductId={changeClickedProductId} specialItemCheckedId={specialItemCheckedId} />)
                })
            } return item_list
        }

        const formSubmitHandler = async event => {
            event.preventDefault();
            
            let line_items
            if (items && specialItemCheckedId) {
                line_items = 
                    [{
                        quantity: 1,
                        price_data: {
                            currency: "pln",
                            unit_amount: items[specialItemCheckedId].price * 100,
                            product_data: {
                                name: items[specialItemCheckedId].name,
                                description: items[specialItemCheckedId].description
                        }  
                    }
                }]
            }
            const day = startDate.getDate()
            const month = startDate.getMonth() + 1
            const year = startDate.getFullYear()
            const message = `Data: ${day}/${month}/${year} - Godzina: ${formState.inputs.hour.value}:00 - liczba osób: ${formState.inputs.guests.value}`
            let address = {
                street: '',
                local: '',
                zipCode: '',
                city: '',
                message
            }
            const productName = items[specialItemCheckedId].name
                try {
                    const responseData = await sendRequest(
                        `${process.env.REACT_APP_BACKEND_URL}/api/checkout/`,
                        'POST',
                        JSON.stringify({
                            line_items,
                            customer_email: formState.inputs.email.value,
                            message,
                            deliveryHour: '',
                            phone: formState.inputs.phone.value,
                            address,
                            productName,
                            option: 'reservation'
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

        const setHourOptions = reservation.map(i => <option value={i.hour}>{i.hour}:00</option>)

    return (
        <div className="special">
        <ErrorModal error={error} onClear={clearError} />
        {isLoading && <LoadingSpinner asOverlay />}
        {available && <div>
        {items.length > 0 && 
            <div className="special-items">
            <h1>Wybierz produkt i zarezerwuj stolik</h1>
            {itemList()}
            </div>
            }
            <div ref={formElements}></div>
            {specialItemCheckedId && <form
            onSubmit={formSubmitHandler}
            className="special-reservation">
                <h2 style={{margin: '0'}}>Uzupełnij dane:</h2>
                <p style={{margin: '0.5em 0 1em 0'}}>Wybrano: {specialItemCheckedId && items[specialItemCheckedId].name}</p>
            <label style={{
                fontWeight: 'bold', 
                marginBottom: '0.5em', 
                minHeight: '28px',
                display: 'block'
                }}>Wybierz datę:</label>
            <DatePicker 
            id="date"
            selected={startDate} 
            onChange={(date) => {
                setStartDate(date)
                formState.inputs.hour.value = ''
                formState.inputs.hour.isValid = false
                formState.inputs.guests.value = ''
                formState.inputs.guests.isValid = false
                setMaxGuests(0)
            }}
            dateFormat='dd/MM/yyyy' 
            minDate={new Date(new Date().getFullYear(), new Date().getMonth(), new Date().getDate() + 1)}
            maxDate={new Date(new Date().getFullYear(), new Date().getMonth(), new Date().getDate() + 10)}
            />
            <Input 
                id="hour"
                element="select"
                name="select"
                label="Wybierz godzinę:"
                validators={[VALIDATOR_REQUIRE()]}
                errorText="Proszę wybrać godzinę."
                onInput={inputHandler}
                options={setHourOptions}
            />
            <Input 
                id="guests"
                element="input"
                type="number"
                label={`Wybierz liczbę osób: 
                ${maxGuests > 0 && formState.inputs.hour.isValid ? `(na godzinę ${formState.inputs.hour.value}:00 maksymalna liczba osób - ${maxGuests})`: ''}`}
                validators={[VALIDATOR_MIN(0), VALIDATOR_MAX(maxGuests)]}
                errorText={`Nieprawidłowa liczba osób`}
                onInput={inputHandler}
                options={setHourOptions}
            />
            <Input 
                id="email"
                element="input"
                type="email"
                label="Podaj email:"
                validators={[VALIDATOR_REQUIRE()]}
                errorText="Nieprawidłowy email."
                onInput={inputHandler}
            />
            <Input 
                id="phone"
                element="input"
                type="text"
                label="Podaj nr telefonu:"
                validators={[VALIDATOR_REQUIRE()]}
                errorText="Nieprawidłowy nr telefonu."
                onInput={inputHandler}
            />
            <Button
                type="submit"
                disabled={startDate && (!formState.isValid || !formState.inputs.hour.isValid || !formState.inputs.guests.isValid)}
            >
                Zarezerwuj i Zapłać
                </Button>
            </form>}
        </div>}
            {!available && <div>
                <h2 style={{marginTop: "5em"}}>{message ? message : 'Brak możliwości rezerwacji'}</h2>
            </div>}
        </div>
    )
}

export default SpecialReservation
