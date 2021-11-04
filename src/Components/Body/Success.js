import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './Store.css';
import { useHttpClient } from '../hooks/http-hook';
import LoadingSpinner from "../UIElements/LoadingSpinner"
import ErrorModal from "../UIElements/ErrorModal"

const Success = () => {

    const [deliveryTime, setDeliveryTime] = useState(false); 
    const { isLoading, error, sendRequest, clearError } = useHttpClient();

    useEffect(() => {
        const fetchDeliveryTime = async () => {
            try {
              const responseData = await sendRequest(
                `${process.env.REACT_APP_BACKEND_URL}/api/deliverytime/${process.env.REACT_APP_DELIVERY_TIME_ID}`
              );
              setDeliveryTime(responseData.deliveryTime.time);
            
        } catch (err) {}
          
    };
    fetchDeliveryTime();
      }, [sendRequest])

    return (
        <React.Fragment>
        <ErrorModal error={error} onClear={clearError} />
        {isLoading && <LoadingSpinner asOverlay />}
        <div className="store">
            <h1 style={{marginTop: "1.5em"}}>ZAMÓWIENIE ZOSTAŁO PRZEKAZANE DO REALIZACJI</h1>
            <br />
            {deliveryTime && <h2>Oczekiwany czas dowozu: {deliveryTime} min</h2>}
            <Link to='/'><p>powrót do sklepu</p></Link>
        </div>
        </React.Fragment>
    )
}

export default Success
