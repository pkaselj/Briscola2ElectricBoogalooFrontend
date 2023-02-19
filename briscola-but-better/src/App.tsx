import React, { useState } from 'react';
import './App.css';
import { ErrorNotification, SuccessNotification } from './modules/notification/notification-component';
import LoginComponent from './modules/login/login-component';
import ILoginRequestDTO from './dto/login-request-dto';
import _loginService from './services/api/login-service';
import _logger from './services/logger/logger-service';
import IErrorDTO from './dto/error-dto';
import _resourceManagerService from './services/resources/resource-manager-service';
import { Resource } from './services/resources/resource-list';

function App(): JSX.Element {
  const [notification, setNotification] = useState<any>(undefined);
  const [main_image, setMainImage] = useState<string | undefined>(undefined)
  React.useEffect(() => {
    const LoadResources = async () => {
      const _main_image = await _resourceManagerService.GetResourcePath(Resource.ANGRY_MAN_PLAYING_CARDS_IMG)
      setMainImage(_main_image)
    }

    LoadResources()
  }, [])

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
    main_image_url={main_image ?? ''}
    avatar_image_url=''
    >
      {notification}
    </LoginComponent>
  );
}

export default App;
