import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import loaderStore from '../../stores/loader.store';
import { Button } from '../button/button.component';
import { Input } from '../input/input.component';
import './login.component.css'

export const LoginForm = () => {
    useEffect(() => {
      setTimeout(() => {
        loaderStore.setState(false);
      }, 2000);
    }, [])

    const navigate = useNavigate();
    const goToMain = () => {
      loaderStore.setState(true);
      navigate('/main');
    }

    return (
      <div className="login">
        <form className='login__form'>
          <Input type='login' placeholder='Логин' />
          <Input type='password' placeholder='Пароль' />
          <Button placeholder='Войти' onClick={goToMain}/>
        </form>
      </div>
    )
  }