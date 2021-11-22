import React, { useState, useEffect, useContext } from 'react';
import { useHttpClient } from '../../hooks/http-hook';
import LoadingSpinner from "../../UIElements/LoadingSpinner"
import Button from "../../FormElements/Button"
import Input from '../../FormElements/Input';
import ErrorModal from "../../UIElements/ErrorModal"
import Modal from '../../UIElements/Modal';
import { useForm } from "../../hooks/form-hook"
import {
  VALIDATOR_REQUIRE
} from '../../util/validators';
import { AuthContext } from '../../../context/auth-context';

const AdminItems = () => {

    const { isLoading, error, sendRequest, clearError } = useHttpClient();
    const [items, setItems] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [item, setItem] = useState({
      id: 0,
      name: '',
      category: '',
      description: '',
      special: false,
      bonus: false,
      available: true,
      image: '',
      price: 0
    });
    const [allItems, setAllItems] = useState([]);
    const [categories, setCategories] = useState([]);
    const [itemAvailability, setItemAvailability] = useState();
    const [itemBonus, setItemBonus] = useState();
    const [itemSpecial, setItemSpecial] = useState();
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
      }
      },
      false
    );

    useEffect(() => {
      const fetchItems = async () => {
          try {
            const responseData = await sendRequest(
              `${process.env.REACT_APP_BACKEND_URL}/api/items`
            );
    
            setItems(responseData.items);
            setAllItems(responseData.items);
      } catch (err) {}
  };
  const fetchCategories = async () => {
    try {
      const responseData = await sendRequest(
        `${process.env.REACT_APP_BACKEND_URL}/api/category`
      );

      setCategories(responseData.category);
  } catch (err) {}
  }
  fetchItems();
  fetchCategories();
    }, [sendRequest])

    const closeModalHandler = () => {
      const item = {
        id: 0,
        name: '',
        category: '',
        description: '',
        special: false,
        bonus: false,
        available: true,
        image: '',
        price: 0
      }
      setItem(item)
      setShowModal(false)
    }
  
    const openModalHandler = () => {
      setShowModal(true)
    }

    const changeAvailability = () => {
      setItemAvailability(prevAvailibility => !prevAvailibility)
  }

  const changeBonus = () => {
    setItemBonus(prevBonus => !prevBonus)
}

const changeSpecial = () => {
  setItemSpecial(prevSpecial => !prevSpecial)
}

const itemSubmitHandler = async event => {
  event.preventDefault();
    try {
      await sendRequest(
        `${process.env.REACT_APP_BACKEND_URL}/api/items/${item.id}`,
        'PATCH',
        JSON.stringify({
          name: formState.inputs.name.value,
          description: formState.inputs.description.value,
          price: formState.inputs.price.value,
          category: formState.inputs.category.value,
          available: itemAvailability,
          bonus: itemBonus,
          special: itemSpecial
        }),
        {
          Authorization: 'Bearer ' + auth.token,
          'Content-Type': 'application/json'
        }
      );
          alert("Zaktualizowano produkt")
          window.location.reload()
    } catch (err) {}
};

const setOptions = categories.map(i => <option value={i.id}>{i.name}</option>)

  const filteredItems = (e) => {
    e.preventDefault()
    let newItems
    if (allItems && e.target.id === 'available')
      newItems = allItems.filter(i => i.available)
    else if (allItems && e.target.id === 'not-available')
      newItems = allItems.filter(i => !i.available)
    else newItems = allItems
    return setItems(newItems)
  }

  const itemsList = items.map(i => {
      
      const buttonHandler = (e) => {
        setItemAvailability(i.available)
        setItemBonus(i.bonus)
        setItemSpecial(i.special)
        openModalHandler()
        e.preventDefault()
        const chosenItem = {
        id: i.id,
        name: i.name,
        category: i.category,
        description: i.description,
        special: i.special,
        bonus: i.bonus,
        available: i.available,
        image: i.image,
        price: i.price
        }
        console.log(chosenItem);
        setItem(chosenItem)
    }
      return (
        <li>
          <img src={`${process.env.REACT_APP_AWS_URL}/${i.image}`} alt={i.name}></img>
          <div className="admin-items__list-info">
          <span>{i.name}</span>
          <span>Cena: {i.price}zł</span>
          <span>Kategoria: {i.category}</span>
          <span>Dostępność: {i.available ? <span style={{color: 'lightgreen'}}>DOSTĘNE</span> : <span style={{color: 'red'}}>NIEDOSTĘPNE</span>}</span>
          <Button 
          onClick={buttonHandler}
          danger={true}
          >ZMIEŃ</Button>
          </div>
        </li>
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
              className="new-item"
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
                    <label for='availability' style={{fontWeight: 'bold', marginBottom: '0.3em', display: 'block'}}>Produkt dostępny?</label>
                    <input id='availability' type='checkbox' onChange={changeAvailability} checked={itemAvailability} style={{display: 'block', margin: 'auto', marginBottom: '0.5em'}} />
                    <label for='bonus' style={{fontWeight: 'bold', marginBottom: '0.3em', display: 'block'}}>Produkt gratis?</label>
                    <input id='bonus' type='checkbox' onChange={changeBonus} checked={itemBonus} style={{display: 'block', margin: 'auto', marginBottom: '0.5em'}} />
                    <label for='special' style={{fontWeight: 'bold', marginBottom: '0.3em', display: 'block'}}>Menu degustacyjne?</label>
                    <input id='special' type='checkbox' onChange={changeSpecial} checked={itemSpecial} style={{display: 'block', margin: 'auto', marginBottom: '0.5em'}} />
                    <Button 
                    type="submit"
                    onClick={itemSubmitHandler}
                    >
                    ZMIEŃ
                    </Button>
              </form>
            </React.Fragment>
            </Modal>
                <h2>Wszystkie produkty</h2>
                <div className='admin-items'>
                  <div className='admin-items__buttons'>
                    <Button
                    id='all'
                    onClick={filteredItems}
                    >
                    Wszystkie
                    </Button>
                    <Button
                    id='available'
                    onClick={filteredItems}>
                    Aktywne
                    </Button>
                    <Button
                    id='not-available'
                    onClick={filteredItems}>
                    Nieaktywne
                    </Button>
                  </div>
                  <ul className='admin-items__list'>
                    {items.length > 0 && itemsList}
                  </ul>
                </div>
                </React.Fragment>
    )
}

export default AdminItems
