import React, { Suspense } from 'react';
import AdminHeader from "./Components/Admin/AdminHeader";
import Admin from "./Components/Admin/AdminPanel";

import {
  BrowserRouter as Router,
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

function App() {

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
      <Route path="/zamowienie">
      <Header />
      <Order />
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
      <CartContextProvider>
      <div className="App">
        {routes}
      <Footer />
      </div>
      </CartContextProvider>
    </Router>
    
  );
}

export default App;
