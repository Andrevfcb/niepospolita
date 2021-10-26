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

const AdminValue = () => {
    const [value, setValue] = useState(false); 

    const { isLoading, error, sendRequest, clearError } = useHttpClient();
    const auth = useContext(AuthContext);

    const [formState, inputHandler] = useForm(
        {
          value: {
            value: '',
            isValid: false
        }
        },
        false
      );

    useEffect(() => {
        const fetchValue = async () => {
            try {
              const responseData = await sendRequest(
                `${process.env.REACT_APP_BACKEND_URL}/api/value/${process.env.REACT_APP_MIN_VALUE_ID}`
              );
              setValue(responseData.value);
            
        } catch (err) {}
          
    };
    fetchValue();
      }, [sendRequest])
    

    const valueSubmitHandler = async event => {
        event.preventDefault();
          try {
            await sendRequest(
              `${process.env.REACT_APP_BACKEND_URL}/api/value/${process.env.REACT_APP_MIN_VALUE_ID}`,
              'PATCH',
              JSON.stringify({
                newValue: parseInt(formState.inputs.value.value)
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
                <h2>Zmień minimalną wartość zamówienia</h2>
                {value && <form
                onSubmit={valueSubmitHandler}
                >
                    <Input 
                    id="value"
                    element="input"
                    type="number"
                    label="Minimalna wartość zamówienia"
                    validators={[VALIDATOR_REQUIRE()]}
                    errorText="Wprowadź poprawną wartość."
                    onInput={inputHandler}
                    initialValue={value.value}
                    />
                    <Button type="submit"
                    // disabled={!formState.isValid}
                    >
                    ZMIEŃ WARTOŚĆ
                    </Button>
                </form>}
                </React.Fragment>
    )
}

export default AdminValue
