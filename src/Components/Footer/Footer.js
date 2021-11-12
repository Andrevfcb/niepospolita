import React from 'react';
import "./Footer.css";
import { NavLink } from 'react-router-dom';


import Logo from '../../images/logo.png'


const Footer = () => {

    return (
        <div className="footer">
            <a href= "https://niepospolita-lublin.com" className="logo-link" exact>
            <div className="footer-logo logo title">
              <img src={Logo} alt="logo" className="logo"></img>
              <span className="footer-title">Powrót na stronę główną</span>
            </div>
            </a>
            <div className="footer-menu">
                {/* <h3>MENU</h3> */}
                <ul className='nav'>
                    <li className="main-navigation">
                    <NavLink to='/'exact>
                    Zamów
                    </NavLink>
                    </li>
                    <li className="main-navigation">
                    <NavLink to='/koszyk'exact>
                    Koszyk
                    </NavLink>
                    </li>
                    <li className="main-navigation">
                    <a href='https://niepospolita-lublin.com/regulamin/'exact>
                    Regulamin
                    </a>
                    </li>
                </ul>
            </div>
        </div>
    )
}

export default Footer
