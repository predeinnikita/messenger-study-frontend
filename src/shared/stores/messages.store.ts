import { Socket } from "dgram";
import { observable } from "mobx";
import { map, Observable, Subject } from "rxjs";
import { io } from "socket.io-client";
import { IChat } from "../../pages/main/components/chat-list/chat-list.component";
import { IMessage } from "../../pages/main/components/messages/messages.component";
import authStore from "./auth.store";
import chatsStore from "./chats.store";

const messagesStore = observable({
    socket: io(),
    connect(): void {
        this.socket = io('http://localhost:3000', {
            query: {
                userId: authStore.userId
            },
            extraHeaders: {
                'authorization': localStorage.getItem('access_token') || '',
            }
        });
    },
    sendMessage: function(recipientId: number, text: string): void {
        this.socket.emit('send:message:request', {
            senderId: authStore.userId,
            recipientId: recipientId,
            text: text
        });
    },
    getMessages(chatId: number): void {
        this.socket.emit('get:message:request', {
            chatId: chatId
        });
    },
    _openChatSubject$: new Subject<IChat>(),
    get openChatEvents$(): Observable<IChat> {
        return this._openChatSubject$.asObservable().pipe(
            map(chat => chatsStore.currentChat = chat)
        )
    },
    openChat(chat: IChat): void {
        this._openChatSubject$.next(chat);
    },
    messages$: new Subject<IMessage[]>(),
});

export default messagesStore;