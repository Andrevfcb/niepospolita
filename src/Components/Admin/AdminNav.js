import React from 'react'

const AdminNav = ({ changeSection }) => {
    return (
        
            <ul>
                <li id="0" onClick={changeSection}>Dodaj produkt</li>
                <li id={1} onClick={changeSection}>Zmień produkt</li>
                <li id={2} onClick={changeSection}>Usuń produkt</li>
                <li id={3} onClick={changeSection}>Kategorie</li>
                <li id={4} onClick={changeSection}>Min. wartość zamówienia</li>
                <li id={5} onClick={changeSection}>Dowóz</li>
                <li id={6} onClick={changeSection}>Min. wartości gratis</li>
            </ul>
        
    )
}

export default AdminNav
