import React, { useState, useEffect } from 'react';
import { useHttpClient } from '../../hooks/http-hook';
import LoadingSpinner from "../../UIElements/LoadingSpinner"
import Button from "../../FormElements/Button"
import ErrorModal from "../../UIElements/ErrorModal"

const AdminItems = () => {

    const { isLoading, error, sendRequest, clearError } = useHttpClient();
    const [items, setItems] = useState([]);
    const [allItems, setAllItems] = useState([]);

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
  fetchItems();
    }, [sendRequest])

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
      
      return (
        <li>
          <img src={`${process.env.REACT_APP_AWS_URL}/${i.image}`} alt={i.name}></img>
          <div className="admin-items__list-info">
          <span>{i.name}</span>
          <span>Cena: {i.price}zł</span>
          <span>Kategoria: {i.category}</span>
          <span>Dostępność: {i.available ? <span style={{color: 'lightgreen'}}>DOSTĘNE</span> : <span style={{color: 'red'}}>NIEDOSTĘPNE</span>}</span>
          </div>
        </li>
      )
    })
    return (
        <React.Fragment>
            <ErrorModal error={error} onClear={clearError} />
            {isLoading && <LoadingSpinner asOverlay />}
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
