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

const AdminDeliveryPrice = () => {
    const [actualDeliveryTime, setActualDeliveryTime] = useState(false); 

    const { isLoading, error, sendRequest, clearError } = useHttpClient();
    const auth = useContext(AuthContext);

    const [formState, inputHandler] = useForm(
        {
          deliveryTime: {
            value: '',
            isValid: false
        }
        },
        false
      );

    useEffect(() => {
        const fetchDeliveryTime = async () => {
            try {
              const responseData = await sendRequest(
                `${process.env.REACT_APP_BACKEND_URL}/api/deliverytime/${process.env.REACT_APP_DELIVERY_TIME_ID}`
              );
              setActualDeliveryTime(responseData.deliveryTime.time);
            
        } catch (err) {}
          
    };
    fetchDeliveryTime();
      }, [sendRequest])
    

    const deliveryTimeSubmitHandler = async event => {
        event.preventDefault();
          try {
            await sendRequest(
              `${process.env.REACT_APP_BACKEND_URL}/api/deliverytime/${process.env.REACT_APP_DELIVERY_TIME_ID}`,
              'PATCH',
              JSON.stringify({
                time: parseInt(formState.inputs.deliveryTime.value)
              }),
              {
                Authorization: 'Bearer ' + auth.token,
                'Content-Type': 'application/json'
              }
            );
                alert("Zaktualizowano wartość")
                window.location.reload()
          } catch (err) {}
      };
    

    return (
        <React.Fragment>
            <ErrorModal error={error} onClear={clearError} />
            {isLoading && <LoadingSpinner asOverlay />}
                <h2>Zmień czas dowozu</h2>
                {actualDeliveryTime && <form
                onSubmit={deliveryTimeSubmitHandler}
                >
                    <Input 
                    id="deliveryTime"
                    element="input"
                    type="number"
                    label="Czas dowozu (min)"
                    validators={[VALIDATOR_REQUIRE()]}
                    errorText="Wprowadź poprawną wartość."
                    onInput={inputHandler}
                    initialValue={actualDeliveryTime}
                    /> 
                    <Button type="submit"
                    >
                    ZMIEŃ CZAS
                    </Button> 
                </form>}
                </React.Fragment>
    )
}

export default AdminDeliveryPrice
