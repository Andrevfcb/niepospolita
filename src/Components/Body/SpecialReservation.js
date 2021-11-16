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
import { useHistory } from 'react-router-dom';

import LoadingSpinner from "../UIElements/LoadingSpinner"
import ErrorModal from "../UIElements/ErrorModal"

const SpecialReservation = () => {

    const [reservation, setReservation] = useState({availableHours: []});
    const [available, setAvailable] = useState(false);
    const [message, setMessage] = useState('');
    const [startDate, setStartDate] = useState(new Date(new Date().getFullYear(), new Date().getMonth(), new Date().getDate() + 1));
    const [maxGuests, setMaxGuests] = useState(0)
    const [specialItem, setSpecialItem] = useState([]);
    const [items, setItems] = useState([]);
    const [menus, setMenus] = useState([]);
    const { isLoading, error, sendRequest, clearError } = useHttpClient();
    const stripe = useStripe();

    let history = useHistory();

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
        const fetchItems = async () => {
                try {
                    const responseData = await sendRequest(
                    `${process.env.REACT_APP_BACKEND_URL}/api/items/`
                  );
                
                const filteredItems = responseData.items.filter(item => item.special === true)
                setItems(filteredItems)
                
                if (menus.length < 1) {
                    let newMenus = []
                    filteredItems.map(i => {
                        const newMenu = {
                            id: i._id,
                            name: i.name,
                            quantity: 1,
                            price: i.price,
                            chosen: false,
                            description: i.description
                        }
                        return newMenus.push(newMenu)
                    }
                    )
                    setMenus(newMenus)
                }
                } catch (err) {}
            }
            let day
            if (startDate) {
                day = startDate.getDay() - 1
                if (day < 0 ) {
                    day = 6
                }
            }
            const fetchSpecialReservation = async () => {
                try {
                  const responseData = await sendRequest(
                    `${process.env.REACT_APP_BACKEND_URL}/api/reservation`
                  );
                  setAvailable(responseData.reservations[0].days[day].available.value)
                  setMessage(responseData.reservations[0].days[day].available.message)
                  setReservation(responseData.reservations[0].days[day]);
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
            
            const value = e.target.value
            if (specialItem.includes(value)) {
                setSpecialItem(prevItem => prevItem.filter(i => !(value === i)))
                e.target.style.background = '#b39809'
                e.target.innerHTML = 'WYBIERZ'
                menus[value].chosen = false
            } else {
                setSpecialItem(prevItem => [...prevItem, value])
                e.target.style.background = '#726006'
                e.target.innerHTML = 'WYBRANO'
                menus[value].chosen = true;
        }
        }

    const quantityChange = (e) => {
        e.preventDefault();
        const newMenus = [...menus]
        if (e.target.className.includes('fa-minus')) {
            if (newMenus[e.target.id].quantity > 1) {
                newMenus[e.target.id].quantity--
            } else newMenus[e.target.id].quantity = 1;
        } else {
            if (newMenus[e.target.id].quantity < 9) {
                newMenus[e.target.id].quantity++
            } else newMenus[e.target.id].quantity = 9;
            
        }
        setMenus(newMenus)
    }

    const formSubmitHandler = async event => {
        event.preventDefault();
        let total = 0
        let line_items = []
        if (items && menus) {
            menus.map(item => {
                if (item.chosen && event.target.id === 'payment-online') {
                    const newItem = {
                        quantity: item.quantity,
                        price_data: {
                            currency: "pln",
                            unit_amount: item.price * 100,
                            product_data: {
                                name: item.name,
                                description: item.description
                        }  
                    }
                    }
                    return line_items.push(newItem)
                } else if (item.chosen && event.target.id === 'payment-offline') {
                    const newItem = {
                        quantity: item.quantity,
                        name: item.name,
                        price: item.price
                    }
                    
                    total = total + (item.price * item.quantity)
                    return line_items.push(newItem)
                }
            })     
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
        const productName = ''
        const newAvailable = {
            value: true,
            message
          }
          
          const chosenHour = reservation.availableHours.find(hour => hour.hour === parseInt(formState.inputs.hour.value))
          chosenHour.guests = chosenHour.guests - parseInt(formState.inputs.guests.value)
          let newHours = [
              ...reservation.availableHours
          ]
          try {
            await sendRequest(
              `${process.env.REACT_APP_BACKEND_URL}/api/reservation/${reservation._id}`,
              'PATCH',
              JSON.stringify({
                available: newAvailable,
                availableHours: newHours
              }),
              {
                'Content-Type': 'application/json'
              }
            );
          } catch (err) {}
            if (event.target.id === 'payment-online') {
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
              } else if (event.target.id === 'payment-offline') {
                try { 
                    await sendRequest(
                        `${process.env.REACT_APP_BACKEND_URL}/api/mail/`,
                        'POST',
                        JSON.stringify({
                            customer_email: formState.inputs.email.value,
                            customer_phoneNumber: formState.inputs.phone.value,
                            customer_address: address,
                            customer_items: line_items,
                            total,
                            delivery_info: '',
                            bonusItemName: '',
                            timepickerValue: '',
                            paymentMethod: '',
                            message,
                            option: 'reservation'
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
        const itemList = items.map((i, id) => {
            let quantity
            if (menus.length > 0) {
                quantity = menus[id].quantity
            }
            return (<SpecialProductCard key={id} id={id} name={i.name} price={i.price} description={i.description} image={i.image} changeClickedProductId={changeClickedProductId} quantityChange={quantityChange} quantity={quantity ? quantity : 1}
                />)
            })
   
        const filteredHours = reservation.availableHours.filter(i => !(i.guests === 0))
        const setHourOptions = filteredHours.map(i => <option value={i.hour}>{i.hour}:00</option>)
        const chosenMenus = menus.map(menu => {
            if (menu.chosen) return (<p style={{color: 'white'}}>
                {menu.name} - Ilość: {menu.quantity} - Cena: {menu.price * menu.quantity} zł
            </p>)
        })

    return (
        <div className="special">
        <ErrorModal error={error} onClear={clearError} />
        {isLoading && <LoadingSpinner asOverlay />}
        {available && <div>
        {items.length > 0 && 
            <div className="special-items">
            <h1>Wybierz menu i zarezerwuj stolik</h1>
            {itemList}
            </div>
            }
            {specialItem.length > 0 && <form
            className="special-reservation">
                <h2 style={{margin: '0'}}
                >Uzupełnij dane:</h2>
                <p style={{fontWeight: 'bold', fontSize: '1.2em'}}>Wybrano:</p>
                {menus && chosenMenus}
            <label style={{
                fontWeight: 'bold', 
                marginBottom: '0.5em', 
                marginTop: '2em', 
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
                id="payment-offline"
                onClick={formSubmitHandler}
                disabled={startDate && (!formState.isValid || !formState.inputs.hour.isValid || !formState.inputs.guests.isValid || formState.inputs.guests.value === '0' || specialItem.length <= 0)}
            >
                Zapłać na miejscu
                </Button>
            <Button
                id="payment-online"
                onClick={formSubmitHandler}
                disabled={startDate && (!formState.isValid || !formState.inputs.hour.isValid || !formState.inputs.guests.isValid || formState.inputs.guests.value === '0' || specialItem.length <= 0)}
            >
                Zapłać online
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
