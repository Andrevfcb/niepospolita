import React from 'react';
import { Link } from 'react-router-dom';
import './Store.css'

const Failed = () => {
    return (
        <div className="store">
            <h1>WYSTĄPIŁ NIEOCZEKIWANY BŁĄD, SPRÓBUJ ZAMÓWIĆ PONOWNIE PÓŹNIEJ</h1>
            <br />
            <Link to='/'><p>powrót do sklepu</p></Link>
        </div>
    )
}

export default Failed
