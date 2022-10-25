import { observer } from 'mobx-react';
import { useNavigate } from 'react-router-dom';
import './header.component.css';
import { Button, ButtonEvent } from '../button/button.component';
import { getPath } from '../../utils/get-path';
import authStore from '../../stores/auth.store';

export const Header = observer(() => {
  let navigate = useNavigate();

  const logout = (e: ButtonEvent) => {
    authStore.logout().subscribe(() => navigate('/login'));
  }
  
  return (
    <header className='header'>
      messenger-study-frontend
      { 
        getPath().includes('main')
        ? <Button className='header__button' onClickHandler={logout} placeholder='Выйти' />
        : ''
      }
    </header>
  )
});