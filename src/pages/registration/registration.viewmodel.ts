
import md5 from "md5";
import { useState } from "react"
import { NavigateFunction } from "react-router-dom";
import authStore from "../../shared/stores/auth.store";

export default function UseRegistrationViewModel(navigate: NavigateFunction) {
    const [username, setUsername] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [secondPassword, setSecondPassword] = useState<string>('');

    const registration = (e: any) => {
        e.preventDefault();
        const hashedPassword = md5(password);
        return authStore.registration({
          username,
          password: hashedPassword
        }).subscribe(
            () => navigate('/login'),
            (error) => alert(error.response.message)
        )
      }
   
    return {
        username,
        setUsername,
        password, 
        setPassword,
        secondPassword, 
        setSecondPassword,
        registration,
    }
}