import { useEffect } from 'react';
import { Route, Routes, useNavigate } from 'react-router-dom';
import { LoginForm } from './pages/login/login.component';
import { Main } from './pages/main/main.component';
import { Footer } from './shared/components/footer/footer.component';
import { Header } from './shared/components/header/header.component';
import { observer } from 'mobx-react';
import loaderStore from './shared/stores/loader.store';
import { Loader } from './shared/components/loader/loader.component';
import authStore from './shared/stores/auth.store';
import './App.css';
import { RegistrationForm } from './pages/registration/registration.component';
import { io } from 'socket.io-client';

export const App = observer(() => {
  const navigate = useNavigate();
  
  return (
    <div className="app s">
      <Header/>
        <Routes>
          <Route path="login" element={<LoginForm />}/>
          <Route path="" element={<Main />}/>
          <Route path="registration" element={<RegistrationForm />}/>
        </Routes>
      <Footer />
      { loaderStore.loading? <Loader />: '' }
    </div>
  )
})

