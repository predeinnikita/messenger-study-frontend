import { useEffect } from 'react';
import { ChatItem } from '../chat-item/chat-item.componen';
import './chat-list.component.css'

export const ChatList = () => {
  const chats = Array.from('aaaaaaaaaaaaaaaaaaaa').map((item, index) => {
    return (<li key={index} className="chat-list__item">
      <ChatItem />
    </li>)
  });
  
  return (
      <ul className="chat-list">
          {chats}
      </ul>
  )
}