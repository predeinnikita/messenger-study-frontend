import { Http2ServerRequest } from "http2";
import { observable } from "mobx";
import { catchError, map, Observable, of, tap } from "rxjs";
import { ajax } from 'rxjs/ajax'
import { apiHost } from "../../constants";
import { ILoginResponse, ILoginRequest } from "../interfaces/login.interfaces";
import { IRegistrationRequest } from "../interfaces/registration.interfaces";

const authStore = observable({
    get userId(): number {
        return Number(localStorage.getItem('userId'));
    },
    headers: () => ({
        'Content-Type': 'application/json',
        'Authorization': localStorage.getItem('access_token') || '',
    }),
    updateAccessToken(token: string) {
        localStorage.setItem('access_token', 'Bearer ' + token)
    },
    login(data: ILoginRequest): Observable<string> {
        return ajax<ILoginResponse>({
            method: 'POST',
            url: `${apiHost}/auth/login`,
            withCredentials: true,
            headers: this.headers(),
            body: data
        }).pipe(
            map(res => {
                localStorage.setItem('userId', res.response.userId.toString())
                const access_token = res.response.access_token;
                this.updateAccessToken(access_token);

                return access_token;
            })
        )
    },
    logout(): Observable<number> {
        return ajax<ILoginResponse>({
            method: 'POST',
            url: `${apiHost}/auth/logout`,
            withCredentials: true,
            headers: this.headers(),
        }).pipe(
            map((res) => {
                this.updateAccessToken('');

                return res.status;
            })
        )
    },
    registration(data: IRegistrationRequest) {
        return ajax.post(`${apiHost}/auth/registration`, data, this.headers())

    },
    checkToken(): Observable<any> {
        return ajax.get<any>(`${apiHost}/auth/check-token`, this.headers()).pipe(
                map(result => localStorage.setItem('userId', result.response.userId)
            )
        );
    },
    refreshToken() {
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
});

export default authStore;