import React, { Suspense } from 'react';
import AdminHeader from "./Components/Admin/AdminHeader";
import Admin from "./Components/Admin/AdminPanel";

import {
  HashRouter as Router,
  Route,
  Redirect,
  Switch
} from 'react-router-dom';
import Header from './Components/Header/Header';
import Footer from './Components/Footer/Footer';
import Store from './Components/Body/Store';
import CartContextProvider from './context/cart-context';
import Cart from './Components/Body/Cart';
import Order from './Components/Body/Order';

import background from './images/50.jpg'

import { useAuth } from './Components/hooks/auth-hook';
import { AuthContext } from './context/auth-context';
import Success from './Components/Body/Success';
import Failed from './Components/Body/Failed';
import SpecialReservation from './Components/Body/SpecialReservation';

function App() {

  const { token, login, logout, userId, role } = useAuth();

  const routes = (
    <Switch>
      <Route path="/" exact>
      <Header />
      <Store />
      </Route>
      <Route path="/koszyk">
      <Header />
      <Cart />
      </Route>
      <Route path="/special">
      <Header />
      <SpecialReservation />
      </Route>
      <Route path="/zamowienie">
      <Header />
      <Order />
      </Route>
      <Route path="/success">
      <Header />
      <Success />
      </Route>
      <Route path="/failed">
      <Header />
      <Failed />
      </Route>
      <Route path="/admin">
      <AdminHeader />
        <Admin />
      </Route>
      <Redirect to="/" />
    </Switch>
  );


  return (
    <Router>
      <AuthContext.Provider
      value={{
        isLoggedIn: !!token,
        token: token,
        userId: userId,
        role: role,
        login: login,
        logout: logout
      }}
    >
      <CartContextProvider>
      <div className="App" style={{backgroundImage: `url(${background})`, backgroundColor: "black", minHeight: "100vh", display: "flex", flexDirection: "column"}}>
        {routes}
      <Footer />
      </div>
      </CartContextProvider>
      </AuthContext.Provider>
    </Router>
    
  );
}

export default App;
