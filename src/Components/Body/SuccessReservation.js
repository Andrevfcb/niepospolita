import React from 'react';
import { Link } from 'react-router-dom';
import './Store.css';
import { useHttpClient } from '../hooks/http-hook';
import LoadingSpinner from "../UIElements/LoadingSpinner"
import ErrorModal from "../UIElements/ErrorModal"

const Success = () => {

    const { isLoading, error, sendRequest, clearError } = useHttpClient();

    return (
        <React.Fragment>
        <ErrorModal error={error} onClear={clearError} />
        {isLoading && <LoadingSpinner asOverlay />}
        <div className="store">
            <h1 style={{marginTop: "1.5em"}}>REZERWACJA ZOSTAŁA DOKONANA</h1>
            <h4 style={{marginTop: "1.5em"}}>Dane dotyczące rezerwacji zostały wysłane na adres email.</h4>
            <br />
            <Link to='/'><p>powrót do sklepu</p></Link>
        </div>
        </React.Fragment>
    )
}

export default Success
