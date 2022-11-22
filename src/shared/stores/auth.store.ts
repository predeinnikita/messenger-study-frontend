import { Http2ServerRequest } from "http2";
import { makeAutoObservable, observable } from "mobx";
import { NavigateFunction } from "react-router-dom";
import { catchError, map, Observable, of, tap, throwError } from "rxjs";
import { ajax, AjaxError, AjaxResponse } from 'rxjs/ajax'
import { apiHost } from "../../constants";
import { ILoginResponse, ILoginRequest } from "../interfaces/login.interfaces";
import { IRegistrationRequest } from "../interfaces/registration.interfaces";
import chatsStore from "./chats.store";

class AuthStore {

    constructor() {
        makeAutoObservable(this);
    }

    public get userId(): number {
        return Number(localStorage.getItem('userId'));
    }

    public get headers() {
        return {
            'Content-Type': 'application/json',
            'Authorization': localStorage.getItem('access_token') || '',
        }
    }

    public login(data: ILoginRequest): Observable<string> {
        return ajax<ILoginResponse>({
            method: 'POST',
            url: `${apiHost}/auth/login`,
            withCredentials: true,
            headers: this.headers,
            body: data
        }).pipe(
            catchError((err: AjaxError) => {
                alert('Неверный логин или пароль');
                return throwError(err);
            }),
            map(res => {
                localStorage.setItem('userId', res.response.userId.toString())
                const access_token = res.response.access_token;
                this.updateAccessToken(access_token);

                return access_token;
            })
        )
    }

    public logout(): Observable<number> {
        return ajax<ILoginResponse>({
            method: 'POST',
            url: `${apiHost}/auth/logout`,
            withCredentials: true,
            headers: this.headers,
        }).pipe(
            map((res) => {
                this.updateAccessToken('');

                return res.status;
            })
        )
    }

    public registration(data: IRegistrationRequest) {
        return ajax.post(`${apiHost}/auth/registration`, data, this.headers).pipe(
            catchError((err: AjaxError) => {
                alert('Ошибка при регистрации');
                return throwError(err);
            }),
        )

    }

    public checkOrRefreshToken(navigate: NavigateFunction) {
        this.checkToken().subscribe(
            (result) => {
                chatsStore.updateChatList$.next();
            },
            () => {
                this.refreshToken().subscribe(
                    () => chatsStore.updateChatList$.next(),
                    () => navigate('/login')
                );
            }
        )
    }

    private checkToken(): Observable<any> {
        return ajax.get<any>(`${apiHost}/auth/check-token`, this.headers).pipe(
            map(result => localStorage.setItem('userId', result.response.userId)
            )
        );
    }

    private refreshToken() {
        return ajax<ILoginResponse>({
            method: 'GET',
            url: `${apiHost}/auth/refresh`,
            withCredentials: true,
        }).pipe(
            map(res => {
                const access_token = res.response.access_token;
                this.updateAccessToken(access_token);

                return access_token;
            })
        );
    }

    private updateAccessToken(token: string) {
        localStorage.setItem('access_token', 'Bearer ' + token)
    }
}

const authStore = observable(new AuthStore());

export default authStore;