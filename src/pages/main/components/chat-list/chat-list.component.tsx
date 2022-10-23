import { useEffect } from 'react';
import { ChatItem } from '../chat-item/chat-item.componen';
import { Input } from '../../../../shared/components/input/input.component';
import './chat-list.component.css'

export const ChatList = () => {
  const chats = Array.from('aaaaaaaaaaaaaaaaaaaa').map((item, index) => {
    return (<li key={index} className="chat-list__item">
      <ChatItem />
    </li>)
  });
  
  return (
      <div>
        <div className='search-block'>
          <Input type='text' placeholder='Поиск' />
        </div>
        <ul className="chat-list">
            {chats}
        </ul>
      </div>
  )
}