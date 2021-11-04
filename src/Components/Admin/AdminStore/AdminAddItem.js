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


const AdminAddItem = () => {

    const [categories, setCategories] = useState([]);

    const { isLoading, error, sendRequest, clearError } = useHttpClient();
    const auth = useContext(AuthContext);

    const [formState, inputHandler] = useForm(
        {
          name: {
            value: '',
            isValid: false
        },
            description: {
                value: '',
                isValid: false
        },
            price: {
                value: '',
                isValid: false
        },
            category: {
                value: '',
                isValid: false
        },
          image: {
            value: null,
            isValid: false
          }
        },
        false
      );

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
    

    const itemSubmitHandler = async event => {
        event.preventDefault();
          try {
            const formData = new FormData();
            formData.append('name', formState.inputs.name.value);
            formData.append('description', formState.inputs.description.value);
            formData.append('price', formState.inputs.price.value);
            formData.append('category', formState.inputs.category.value);
            formData.append('image', formState.inputs.image.value);
            await sendRequest(
              `${process.env.REACT_APP_BACKEND_URL}/api/items/`,
              'POST',
              formData
              ,
              {
                Authorization: 'Bearer ' + auth.token
              }
            );
                alert("Utworzono produkt")
                window.location.reload()
          } catch (err) {}
      };

    const setOptions = categories.map(i => <option value={i.id}>{i.name}</option>)
    

    return (
        <React.Fragment>
            <ErrorModal error={error} onClear={clearError} />
            {isLoading && <LoadingSpinner asOverlay />}
                <h2>Dodaj danie / produkt</h2>
                <form
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
                    />
                    <ImageUpload
                    center
                    id="image"
                    onInput={inputHandler}
                    errorText="Wprowadź zdjęcie produktu."
                    />
                    <Input 
                    id="description"
                    element="textarea"
                    type="text"
                    label="Opis produktu"
                    validators={[VALIDATOR_REQUIRE()]}
                    errorText="Wprowadź poprawny opis."
                    onInput={inputHandler}
                    />
                    <Input 
                    id="price"
                    element="input"
                    type="number"
                    label="Cena"
                    validators={[VALIDATOR_REQUIRE()]}
                    errorText="Wprowadź poprawną cenę."
                    onInput={inputHandler}
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
                    />}
                    <Button type="submit"
                    disabled={!formState.isValid}>
                    DODAJ
                    </Button>
                </form>
                </React.Fragment>
    )
}

export default AdminAddItem
