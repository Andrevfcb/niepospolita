import React, {useState} from 'react';
import './Header.css';
import Navigation from './Navigation';
import { useHttpClient } from '../hooks/http-hook';
import ErrorModal from "../UIElements/ErrorModal"
import SideDrawer from './SideDrawer';
import Backdrop from '../UIElements/Backdrop';

import Logo from '../../images/logo.png'


const Header = () => {
    const [drawerIsOpen, setDrawerIsOpen] = useState(false);
    const { error, clearError } = useHttpClient();

      const openDrawerHandler = () => {
        setDrawerIsOpen(true);
      };
    
      const closeDrawerHandler = () => {
        setDrawerIsOpen(false);
      };

    return (
        <React.Fragment>
            <ErrorModal error={error} onClear={clearError} />
            {drawerIsOpen && <Backdrop onClick={closeDrawerHandler} />}
            <SideDrawer show={drawerIsOpen} onClick={closeDrawerHandler}>
              <nav className="main-navigation__drawer-nav">
          <Navigation />
              </nav>

            </SideDrawer>
        <div className='header'>
        <a href= "https://niepospolita-lublin.com" className="logo-link" exact>
            <div className='logo title'>
              <img src={Logo} alt="logo" className="logo"></img>
              <span>Niepospolita Restauracja</span>
            </div>
                </a>
              <button
                className="main-navigation__menu-btn"
                onClick={openDrawerHandler}
                >
                <span />
                <span />
                <span />
              </button>
            <div className='navigation'><Navigation/></div>
        </div>
        </React.Fragment>
    )
}

export default Header
