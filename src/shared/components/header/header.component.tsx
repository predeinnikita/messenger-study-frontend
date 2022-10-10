import { observer } from 'mobx-react';
import { arrayExtensions } from 'mobx/dist/internal';
import { useNavigate } from 'react-router-dom';
import authStore from '../../stores/auth.store'
import loaderStore from '../../stores/loader.store';
import { ajax } from 'rxjs/ajax'

import './header.component.css';
import { Button } from '../button/button.component';

export const Header = observer(() => {
  let navigate = useNavigate();
  
  const login = () => {
  };

  const logout = () => {
  }
  
  return (
    <header className='header'>
      messenger-study-frontend
      {!authStore.auth 
        ? <Button className='header__button' onClick={login} placeholder='Войти' />
        : <Button className='header__button' onClick={logout} placeholder='Выйти' />
      }
    </header>
  )
});