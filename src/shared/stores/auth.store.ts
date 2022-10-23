import { observable } from "mobx";
import { catchError, map, Observable, of, tap } from "rxjs";
import { ajax } from 'rxjs/ajax'
import { apiHost } from "../../constants";
import { ILoginResponse, ILoginRequest } from "../interfaces/login.interfaces";

const authStore = observable({
    headers: () => ({
        'Content-Type': 'application/json',
        'Authorization': localStorage.getItem('access_token') || '',
    }),
    updateAccessToken(token: string) {
        localStorage.setItem('access_token', 'Bearer ' + token)
    },
    login(data: ILoginRequest): Observable<string> {
        return ajax.post<ILoginResponse>(`${apiHost}/auth/login`, data, this.headers()).pipe(
            map(res => {
                const access_token = res.response.access_token;
                this.updateAccessToken(access_token);
                return access_token;
            })
        )
    },
    checkToken(): Observable<boolean> {
        return ajax.get(`${apiHost}/auth/check-token`, this.headers()).pipe(
            catchError((response) => of(response)),
            map(response => response.status === 200),
        );
    },
    refreshToken() {
        return ajax<ILoginResponse>({
            method: 'GET',
            url: `${apiHost}/auth/refresh`,
            withCredentials: true,
            headers: {
            }
        }).pipe(
            map(res => {
                const access_token = res.response.access_token;
                this.updateAccessToken(access_token);
                return access_token;
            })
        );
        return ajax.get<ILoginResponse>(`${apiHost}/auth/refresh`, {'withCredentials': "true"}).pipe(
            map(res => {
                const access_token = res.response.access_token;
                this.updateAccessToken(access_token);
                return access_token;
            })
        );
    }
});

export default authStore;