import { useEffect } from 'react'
import { ChatList } from './components/chat-list/chat-list.component';
import loaderStore from '../../shared/stores/loader.store';
import { Messages } from './components/messages/messages.component';
import { Input } from '../../shared/components/input/input.component';
import { Button } from '../../shared/components/button/button.component';

import './main.component.css'


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