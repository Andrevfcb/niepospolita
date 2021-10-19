import React, { useState, useEffect } from 'react';

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


const AdminUpdateItem = () => {

    const [categories, setCategories] = useState([]);
    const [items, setItems] = useState([]);
    const [item, setItem] = useState(false);
    const [itemAvailability, setItemAvailability] = useState(); 

    const { isLoading, error, sendRequest, clearError } = useHttpClient();

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
            available: {
                value: '',
                isValid: false
    },
        //   image: {
        //     value: null,
        //     isValid: false
        //   }
        },
        false
      );

      const [itemFormState, selectHandler] = useForm(
        {
            name: {
              value: '',
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
    const fetchItems = async () => {
        try {
          const responseData = await sendRequest(
            `${process.env.REACT_APP_BACKEND_URL}/api/items`
          );
  
          setItems(responseData.items);
    } catch (err) {}
      
};
    fetchCategories();
    fetchItems();
      }, [sendRequest])

      useEffect(() => {
        
            const fetchItem = async () => {
                if(itemFormState.inputs.name.value) {
                try {
                  const responseData = await sendRequest(
                    `${process.env.REACT_APP_BACKEND_URL}/api/items/${itemFormState.inputs.name.value}`
                  );
          
                  setItem(responseData.item);
                  setItemAvailability(responseData.item.available)
            } catch (err) {}      
            } else return
        }
    fetchItem();
      }, [sendRequest, itemFormState.inputs.name.value])
    

    const itemSubmitHandler = async event => {
        event.preventDefault();
          try {
            // const formData = new FormData();
            // formData.append('name', formState.inputs.name.value);
            // formData.append('description', formState.inputs.description.value);
            // formData.append('price', formState.inputs.price.value);
            // formData.append('category', formState.inputs.category.value);
            // formData.append('available', itemAvailability);
            // formData.append('image', formState.inputs.image.value);
            await sendRequest(
              `${process.env.REACT_APP_BACKEND_URL}/api/items/${item.id}`,
              'PATCH',
              JSON.stringify({
                name: formState.inputs.name.value,
                description: formState.inputs.description.value,
                price: formState.inputs.price.value,
                category: formState.inputs.category.value,
                available: itemAvailability,
              }),
              {
                'Content-Type': 'application/json'
                //  + auth.token
                // 'Content-Type': 'application/json'
              }
            //   formData
            //   ,
            //   {
            //     Authorization: 'Bearer '
            //     //  + auth.token
            //     // 'Content-Type': 'application/json'
            //   }
            );
                alert("Zaktualizowano produkt")
                window.location.reload()
          } catch (err) {}
      };

    const setOptions = categories.map(i => <option value={i.id}>{i.name}</option>)
    const setItemOptions = items.map(i => <option value={i.id}>{i.name}</option>)

    const changeAvailability = () => {
        setItemAvailability(prevAvailibility => !prevAvailibility)
    }
    

    return (
        <React.Fragment>
            <ErrorModal error={error} onClear={clearError} />
            {isLoading && <LoadingSpinner asOverlay />}
                <h2>Zaktualizuj danie / produkt</h2>
                <Input 
                    id="name"
                    element="select"
                    name="select"
                    label="Wybierz Produkt"
                    validators={[VALIDATOR_REQUIRE()]}
                    errorText="Wybierz poprawny produkt."
                    onInput={selectHandler}
                    options={setItemOptions}
                    />
                {item && <form
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
                    {/* <ImageUpload
                    center
                    id="image"
                    onInput={inputHandler}
                    errorText="Wprowadź zdjęcie produktu."
                    /> */}
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
                    <label for='availability' style={{fontWeight: 'bold', marginBottom: '0.5rem'}}>Produkt dostępny</label>
                    <input id='availability' type='checkbox' onChange={changeAvailability} checked={itemAvailability} style={{display: 'block', margin: 'auto'}} />
                    <Button type="submit"
                    // disabled={!formState.isValid}
                    >
                    ZMIEŃ
                    </Button>
                </form>}
                </React.Fragment>
    )
}

export default AdminUpdateItem
