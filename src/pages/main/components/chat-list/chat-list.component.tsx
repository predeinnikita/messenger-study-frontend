import { Input } from '../../../../shared/components/input/input.component';
import './chat-list.component.css'
import authStore from '../../../../shared/stores/auth.store';
import messagesStore from '../../../../shared/stores/messages.store';
import chatsStore from '../../../../shared/stores/chats.store';
import { IChat } from '../../../../shared/interfaces/chat.interface';

export interface IChatProps {
  chats: IChat[],
}

export const ChatList = (props: IChatProps) => {
  const { chats } = props;

  return (
      <>
        <div className='search-block'>
          <Input type='text' placeholder='Поиск' />
        </div>
        <ul className="chat-list">
          {
            chats.map((chat, index) => {
              const otherUser = chat.firstUser.id === authStore.userId? chat.secondUser: chat.firstUser;
              const additionalClass = chatsStore.currentChat.id === chat.id ? '_current' : '';
              return (<li key={index} className={`chat-list__item${additionalClass}`}>
                <div className="chat-item" onClick={() => messagesStore.openChat(chat)}>
                  <div className="chat-item__name">{otherUser.username}</div>
                  <div className="chat-item__message"></div>
                </div>
              </li>)
            })          
          }
        </ul>
      </>
  )
}

