import { useEffect } from 'react'
import authStore from '../../stores/auth.store';
import { ChatList } from '../chat-list/chat-list.component';
import { ajax } from 'rxjs/ajax'

import './main.component.css'
import loaderStore from '../../stores/loader.store';
import { Messages } from '../messages/messages.component';
import { Input } from '../input/input.component';
import { Button } from '../button/button.component';


export const Main = () => {
  useEffect(() => {
    setTimeout(() => {
      loaderStore.setState(false);
    }, 1000);
  }, [])

  return (
    <div className='main'>
      <div className='main__chat-list'>
        <ChatList />
      </div>
      <div className='main__chat'>
        <Messages />
        <div className='main__chat_send'>
          <Input type='text' placeholder='Напишите сообщение' />
          <Button placeholder='Отправить' />
        </div>
      </div>
    </div>
  )
}