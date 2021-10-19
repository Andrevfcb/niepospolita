import React, { useState, useEffect } from 'react';
import Button from "../../FormElements/Button"
import Input from '../../FormElements/Input';

import {
    VALIDATOR_REQUIRE
  } from '../../util/validators';

import { useHttpClient } from '../../hooks/http-hook';
import LoadingSpinner from "../../UIElements/LoadingSpinner"
import ErrorModal from "../../UIElements/ErrorModal"
import { useForm } from "../../hooks/form-hook"


const AdminCategory = () => {

    const [categories, setCategories] = useState([]);
    const [catId, setCatId] = useState(false);

    const { isLoading, error, sendRequest, clearError } = useHttpClient();

    const [formState, inputHandler] = useForm(
        {
          name: {
            value: '',
            isValid: false
        }
        },
        false
      );

      const catSubmitHandler = async event => {
        event.preventDefault();
          try {
            await sendRequest(
              `${process.env.REACT_APP_BACKEND_URL}/api/category/`,
              'POST',
              JSON.stringify({
                name: formState.inputs.name.value
              }),
              {
                'Content-Type': 'application/json'
                //  + auth.token
                // 'Content-Type': 'application/json'
              }
            );
                alert("Utworzono kategorię")
                window.location.reload()
          } catch (err) {}
      };

    useEffect(() => {
        const fetchCategories = async () => {
            try {
              const responseData = await sendRequest(
                `${process.env.REACT_APP_BACKEND_URL}/api/category`
              );
      
              setCategories(responseData.category);
        } catch (err) {}
          
    };
    fetchCategories();
      }, [sendRequest])

    const deleteCategorySubmitHandler = async event => {
        event.preventDefault();
            try {
              await sendRequest(
                `${process.env.REACT_APP_BACKEND_URL}/api/category/${catId}`,
                'DELETE',
                null,
                // {
                //   Authorization: 'Bearer ' + auth.token
                // }
              );
            alert("Usunięto Kategorię")
            
            window.location.reload()
            } catch (err) {}
        }

    const choseDeletedCatId = (e) => {
        console.log(e.target.value);
        
        setCatId(e.target.value)
              }

    const setOptions = categories.map(i => <option value={i._id}>{i.name}</option>)

    return (
            <React.Fragment>
            <ErrorModal error={error} onClear={clearError} />
            {isLoading && <LoadingSpinner asOverlay />}
                <h2>Dodaj kategorię</h2>
                <form
                onSubmit={catSubmitHandler}
                >
                <Input 
                    id="name"
                    element="input"
                    type="text"
                    label="Nazwa kategorii"
                    validators={[VALIDATOR_REQUIRE()]}
                    errorText="Wprowadź poprawną nazwę."
                    onInput={inputHandler}
                    />
                    <Button type="submit"
                    disabled={!formState.isValid}>
                    DODAJ
                    </Button>
                    </form>
                <h2>Usuń kategorię</h2>
                {categories.length > 0 ? <select name="items" id="items" onChange={choseDeletedCatId} >
                    <option value={''}>wybierz kategorię</option>
                    {setOptions}
                </select> : <p>Brak Kategorii</p>}
                <Button 
                onClick={deleteCategorySubmitHandler}
                disabled={!catId}
                >USUŃ</Button>
            </React.Fragment>
    )
}

export default AdminCategory
