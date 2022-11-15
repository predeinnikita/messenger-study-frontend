import md5 from 'md5'
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Button, ButtonEvent } from '../../shared/components/button/button.component'
import { Input } from '../../shared/components/input/input.component'
import authStore from '../../shared/stores/auth.store'
import loaderStore from '../../shared/stores/loader.store'

import './registration.component.css'

export const RegistrationForm = () => {
  useEffect(() => {
    loaderStore.setState(false)
  }, [])

  const [username, setUsername] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [secondPassword, setSecondPassword] = useState<string>('');
  const navigate = useNavigate();

  const registration = (e: ButtonEvent) => {
    e.preventDefault();
    const hashedPassword = md5(password);
    authStore.registration({
      username,
      password: hashedPassword
    }).subscribe(
      () => navigate('/login'),
      (e) => alert(e.response.message)
    );
  }

  const formValid = password && password.length > 7 && password === secondPassword && username;

  return (
    <div className="registration">
      <form className='registration__form'>
        Регистрация
        <Input placeholder='Придумайте никнейм' 
               onChangeHandler={(e: any) => setUsername(e.target.value)} 
               value={username}
        />
        <Input placeholder='Придумайте пароль' 
               onChangeHandler={(e: any) => setPassword(e.target.value)} 
               value={password}
               type='password'
        />
        <Input placeholder='Повторите пароль' 
               onChangeHandler={(e: any) => setSecondPassword(e.target.value)}
               value={secondPassword}
               type='password'
        />
        <Button className='button__registration' placeholder='Зарегистрироваться' disabled={!formValid} onClickHandler={registration}/>
        <span className='to-login'>Есть аккаунт? <a href='/login'>Войдите!</a></span>
      </form>
    </div>
  )
}