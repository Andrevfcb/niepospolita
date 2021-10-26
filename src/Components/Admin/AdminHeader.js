import React, { useContext } from 'react';
import Button from "../FormElements/Button"
import Input from '../FormElements/Input';

import { useHttpClient } from '../hooks/http-hook';
import LoadingSpinner from "../UIElements/LoadingSpinner"
import ErrorModal from "../UIElements/ErrorModal"
import { useForm } from "../hooks/form-hook"
import "./AdminHeader.css";
import { Link } from 'react-router-dom';
import { AuthContext } from '../../context/auth-context';

const AdminHeader = () => {

    const { isLoading, error, sendRequest, clearError } = useHttpClient();
    const auth = useContext(AuthContext);

    const [formState, inputHandler] = useForm(
        {
        email: {
            value: '',
            isValid: false
        },
        password: {
            value: '',
            isValid: false
        }
        },
        false
      );

    const authSubmitHandler = async event => {
        event.preventDefault();
          try {
            const responseData = await sendRequest(
              `${process.env.REACT_APP_BACKEND_URL}/api/user/login`,
              'POST',
              JSON.stringify({
                email: formState.inputs.email.value,
                password: formState.inputs.password.value
              }),
              {
                'Content-Type': 'application/json'
                //  + auth.token
              }
            );
            auth.login(responseData.userId, responseData.token, responseData.role);
                alert("zalogowano")
                window.location.reload()
          } catch (err) {}
      };


    return (
        <React.Fragment>
            <ErrorModal error={error} onClear={clearError} />
            {isLoading && <LoadingSpinner asOverlay />}
        <div className="admin-header">
            <Link to="/">Wróć na stronę główną</Link>
            {!auth.isLoggedIn && <form onSubmit={authSubmitHandler}>
                <Input 
                    id="email"
                    element="input"
                    type="email"
                    label="login:"
                    // validators={[VALIDATOR_REQUIRE()]}
                    // errorText="Wprowadź login."
                    onInput={inputHandler}
                />
                <Input 
                    id="password"
                    element="input"
                    type="text"
                    label="hasło:"
                    // validators={[VALIDATOR_REQUIRE()]}
                    // errorText="wprowadź hasło."
                    onInput={inputHandler}
                />
                <Button type="submit"
                    disabled={!formState.isValid}>
                    ZALOGUJ
                </Button>
            </form>}
            {auth.isLoggedIn && <Button
            onClick={() => auth.logout()}
            >
                    Wyloguj
                </Button>}
        </div>
        </React.Fragment>
    )
}

export default AdminHeader
