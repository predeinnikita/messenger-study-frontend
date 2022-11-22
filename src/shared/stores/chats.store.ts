import { makeAutoObservable, observable } from "mobx";
import { catchError, map, Observable, Subject, throwError } from "rxjs";
import { ajax, AjaxError, AjaxResponse } from "rxjs/ajax";
import { apiHost } from "../../constants";
import { IChat } from "../interfaces/chat.interface";
import authStore from "./auth.store";

class ChatsStore {
    public currentChat = <IChat>{};
    public updateChatList$ = new Subject<void>();

    constructor() {
        this.currentChat = <IChat>{};
        this.updateChatList$ = new Subject<void>();
        makeAutoObservable(this);
    }

    public getChats(): Observable<IChat[]> {
        return ajax.get<IChat[]>(`${apiHost}/chats/my`, authStore.headers).pipe(
            catchError((err: AjaxError) => {
                alert(err.response.message);
                return throwError(err);
            }),
            map((res: AjaxResponse<IChat[]>) => res.response)
        )
    }

    public createChat(otherUserId: number): Observable<boolean> {
        return ajax<number>({
            method: 'POST',
            url: `${apiHost}/chats/create?otherUserId=${otherUserId}`,
            withCredentials: true,
            headers: authStore.headers,
        }).pipe(
            catchError((err: AjaxError) => {
                alert(err.response.message);
                return throwError(err);
            }),
            map((result) => result.response === 200)
        )
    }
}

const chatsStore = observable(new ChatsStore());

export default chatsStore;