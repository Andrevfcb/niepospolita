import React, { Suspense } from 'react';
import AdminHeader from "./Components/Admin/AdminHeader";
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
import { useAuth } from './Components/hooks/auth-hook';
import { AuthContext } from './context/auth-context';
import LoadingSpinner from './Components/UIElements/LoadingSpinner';

const Cart = React.lazy(() => import('./Components/Body/Cart'));
const Order = React.lazy(() => import('./Components/Body/Order'));
const SpecialReservation = React.lazy(() => import('./Components/Body/SpecialReservation'));
const Success = React.lazy(() => import('./Components/Body/Success'));
const SuccessReservation = React.lazy(() => import('./Components/Body/SuccessReservation'));
const Failed = React.lazy(() => import('./Components/Body/Failed'));
const Admin = React.lazy(() => import('./Components/Admin/AdminPanel'));

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
      <Route path="/success-reservation">
      <Header />
      <SuccessReservation />
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
      <div className="App" 
      style={{backgroundColor: "black", minHeight: "100vh", display: "flex", flexDirection: "column"}}>
        <Suspense fallback={<div className="center"><LoadingSpinner /></div>}>
          {routes}
          </Suspense>
      <Footer />
      </div>
      </CartContextProvider>
      </AuthContext.Provider>
    </Router>
    
  );
}

export default App;
