import React from 'react'

const AdminNav = ({ changeSection }) => {
    return (
        
            <ul>
                <li id="0" onClick={changeSection}>Dodaj</li>
                <li id={1} onClick={changeSection}>Zmień</li>
                <li id={2} onClick={changeSection}>Usuń</li>
                <li id={3} onClick={changeSection}>Kategorie</li>
                <li id={4} onClick={changeSection}>Godziny</li>
                <li id={5} onClick={changeSection}>Min. wartość</li>
            </ul>
        
    )
}

export default AdminNav
