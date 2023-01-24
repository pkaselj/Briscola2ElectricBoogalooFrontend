import React, { useState } from 'react';
import logo from './logo.svg';
import './App.css';
import SettingsService from './services/settings/settings-service';
import { ErrorNotification, InfoNotification, SuccessNotification, WarnNotification } from './modules/notification/notification-component';
import LoginComponent from './modules/login/login-component';
import ILoginRequestDTO from './dto/login-request-dto';
import _loginService from './services/api/login-service';
import _notificationService from './services/notification/notification-service';
import _logger from './services/logger/logger-service';
import IErrorDTO from './dto/error-dto';
import { Login } from '@mui/icons-material';

function App(): JSX.Element {
  const [notification, setNotification] = useState<any>(undefined);
  const clearNotification = () => {setNotification(undefined)}

  return (
    <div>
      <LoginComponent onSubmit = {
        async (x : ILoginRequestDTO) => {
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
                  text={`Error code [${err.errorCode}] :: ${err.errorMessage}.`}
                  onCloseAction={clearNotification}
                  />
                )
            })
        }
      }>
        {notification}
      </LoginComponent>
    </div>
  );
}

export default App;
