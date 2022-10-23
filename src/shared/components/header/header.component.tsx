import { observer } from 'mobx-react';
import { arrayExtensions } from 'mobx/dist/internal';
import { useNavigate } from 'react-router-dom';
import authStore from '../../stores/auth.store'
import loaderStore from '../../stores/loader.store';
import { ajax } from 'rxjs/ajax'

import './header.component.css';
import { Button } from '../button/button.component';
import { getPath } from '../../utils/get-path';

export const Header = observer(() => {
  let navigate = useNavigate();

  const logout = () => {
    navigate('/login')
  }
  
  return (
    <header className='header'>
      messenger-study-frontend
      { 
        getPath().includes('main')
        ? <Button className='header__button' onClick={logout} placeholder='Выйти' />
        : ''
      }
    </header>
  )
});