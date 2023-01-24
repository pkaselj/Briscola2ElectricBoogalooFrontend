import React from 'react';
import logo from './logo.svg';
import './App.css';
import SettingsService from './services/settings/settings-service';
import { ErrorNotification, InfoNotification, SuccessNotification, WarnNotification } from './modules/notification/notification-component';
import LoginComponent from './modules/login/login-component';
import ILoginRequestDTO from './dto/login-request-dto';
import _loginService from './services/api/login-service';
import _notificationService from './services/notification/notification-service';
import _logger from './services/logger/logger-service';

function App() {
  return (
    <div>
      <LoginComponent onSubmit = {
        async (x : ILoginRequestDTO) => {
          await _loginService.LogIn(x)
            .then( response => {
              if(!response) { _logger.Info('Success') }
              else { _logger.Error(JSON.stringify(response)) }
            })
            .catch(err => {
              _logger.Error(err.message)
            })
        }
      }/>
    </div>
  );
}

export default App;
