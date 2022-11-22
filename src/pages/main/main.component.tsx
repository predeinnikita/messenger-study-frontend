import { ChatList } from './components/chat-list/chat-list.component';
import { Messages } from './components/messages/messages.component';
import { Input } from '../../shared/components/input/input.component';
import { Button } from '../../shared/components/button/button.component';
import './main.component.css'
import { useNavigate } from 'react-router-dom';
import UseMainViewModel from './main.viewmodel';

export const Main = () => {
  const {
    chatId,
    chats,
    messages,
    onClick,
    inputValue,
    setInputValue
  } = UseMainViewModel(useNavigate())

  return (
    <div className='main'>
      <div className='main__chat-list'>
        <ChatList chats={chats} />
      </div>
      <div className='main__chat'>
        <Messages messages={messages} />
        <form className='main__chat_send'>
          <Input disabled={chatId === -1}
            type='text'
            placeholder='Напишите сообщение'
            onChangeHandler={(event: any) => setInputValue(event.target.value)}
            value={inputValue}
          />
          <Button disabled={chatId === -1}
            placeholder='Отправить'
            onClickHandler={onClick}
          />
        </form>
      </div>
    </div>
  )
}