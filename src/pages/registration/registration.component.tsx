import { useEffect } from 'react'
import { Button } from '../../shared/components/button/button.component'
import { Input } from '../../shared/components/input/input.component'
import loaderStore from '../../shared/stores/loader.store'
import './registration.component.css'

export const RegistrationForm = () => {
  useEffect(() => {
    loaderStore.setState(false)
  }, [])

  return (
    <div className="registration">
      <form className='registration__form'>
        Регистрация
        <Input  placeholder='Придумайте никнейм' />
        <Input placeholder='Придумайте пароль' />
        <Input placeholder='Повторите пароль'/>
        <Button placeholder='Зарегистрироваться' />
        <span className='to-login'>Есть аккаунт? <a href='/login'>Войдите!</a></span>
      </form>
    </div>
  )
}