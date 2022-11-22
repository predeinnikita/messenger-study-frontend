import { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import loaderStore from '../../shared/stores/loader.store';
import { Button, ButtonEvent } from '../../shared/components/button/button.component';
import { Input } from '../../shared/components/input/input.component';
import './login.component.css'
import authStore from '../../shared/stores/auth.store';
import { catchError, of } from 'rxjs';
import md5 from 'md5'
import UseLoginViewModel from './login.viewmodel';

export const LoginForm = () => {
  useEffect(() => loaderStore.setState(false));

  const {
    username,
    setUsername,
    password,
    setPassword,
    formValid,
    login
  } = UseLoginViewModel(useNavigate());

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
        <Button className='button__login' 
                placeholder='Войти' 
                onClickHandler={login}
                disabled={!formValid} 
        />
        <span className='to-registration'>Нет аккаунта? <Link to={{pathname: "/registration"}}>Зарегистрироваться!</Link></span>
      </form>
    </div>
  )
}