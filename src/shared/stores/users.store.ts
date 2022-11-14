import { observable } from "mobx";
import { map, Observable, pipe } from "rxjs";
import { ajax, AjaxResponse } from "rxjs/ajax";
import { Socket } from "socket.io-client";
import { apiHost } from "../../constants";
import { IUser } from "../interfaces/user.interface";
import authStore from "./auth.store";

const usersStore = observable({
    findUser(username: string): Observable<IUser> {
        return ajax.get<IUser>(`${apiHost}/users/find?username=${username}`, authStore.headers()).pipe(
            map((result: AjaxResponse<IUser>) => result.response)
        )
    }
});

export default usersStore;