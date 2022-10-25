import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import loaderStore from '../../shared/stores/loader.store';
import { Button, ButtonEvent } from '../../shared/components/button/button.component';
import { Input } from '../../shared/components/input/input.component';
import './login.component.css'
import authStore from '../../shared/stores/auth.store';
import { catchError, of, pipe } from 'rxjs';
import md5 from 'md5'

export const LoginForm = () => {
  useEffect(() => {
    setTimeout(() => {
      loaderStore.setState(false);
    }, 1000);
  }, [])

  const [username, setUsername] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const navigate = useNavigate();

  const login = (e: ButtonEvent) => {
    e.preventDefault();
    loaderStore.setState(true);
    const passwordHash = md5(password);
    
    authStore.login({ username, password: passwordHash }).pipe(
      catchError(() => of(false))
    ).subscribe(res => {
      if (res) {
        navigate('/main');
      } else {
        alert('Неверный логин или пароль')
        loaderStore.setState(false);
      }
    });
  }

  const formValid = password && password.length > 7 && username;

  return (
    <div className="login">
      <form className='login__form'>
        <Input type='login' 
               placeholder='Логин' 
               value={username} 
               onChangeHandler={(event: any) => setUsername(event.target.value)} 
        />
        <Input type='password' 
               placeholder='Пароль' 
               value={password} 
               onChangeHandler={(event: any) => setPassword(event.target.value)} />
        <Button placeholder='Войти' 
                onClickHandler={login}
                disabled={!formValid} 
        />
        <span className='to-registration'>Нет аккаунта? <a href='/registration'>Зарегистрируйтесь!</a></span>
      </form>
    </div>
  )
}