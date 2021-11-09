import React, { useState, useEffect, useContext } from 'react';

import {
    VALIDATOR_REQUIRE
  } from '../../util/validators';
  import { useHttpClient } from '../../hooks/http-hook';
  import LoadingSpinner from "../../UIElements/LoadingSpinner"

import ImageUpload from "../../FormElements/ImageUpload"
import Button from "../../FormElements/Button"
import Input from '../../FormElements/Input';

import { useForm } from "../../hooks/form-hook"
import ErrorModal from "../../UIElements/ErrorModal"
import { AuthContext } from '../../../context/auth-context';

const AdminSpecialReservation = () => {

    const { isLoading, error, sendRequest, clearError } = useHttpClient();
    const auth = useContext(AuthContext);

    const [reservation, setReservation] = useState([]);
    const [reservationDay, setReservationDay] = useState([]);
    const [reservationHour, setReservationHour] = useState([]);

    const [formState, inputHandler] = useForm(
        {
          value: {
            value: '',
            isValid: false
        }
        },
        false
      );

    const [dayFormState, selectDayHandler] = useForm(
        {
            name: {
              value: '',
              isValid: false
          }
        },
        false
      );

    const [hourFormState, selectHourHandler] = useForm(
        {
            name: {
              value: '',
              isValid: false
          }
        },
        false
      );

    useEffect(() => {
        const fetchSpecialReservation = async () => {
            try {
              const responseData = await sendRequest(
                `${process.env.REACT_APP_BACKEND_URL}/api/reservation`
              );
      
              setReservation(responseData.reservations);
        } catch (err) {}
          
    };
    fetchSpecialReservation();
      }, [sendRequest])

    useEffect(() => {
        
        const fetchDay = async () => {
            if(dayFormState.inputs.name.value) {
            try {
              const responseData = await sendRequest(
                `${process.env.REACT_APP_BACKEND_URL}/api/reservation/${dayFormState.inputs.name.value}`
              );
      
              setReservationDay(responseData.reservation);
            //   setItemAvailability(responseData.item.available)
            //   setItemBonus(responseData.item.bonus)
        } catch (err) {}      
        } else return
    }
    fetchDay();
  }, [sendRequest, dayFormState.inputs.name.value])

  useEffect(() => {
        
    const fetchHour = async () => {
        if(hourFormState.inputs.name.value) {
           const hour = reservationDay.hours.find(i => i.id === hourFormState.inputs.name.value)
           setReservationHour(hour); 
    } else return
}
fetchHour();
}, [sendRequest, hourFormState.inputs.name.value])

  const inputChange = (e) => {
      e.preventDefault()
  }

    // const setOptions = categories.map(i => <option value={i.id}>{i.name}</option>)
    const setDaysOptions = reservation.days.map(i => <option value={i.id}>{i.name}</option>)
    const setDaysOptions = reservation.days.map(i => <option value={i.id}>{i.name}</option>)
    const setInputs = reservationDay.availableHours.map((i, id) => {
        return (
            <div key={id}>
                <input
                id={i.id}
                value={i.guests}
                ></input>
            </div>
        )
    })

    return (
        <React.Fragment>
            <ErrorModal error={error} onClear={clearError} />
            {isLoading && <LoadingSpinner asOverlay />}
            <h2>Zaktualizuj liczbę gości</h2>
                <Input 
                    id="name"
                    element="select"
                    name="select"
                    label="Wybierz dzień"
                    validators={[VALIDATOR_REQUIRE()]}
                    errorText="Wybierz dzień."
                    onInput={selectDayHandler}
                    options={setDaysOptions}
                />
                {reservationDay && <Input 
                    id="name"
                    element="select"
                    name="select"
                    label="Wybierz godzinę"
                    validators={[VALIDATOR_REQUIRE()]}
                    errorText="Wybierz godzinę."
                    onInput={selectHourHandler}
                    options={setDaysOptions}
                />
                }
                {reservationHour && <form
                onSubmit={itemSubmitHandler}
                >
                    <Input 
                    id="value"
                    element="input"
                    type="number"
                    label="Wpisz maksymalną liczbę gości"
                    validators={[VALIDATOR_REQUIRE()]}
                    errorText="Wpisz maksymalną liczbę gości."
                    onInput={inputHandler}
                    initialValue={reservationHour.guests}
                /> 
                <Button type="submit">
                    ZMIEŃ LICZBĘ
                </Button>
                </form>
                }


                {reservationDay && <form
                onSubmit={itemSubmitHandler}
                >
                    <Input 
                    id="name"
                    element="input"
                    type="text"
                    label="Nazwa produktu"
                    validators={[VALIDATOR_REQUIRE()]}
                    errorText="Wprowadź poprawną nazwę."
                    onInput={inputHandler}
                    initialValue={item.name}
                    />
                    <Input 
                    id="description"
                    element="textarea"
                    type="text"
                    label="Opis produktu"
                    validators={[VALIDATOR_REQUIRE()]}
                    errorText="Wprowadź poprawny opis."
                    onInput={inputHandler}
                    initialValue={item.description}
                    />
                    <Input 
                    id="price"
                    element="input"
                    type="number"
                    label="Cena"
                    validators={[VALIDATOR_REQUIRE()]}
                    errorText="Wprowadź poprawną cenę."
                    onInput={inputHandler}
                    initialValue={item.price}
                    />
                    {categories.length > 0 && <Input 
                    id="category"
                    element="select"
                    name="select"
                    label="Kategoria"
                    validators={[VALIDATOR_REQUIRE()]}
                    errorText="Wprowadź poprawną kategorię."
                    onInput={inputHandler}
                    options={setOptions}
                    initialValue={item.category}
                    />}
                    <label for='availability' style={{fontWeight: 'bold', marginBottom: '0.5rem'}}>Produkt dostępny?</label>
                    <input id='availability' type='checkbox' onChange={changeAvailability} checked={itemAvailability} style={{display: 'block', margin: 'auto'}} />
                    <label for='bonus' style={{fontWeight: 'bold', marginBottom: '0.5rem'}}>Produkt gratis?</label>
                    <input id='bonus' type='checkbox' onChange={changeBonus} checked={itemBonus} style={{display: 'block', margin: 'auto'}} />
                    <label for='special' style={{fontWeight: 'bold', marginBottom: '0.5rem'}}>Kolacje degustacyjne?</label>
                    <input id='special' type='checkbox' onChange={changeSpecial} checked={itemSpecial} style={{display: 'block', margin: 'auto'}} />
                    <Button type="submit"
                    >
                    ZMIEŃ
                    </Button>
                </form>}
        </React.Fragment>
    )
}

export default AdminSpecialReservation
