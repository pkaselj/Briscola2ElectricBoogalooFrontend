import React, { useState } from 'react';
import './App.css';
import { ErrorNotification, SuccessNotification } from './modules/notification/notification-component';
import LoginComponent from './modules/login/login-component';
import ILoginRequestDTO from './dto/login-request-dto';
import _loginService from './services/api/login-service';
import _logger from './services/logger/logger-service';
import IErrorDTO from './dto/error-dto';

function App(): JSX.Element {
  const [notification, setNotification] = useState<any>(undefined);
  const clearNotification = () => {setNotification(undefined)}

  const onSubmitAction = async (x : ILoginRequestDTO) => {
    await _loginService.LogIn(x)
      .then( response => {
        _logger.Info(`Success :: ${response.token}`)
        setNotification(
          <SuccessNotification
            text={`Successful login. Token ${response.token}`}
            onCloseAction={clearNotification}
            />
          )
      })
      .catch((err : IErrorDTO) => {
        _logger.Error(`${err.errorCode} :: ${err.errorMessage}`)
        setNotification(
          <ErrorNotification
            text={`Error: ${err.errorMessage}`}
            onCloseAction={clearNotification}
            />
          )
      })
    }

    const onFocusTextInput = () => {
      clearNotification();
    }

  return (
    <LoginComponent
    onSubmit = {onSubmitAction}
    onFocusTextInput={onFocusTextInput}
    main_image_url='https://i.kym-cdn.com/entries/icons/original/000/032/031/man.jpg'
    avatar_image_url=''
    >
      {notification}
    </LoginComponent>
  );
}

export default App;
