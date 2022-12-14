import { useState } from "react";
import { NavigateFunction } from "react-router-dom";
import { IMessage } from "../../shared/interfaces/message.interface";
import authStore from "../../shared/stores/auth.store";
import chatsStore from "../../shared/stores/chats.store";
import loaderStore from "../../shared/stores/loader.store";

export default function UseMessagesViewModel() {
    const [messages, setMessages] = useState<IMessage[]>([]);

    const getMessageResponseHandler = (result: any) => {
        const messages: IMessage[] = result.result.map((message: any) => {
            return {
                id: message.id,
                text: message.text,
                date: message.date,
                my: message.sender.id === authStore.userId,
                chatId: message.chat.id
            }
        })
        loaderStore.setState(false);
        setMessages(messages);
    }

    const sendMessagesResponseHandler = (result: any) => {
        if (result.message.chat.id !== chatsStore.currentChat.id) {
            return;
        }
        loaderStore.setState(false);
        setMessages((messages: IMessage[]) => {
            const newMessages = messages.slice();
            newMessages.unshift({
                id: result.message.id,
                text: result.message.text,
                date: result.message.date,
                my: result.message.sender.id === authStore.userId,
                chatId: result.message.chat.id,
                chat: result.message.chat,
            });
            return newMessages;
        });
    }

    return {
        messages,
        getMessageResponseHandler,
        sendMessagesResponseHandler
    }
}