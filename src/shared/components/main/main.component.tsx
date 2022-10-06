import { useEffect } from 'react'
import authStore from '../../stores/auth.store';
import { ChatList } from '../chat-list/chat-list.component';
import './main.component.css'

export const Main = () => {

  VK.Auth.getSession((session) => {
    console.log(session);
    
  })
  return (
    <div className='main'>
      <div className='main__chat-list'>
        <ChatList list={['chat', 'chat', 'chat', 'chat', 'chat', 'chat', 'chat', ]}/>
      </div>
      <div className='main__chat'>
        конкретный чат
      </div>
    </div>
  )
}