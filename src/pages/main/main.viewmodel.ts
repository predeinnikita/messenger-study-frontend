
import { useEffect, useState } from "react"
import { NavigateFunction } from "react-router-dom";
import { ButtonEvent } from "../../shared/components/button/button.component";
import { IChat } from "../../shared/interfaces/chat.interface";
import { IMessage } from "../../shared/interfaces/message.interface";
import authStore from "../../shared/stores/auth.store";
import chatsStore from "../../shared/stores/chats.store";
import loaderStore from "../../shared/stores/loader.store";
import messagesStore from "../../shared/stores/messages.store";
import UseMessagesViewModel from "./messages.viewmodel";

export default function UseMainViewModel(navigate: NavigateFunction) {
    const [chats, setChats] = useState<IChat[]>([]);
    const [chatId, setChatId] = useState<number>(-1);
    const [inputValue, setInputValue] = useState<string>('');

    const {
        messages,
        getMessageResponseHandler,
        sendMessagesResponseHandler
    } = UseMessagesViewModel()

    const onClick = (event: ButtonEvent) => {
        event.preventDefault();
        const recipientId = chatsStore.currentChat.firstUser.id === authStore.userId
          ? chatsStore.currentChat.secondUser.id
          : chatsStore.currentChat.firstUser.id;
        if (inputValue) {
          messagesStore.sendMessage(recipientId, inputValue);
          loaderStore.setState(true);
          setInputValue('');
        }
      }

    const getChats = () => {
        chatsStore.getChats().subscribe(chats => {
            setChats(chats);
            loaderStore.setState(false);
        });
    }

    const getMessages = (chat: IChat) => {
        messagesStore.getMessages(chat.id);
        setChatId(chat.id);
    }

    const updateChats = (chats: IChat[], newMessage: IMessage) => {
      const chat = chats.find(chat => chat.id === newMessage.chat.id)
      
      if (chat) {
        chat.lastMessage = newMessage;
        const chatIndex = chats.indexOf(chat);
        chats.splice(chatIndex, 1);
        chats.unshift(chat);
      }
      
      return chats;
    }

    useEffect(() => {
        loaderStore.setState(true);
        authStore.checkOrRefreshToken(navigate)
    
        messagesStore.connect();
        chatsStore.updateChatList$.subscribe(() => getChats());
    
        messagesStore.openChatEvents$.subscribe((chat) => {
          getMessages(chat);
        });
    
        messagesStore.socket.on('get:message:response', getMessageResponseHandler);
    
        messagesStore.socket.on('send:message:response', (result: any) => {
          sendMessagesResponseHandler(result);
          setChats(chats => updateChats(chats, result.message as IMessage))
        })
      }, []);

      return  {
        chatId,
        chats,
        messages,
        onClick,
        inputValue,
        setInputValue
      }
}