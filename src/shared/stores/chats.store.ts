import { observable } from "mobx";
import { map, Observable, Subject } from "rxjs";
import { ajax, AjaxResponse } from "rxjs/ajax";
import { apiHost } from "../../constants";
import { IChat } from "../../pages/main/components/chat-list/chat-list.component";
import authStore from "./auth.store";

const chatsStore = observable({
    currentChat: <IChat>{},
    updateChatList$: new Subject<void>(),
    getChats(): Observable<IChat[]> {
        return ajax.get<IChat[]>(`${apiHost}/chats/my`, authStore.headers()).pipe(
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
            map((result) => result.response === 200)
        )
    }
});

export default chatsStore;