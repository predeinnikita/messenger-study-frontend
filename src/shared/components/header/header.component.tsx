import { observer } from 'mobx-react';
import { useNavigate } from 'react-router-dom';
import authStore from '../../stores/auth.store'
import loaderStore from '../../stores/loader.store';

import './header.component.css';

export const Header = observer(() => {
  let navigate = useNavigate();
  
  const login = () => {
    loaderStore.setState(true);
    VK.Auth.login((r) => {
      if (r.session) {
        authStore.changeAuth(true);
        authStore.changeName(r.session.user.first_name);
        loaderStore.setState(false);
        navigate('/main');
      }
    }, 4);
  };

  const logout = () => {
    loaderStore.setState(true);
    VK.Auth.logout((r) => {
      authStore.changeAuth(false);
      authStore.changeName('');
      loaderStore.setState(false);
      navigate('/login');
    });
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