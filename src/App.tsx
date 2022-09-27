import { useState } from 'react';
import { BrowserRouter, Route, Routes, useNavigate } from 'react-router-dom';
import { LoginForm } from './modules/login/login.component';
import { Main } from './modules/main/main.component';
import { Footer } from './shared/components/footer.component';
import { Header } from './shared/components/header.component';
import { VkAuth } from './shared/utils/vk.auth';

export const App = () => {
  let navigate = useNavigate();

  VkAuth.unsubscribe();
  const [name, setName] = useState('');

  VkAuth.addSubscription(
    VkAuth.loginChange$.subscribe((name) => {
      setName(name);
    })
  );

  const login = () => {
    navigate('/login');
    VkAuth.login();
  };

  const logout = () => {
    navigate('/main');
    VkAuth.logout();
  }

  return (
    <div className="app">
      <Header/>
      <div id='vk'>{name}</div>
      <button onClick={login}>Войти</button>
      <button onClick={logout}>Выйти</button>
        <Routes>
          <Route path="login" element={<LoginForm />}/>
          <Route path="main" element={<Main />}/>
        </Routes>
      <Footer />
    </div>
  )
}

