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

const AdminBonusItems = () => {
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
                `${process.env.REACT_APP_BACKEND_URL}/api/bonus-items/${process.env.REACT_APP_BONUS_ITEMS_PRICE_ID}`
              );
              setValue(responseData.bonus_items_price);
            
        } catch (err) {}
          
    };
    fetchValue();
      }, [sendRequest])
    

    const valueSubmitHandler = async event => {
        event.preventDefault();
          try {
            await sendRequest(
              `${process.env.REACT_APP_BACKEND_URL}/api/bonus-items/${process.env.REACT_APP_BONUS_ITEMS_PRICE_ID}`,
              'PATCH',
              JSON.stringify({
                value: parseInt(formState.inputs.value.value)
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
                <h2>Zmień minimalną wartość produktów gratis</h2>
                {value && <form
                onSubmit={valueSubmitHandler}
                >
                    <Input 
                    id="value"
                    element="input"
                    type="number"
                    label="Minimalna wartość produktów gratis (zł)"
                    validators={[VALIDATOR_REQUIRE()]}
                    errorText="Wprowadź poprawną wartość."
                    onInput={inputHandler}
                    initialValue={value.value}
                    /> 
                    <Button type="submit"
                    >
                    ZMIEŃ WARTOŚĆ
                    </Button> 
                </form>}
                </React.Fragment>
    )
}

export default AdminBonusItems
