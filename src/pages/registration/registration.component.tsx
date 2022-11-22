import { useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Button } from '../../shared/components/button/button.component'
import { Input } from '../../shared/components/input/input.component'
import loaderStore from '../../shared/stores/loader.store'

import './registration.component.css'
import UseRegistrationViewModel from './registration.viewmodel'

export const RegistrationForm = () => {
  useEffect(() => loaderStore.setState(false));

  const {
    username,
    setUsername,
    password, 
    setPassword,
    secondPassword, 
    setSecondPassword,
    registration,
  } = UseRegistrationViewModel(useNavigate())

  return (
    <div className="registration">
      <form className='registration__form' onSubmit={registration}>
        Регистрация
        <Input placeholder='Придумайте никнейм' 
               onChangeHandler={(e: any) => setUsername(e.target.value)} 
               value={username}
        />
        <Input placeholder='Придумайте пароль' 
               onChangeHandler={(e: any) => setPassword(e.target.value)} 
               value={password}
               type='password'
               minLength={8}
        />
        <Input placeholder='Повторите пароль' 
               onChangeHandler={(e: any) => setSecondPassword(e.target.value)}
               value={secondPassword}
               type='password'
               minLength={8}
        />
        <Button className='button__registration' placeholder='Зарегистрироваться'/>
        <span className='to-login'>Есть аккаунт? <Link to={{pathname: "/login"}}>Войдите!</Link></span>
      </form>
    </div>
  )
}