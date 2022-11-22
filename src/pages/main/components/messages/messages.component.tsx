import { IMessage } from '../../../../shared/interfaces/message.interface';
import chatsStore from '../../../../shared/stores/chats.store';
import './messages.component.css'

export interface IMessagesProps {
  messages: IMessage[]
}

export const Messages = (props: IMessagesProps) => {

  const { messages } = props;

  const renderMessages = messages.map((message, index) => {
    return <div className={`message ${message.my? 'my': ''}`} key={index}>
    <div className='message__text'>
      {message.text}
      <div className='message__time'>{message.date.split('T')[0]}</div>
    </div>
  </div>
  });  
  
  return (
    <div className="messages">
      {
        !chatsStore.currentChat || !chatsStore.currentChat.id || chatsStore.currentChat.id === -1
        ? <div className='without-chat-message'>Выберите чат, чтобы начать общение!</div>
        : renderMessages.length === 0
          ? <div className='chat-wihout-message'>Нет сообщений</div> 
          : renderMessages
      }      
    </div>
  )
}