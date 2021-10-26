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

const AdminTime = () => {
    const [times, setTimes] = useState([]);
    const [time, setTime] = useState(false);
    const [timeAvailability, setTimeAvailability] = useState();

    const { isLoading, error, sendRequest, clearError } = useHttpClient();
    const auth = useContext(AuthContext);

    const [formState, inputHandler] = useForm(
        {
          startHour: {
            value: '',
            isValid: false
        },
        startMinute: {
            value: '',
            isValid: false
        },
        endHour: {
            value: '',
            isValid: false
        },
        endMinute: {
            value: '',
            isValid: false
        }
        },
        false
      );

      const [dayFormState, selectHandler] = useForm(
        {
            day: {
              value: '',
              isValid: false
          }
        },
        false
      );


    useEffect(() => {
        const fetchTimes = async () => {
            try {
              const responseData = await sendRequest(
                `${process.env.REACT_APP_BACKEND_URL}/api/time`
              );
              setTimes(responseData.time);             
            
        } catch (err) {}
          
    };
    fetchTimes();
      }, [sendRequest])

      useEffect(() => {
        const fetchTime = async () => {
            if(dayFormState.inputs.day.value) {
            try {
              const responseData = await sendRequest(
                `${process.env.REACT_APP_BACKEND_URL}/api/time/${dayFormState.inputs.day.value}`
              );
              setTime(responseData.time);
              setTimeAvailability(responseData.time.available);
        } catch (err) {}      
        } else return
    }
    fetchTime();
  }, [sendRequest, dayFormState.inputs.day.value])
    

    const timeSubmitHandler = async event => {
        event.preventDefault();
          try {
            await sendRequest(
              `${process.env.REACT_APP_BACKEND_URL}/api/time/${dayFormState.inputs.day.value}`,
              'PATCH',
              JSON.stringify({
                startHour: parseInt(formState.inputs.startHour.value),
                startMinute: parseInt(formState.inputs.startMinute.value),
                endHour: parseInt(formState.inputs.endHour.value),
                endMinute: parseInt(formState.inputs.endMinute.value),
                available: timeAvailability
              }),
              {
                Authorization: 'Bearer ' + auth.token,
                'Content-Type': 'application/json'
              }
            );
                alert("Zaktualizowano Godziny")
                window.location.reload()
          } catch (err) {}
      };

      const changeAvailability = () => {
        setTimeAvailability(prevAvailibility => !prevAvailibility)
    }

    const setOptions = times.map(i => <option value={i._id}>{i.day}</option>)
    

    return (
        <React.Fragment>
            <ErrorModal error={error} onClear={clearError} />
            {isLoading && <LoadingSpinner asOverlay />}
                <h2>Zmień godziny dowozu</h2>
                {times.length > 0 && <Input 
                    id="day"
                    element="select"
                    name="select"
                    label="Wybierz dzień"
                    validators={[VALIDATOR_REQUIRE()]}
                    errorText="Wybierz poprawny dzień."
                    onInput={selectHandler}
                    options={setOptions}
                    />}
                
                {time && <form
                onSubmit={timeSubmitHandler}
                >
                    <div className="start">
                    <span>Start: </span>
                    <Input 
                    id="startHour"
                    element="input"
                    type="number"
                    min={0}
                    max={23}
                    // label="Minimalna wartość zamówienia"
                    validators={[VALIDATOR_REQUIRE()]}
                    // errorText="Wprowadź poprawną wartość."
                    onInput={inputHandler}
                    initialValue={time.time.start.hour}
                    />
                    :
                    <Input 
                    id="startMinute"
                    element="input"
                    type="number"
                    min={0}
                    max={59}
                    // label="Minimalna wartość zamówienia"
                    validators={[VALIDATOR_REQUIRE()]}
                    // errorText="Wprowadź poprawną wartość."
                    onInput={inputHandler}
                    initialValue={time.time.start.minute}
                    />
                    </div>
                    <div className="end">
                        <span>Koniec: </span>
                    <Input 
                    id="endHour"
                    element="input"
                    type="number"
                    min={0}
                    max={23}
                    // label="Godzina"
                    validators={[VALIDATOR_REQUIRE()]}
                    // errorText="Wprowadź poprawną wartość."
                    onInput={inputHandler}
                    initialValue={time.time.end.hour}
                    />
                    :
                    <Input 
                    id="endMinute"
                    element="input"
                    type="number"
                    min={0}
                    max={59}
                    // label="Minimalna wartość zamówienia"
                    validators={[VALIDATOR_REQUIRE()]}
                    // errorText="Wprowadź poprawną wartość."
                    onInput={inputHandler}
                    initialValue={time.time.end.minute}
                    />
                    <div className='availability' style={{marginTop: "1em"}}>
                    <label for='availability' style={{fontWeight: 'bold', marginBottom: '0.5rem'}}>Dowóz aktywny?</label>
                    <input id='availability' type='checkbox' onChange={changeAvailability} checked={timeAvailability} style={{display: 'block', margin: 'auto'}} />
                    </div>
                    
                    </div>
                    <Button type="submit"
                    // disabled={!formState.isValid}
                    >
                    ZMIEŃ GODZINY
                    </Button>
                </form>}
                </React.Fragment>
    )
}

export default AdminTime

