import { observable } from "mobx";
import { catchError, map, Observable, Subject, throwError } from "rxjs";
import { ajax, AjaxError, AjaxResponse } from "rxjs/ajax";
import { apiHost } from "../../constants";
import { IChat } from "../../pages/main/components/chat-list/chat-list.component";
import authStore from "./auth.store";

const chatsStore = observable({
    currentChat: <IChat>{},
    updateChatList$: new Subject<void>(),
    getChats(): Observable<IChat[]> {
        return ajax.get<IChat[]>(`${apiHost}/chats/my`, authStore.headers()).pipe(
            catchError((err: AjaxError) => {
                alert(err.response.message);
                return throwError(err);
            }),
            map((res: AjaxResponse<IChat[]>) => res.response)
        )
    },
    createChat(otherUserId: number): Observable<boolean> {
        return ajax<number>({
            method: 'POST',
            url: `${apiHost}/chats/create?otherUserId=${otherUserId}`,
            withCredentials: true,
            headers: authStore.headers(),
        }).pipe(
            catchError((err: AjaxError) => {
                alert(err.response.message);
                return throwError(err);
            }),
            map((result) => result.response === 200)
        )
    }
});

export default chatsStore;