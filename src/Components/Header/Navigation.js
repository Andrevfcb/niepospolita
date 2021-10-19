import React from 'react';
import { NavLink } from 'react-router-dom';

const Navigation = () => {

    return (
        
    <ul className='nav'>
        <li className="main-navigation">
            <NavLink to='/'exact>
            Zamów
            </NavLink>
        </li>
        <li className="main-navigation">
            <NavLink to='/koszyk'exact>
            <span class="fas fa-shopping-cart"></span>
            </NavLink>
        </li>
    </ul>
    )
}

export default Navigation
