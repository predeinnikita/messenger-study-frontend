import { useEffect, useState } from 'react'
import { ChatList, IChat } from './components/chat-list/chat-list.component';
import loaderStore from '../../shared/stores/loader.store';
import { IMessage, Messages } from './components/messages/messages.component';
import { Input } from '../../shared/components/input/input.component';
import { Button, ButtonEvent } from '../../shared/components/button/button.component';

import './main.component.css'
import { io } from 'socket.io-client';
import chatsStore from '../../shared/stores/chats.store';
import authStore from '../../shared/stores/auth.store';
import { useNavigate } from 'react-router-dom';
import messagesStore from '../../shared/stores/messages.store';




export const Main = () => {
  const [chats, setChats] = useState<IChat[]>([]);
  const [messages, setMessages] = useState<IMessage[]>([]);

  const getChats = () => {
    chatsStore.getChats().subscribe(chats => {
      setChats(chats);
    })
  }

  const getMessages = (chat: IChat) => {
    messagesStore.getMessages(chat.id)
  }

  const sendMessage = (recipientId: number, text: string) => {
    messagesStore.sendMessage(recipientId, text);
  }



  const navigate = useNavigate();

  useEffect(() => {
    messagesStore.connect();
    chatsStore.updateChatList$.subscribe(() => getChats());

    messagesStore.openChatEvents$.subscribe((chat) => {
      getMessages(chat);
    });

    messagesStore.socket.on('get:message:response', (result: any) => {
      const messages: IMessage[] = result.result.map((message: any) => {
        return {
          id: message.id,
          text: message.text,
          date: message.date,
          my: message.sender.id === authStore.userId,
        }
      })
      setMessages(messages);
    });

    messagesStore.socket.on('send:message:response', (result: any) => {


      // console.log(newMessages);

      setMessages((messages: IMessage[]) => {
        console.log(messages);
        
        const newMessages = messages.slice();
        newMessages.unshift({
          id: result.message.id,
          text: result.message.text,
          date: result.message.date,
          my: result.message.sender.id === authStore.userId
        });

        return newMessages;

      });
    })

    authStore.checkToken().subscribe(
      (result) => {
        chatsStore.updateChatList$.next();
      },
      () => {
        authStore.refreshToken().subscribe(
          () => chatsStore.updateChatList$.next(),
          () => navigate('/login')
        );
      }
    )
  }, []);

  useEffect(() => {
    setTimeout(() => {
      loaderStore.setState(false);
    }, 1000);
  }, [])


  const [inputValue, setInputValue] = useState<string>('');
  const onClick = (event: ButtonEvent) => {
    event.preventDefault();
    // setInputValue('');
    const recipientId = chatsStore.currentChat.firstUser.id === authStore.userId
      ? chatsStore.currentChat.secondUser.id
      : chatsStore.currentChat.firstUser.id;
    messagesStore.sendMessage(recipientId, inputValue);
  }

  return (
    <div className='main'>
      <div className='main__chat-list'>
        <ChatList chats={chats} />
      </div>
      <div className='main__chat'>
        <Messages messages={messages} />
        <form className='main__chat_send'>
          <Input type='text' placeholder='Напишите сообщение' onChangeHandler={(event: any) => setInputValue(event.target.value)} value={inputValue}/>
          <Button placeholder='Отправить' onClickHandler={onClick} />
        </form>
      </div>
    </div>
  )
}