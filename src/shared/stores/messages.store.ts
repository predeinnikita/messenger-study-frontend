import { makeAutoObservable, observable } from "mobx";
import { map, Observable, Subject } from "rxjs";
import { io, Socket } from "socket.io-client";
import { apiHost } from "../../constants";
import { IChat } from "../interfaces/chat.interface";
import authStore from "./auth.store";
import chatsStore from "./chats.store";

class MessagesStore {
    public socket!: Socket;
    private _openChatSubject$ = new Subject<IChat>();

    constructor() {
        makeAutoObservable(this);
    }

    get openChatEvents$(): Observable<IChat> {
        return this._openChatSubject$.asObservable().pipe(
            map(chat => chatsStore.currentChat = chat)
        )
    }

    public connect(): void {
        this.socket = io(apiHost, {
            query: {
                userId: authStore.userId
            },
            extraHeaders: {
                'authorization': localStorage.getItem('access_token') || '',
            }
        });
    }

    public sendMessage(recipientId: number, text: string): void {
        this.socket.emit('send:message:request', {
            senderId: authStore.userId,
            recipientId: recipientId,
            text: text
        });
    }

    public getMessages(chatId: number): void {
        this.socket.emit('get:message:request', {
            chatId: chatId
        });
    }

    public openChat(chat: IChat): void {
        this._openChatSubject$.next(chat);
    }
}

const messagesStore = observable(new MessagesStore());

export default messagesStore;