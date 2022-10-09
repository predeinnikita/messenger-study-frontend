import { observer } from 'mobx-react';
import { arrayExtensions } from 'mobx/dist/internal';
import { useNavigate } from 'react-router-dom';
import authStore from '../../stores/auth.store'
import loaderStore from '../../stores/loader.store';
import { ajax } from 'rxjs/ajax'

import './header.component.css';

export const Header = observer(() => {
  let navigate = useNavigate();
  
  const login = () => {
  };

  const logout = () => {
  }
  
  return (
    <header className='header'>
      {!authStore.name? 'Необходимо войти': authStore.name}
      {!authStore.auth 
        ? <button className='header__button' onClick={login}>Войти</button>
        : <button className='header__button' onClick={logout}>Выйти</button>
      }
    </header>
  )
});