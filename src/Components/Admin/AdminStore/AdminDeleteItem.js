import React, { useState, useEffect, useContext } from 'react';
import Button from "../../FormElements/Button"
import { AuthContext } from '../../../context/auth-context';

import { useHttpClient } from '../../hooks/http-hook';
import LoadingSpinner from "../../UIElements/LoadingSpinner"
import ErrorModal from "../../UIElements/ErrorModal"

const AdminDeleteItem = () => {

    const [items, setItems] = useState([]);
    const [itemId, setItemId] = useState(false);

    const { isLoading, error, sendRequest, clearError } = useHttpClient();

    const auth = useContext(AuthContext);
    
    useEffect(() => {
        const fetchItems = async () => {
            try {
              const responseData = await sendRequest(
                `${process.env.REACT_APP_BACKEND_URL}/api/items`
              );
      
              setItems(responseData.items);
        } catch (err) {}
          
    };
    fetchItems();
      }, [sendRequest])

    const deleteItemSubmitHandler = async event => {
        event.preventDefault();
            try {
              await sendRequest(
                `${process.env.REACT_APP_BACKEND_URL}/api/items/${itemId}`,
                'DELETE',
                null,
                {
                  Authorization: 'Bearer ' + auth.token
                }
              );
            alert("Usunięto produkt")
            
            window.location.reload()
            } catch (err) {}
        }

    const choseDeletedItemId = (e) => {
            setItemId(e.target.value)
              }


    const setOptions = items.map(i => <option value={i.id}>{i.name}</option>)

    return (
            <React.Fragment>
            <ErrorModal error={error} onClear={clearError} />
            {isLoading && <LoadingSpinner asOverlay />}
                <h2>Usuń</h2>
                {items.length > 0 ? <select name="items" id="items" onChange={choseDeletedItemId} >
                    <option value={''}>wybierz produkt</option>
                    {setOptions}
                </select> : <p>Brak produktów</p>}
                <Button 
                onClick={deleteItemSubmitHandler}
                disabled={!itemId}
                >USUŃ</Button>
            </React.Fragment>
    )
}

export default AdminDeleteItem
