
import md5 from "md5";
import { useRef, useState } from "react"
import { NavigateFunction, useNavigate } from "react-router-dom";
import { catchError, of } from "rxjs";
import { ButtonEvent } from "../../shared/components/button/button.component";
import authStore from "../../shared/stores/auth.store";
import loaderStore from "../../shared/stores/loader.store";

export default function UseLoginViewModel(navigate: NavigateFunction) {
    const [username, setUsername] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    
    const formValid = password && password.length > 7 && username;

    const login = (e: ButtonEvent) => {
        e.preventDefault();
        const passwordHash = md5(password);

        authStore.login({ username, password: passwordHash }).pipe(
            catchError(() => of(false))
        ).subscribe(res => {
            if (res) {
                navigate('/');
            } else {
                alert('Неверный логин или пароль')
            }
        });
    }

    return {
        username,
        setUsername,
        password,
        setPassword,
        formValid,
        login
    }
}