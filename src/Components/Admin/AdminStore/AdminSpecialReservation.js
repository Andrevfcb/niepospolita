import React, { useState, useEffect, useContext } from 'react';

import {
    VALIDATOR_REQUIRE
  } from '../../util/validators';
  import { useHttpClient } from '../../hooks/http-hook';
  import LoadingSpinner from "../../UIElements/LoadingSpinner"

import Button from "../../FormElements/Button"
import Input from '../../FormElements/Input';

import { useForm } from "../../hooks/form-hook"
import ErrorModal from "../../UIElements/ErrorModal"
import { AuthContext } from '../../../context/auth-context';
import Modal from '../../UIElements/Modal';

const AdminSpecialReservation = () => {

    const { isLoading, error, sendRequest, clearError } = useHttpClient();
    const auth = useContext(AuthContext);

    const [reservation, setReservation] = useState([]);
    const [reservationDay, setReservationDay] = useState(false);
    const [availableHours, setAvailableHours] = useState([]);
    const [available, setAvailable] = useState(false);
    const [message, setMessage] = useState('');
    const [showModal, setShowModal] = useState(false);

    const [dayFormState, selectDayHandler] = useForm(
        {
            name: {
              value: '',
              isValid: false
          }
        },
        false
      );

    const [formState, inputHandler] = useForm(
        {
            hour: {
              value: '',
              isValid: false
          },
          guests: {
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
              
              setReservation(responseData.reservations[0].days);
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
              setAvailable(responseData.reservation.available.value)
              setMessage(responseData.reservation.available.message)
              const hours = responseData.reservation.availableHours
              const sortHours = hours.sort((a, b) => {
               return a.hour - b.hour})
              setAvailableHours(sortHours)
        } catch (err) {}      
        } else return
    }
    fetchDay();
  }, [sendRequest, dayFormState.inputs.name.value])

  const inputChange = (e) => {
      e.preventDefault()
      const hourId = availableHours.find(i => i._id === e.target.id);
      const newGuests = parseInt(e.target.value)
      hourId.guests = newGuests
      const newAvailableHours = {
        ...availableHours
      }
      setAvailableHours(Object.values(newAvailableHours))
  }
  const deleteInput = (e) => {
    const hourId = availableHours.find(i => i._id === e.target.id);
    const newAvailableHours = availableHours.filter(i => !(i === hourId));
    setAvailableHours(Object.values(newAvailableHours))
  }
  const changeAvailability = () => {
    setMessage('')
    setAvailable(prevAvailable => !prevAvailable)
  }
  const messageHandler = (e) => {
    setMessage(e.target.value)
  }

  const submitHandler = async (e) => {
    e.preventDefault()
    const newAvailable = {
      value: available,
      message
    }
    try {
      await sendRequest(
        `${process.env.REACT_APP_BACKEND_URL}/api/reservation/${reservationDay._id}`,
        'PATCH',
        JSON.stringify({
          available: newAvailable,
          availableHours
        }),
        {
          // Authorization: 'Bearer ' + auth.token,
          'Content-Type': 'application/json'
        }
      );
          alert("Zaktualizowano")
          window.location.reload()
    } catch (err) {}
  }

  const submitNewHourHandler = async (e) => {
    e.preventDefault()
    
    try {
      await sendRequest(
        `${process.env.REACT_APP_BACKEND_URL}/api/reservation/${reservationDay._id}`,
        'POST',
        JSON.stringify({
          hour: formState.inputs.hour.value,
          guests: formState.inputs.guests.value
        }),
        {
          Authorization: 'Bearer ' + auth.token,
          'Content-Type': 'application/json'
        }
      );
          alert("Dodano godzinę")
          window.location.reload()
    } catch (err) {}
  }

  const closeModalHandler = () => {
    setShowModal(false)
  }

  const openModalHandler = () => {
    setShowModal(true)
  }

    const setDaysOptions = reservation.map(i => <option value={i._id}>{i.name}</option>)
    const setInputs = availableHours.map((i, id) => {
        return (
            <div key={id}>
              <p>
                <span style={{color: "black", fontWeight: "bold"}}>Godzina {i.hour}:00 - </span>
                <span style={{color: "black", fontWeight: "bold"}}>Liczba gości:</span>
              <input
                style={{margin: "0 1em", width: "10%", textAlign: "center"}}
                type="number"
                id={i._id}
                value={availableHours[id].guests}
                onChange={inputChange}
                ></input>
                <span 
                id={i._id}
                class="fas fa-times" 
                style={{cursor: 'pointer'}} 
                onClick={deleteInput}
                ></span>
              </p>
            </div>
        )
    })

    return (
        <React.Fragment>
            <ErrorModal error={error} onClear={clearError} />
            {isLoading && <LoadingSpinner asOverlay />}
            <Modal
            show={showModal}
            onCancel={closeModalHandler}
            header={
              <h2>Nowa Godzina</h2>
            }
            contentClass="place-item__modal-content"
            footerClass="place-item__modal-actions"
            footer={<Button onClick={closeModalHandler}>ZAMKNIJ</Button>}
            >
            <React.Fragment>
            <ErrorModal error={error} onClear={clearError} />
            {isLoading && <LoadingSpinner asOverlay />}
            <form 
              className="new-hour"
              onSubmit={submitNewHourHandler}
            >
                <Input
                id="hour"
                element="input"
                type="number"
                label="Godzina"
                validators={[VALIDATOR_REQUIRE()]}
                errorText="Wprowadź poprawną godzinę."
                onInput={inputHandler}
                ></Input>
                <Input
                id="guests"
                element="input"
                type="number"
                label="Liczba gości"
                validators={[VALIDATOR_REQUIRE()]}
                errorText="Wprowadź poprawną liczbę gości."
                onInput={inputHandler}
                ></Input>
                <Button 
                 type="submit"
                 disabled={!formState.isValid}
                 onClick={submitNewHourHandler}
                >DODAJ
                </Button>
              </form>
            </React.Fragment>
            </Modal>

            <h2>Zaktualizuj liczbę gości</h2>
                {reservation.length > 0 && <Input 
                    id="name"
                    element="select"
                    name="select"
                    label="Wybierz dzień"
                    validators={[VALIDATOR_REQUIRE()]}
                    errorText="Wybierz dzień."
                    onInput={selectDayHandler}
                    options={setDaysOptions}
                />}
                {reservationDay && <div>
                {setInputs}
                <Button 
                onClick={openModalHandler}
                >Dodaj godzinę</Button>
                </div>
                }
                {reservationDay && <form 
                onSubmit={submitHandler}
                >
                <div style={{borderTop: '1px solid', borderBottom: '1px solid', color: 'black'}}>
                  <label for='available' style={{fontWeight: 'bold', padding: '0.5em', display: 'block'}}>Dostępność:</label>
                  <input id='available' type='checkbox' onChange={changeAvailability} checked={available} style={{display: 'block', margin: '0.5em auto'}} />
                  {!available && <p><span>Wiadomość:</span><textarea onChange={messageHandler} value={message} style={{display: 'block', margin: '0.5em auto'}}/></p>}
                </div>
                <Button 
                type="submit">
                  ZAKTUALIZUJ
                </Button>
                </form>}
                
        </React.Fragment>
    )
}

export default AdminSpecialReservation
