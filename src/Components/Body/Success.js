import React from 'react';
import { Link } from 'react-router-dom';
import './Store.css'

const Success = () => {
    return (
        <div className="store">
            <h1 style={{marginTop: "1.5em"}}>ZAMÓWIENIE ZOSTAŁO PRZEKAZANE DO REALIZACJI</h1>
            <br />
            <Link to='/'><p>powrót do sklepu</p></Link>
        </div>
    )
}

export default Success
