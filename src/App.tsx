import { Route, Routes } from 'react-router-dom';
import { LoginForm } from './pages/login/login.component';
import { Main } from './pages/main/main.component';
import { Footer } from './shared/components/footer/footer.component';
import { Header } from './shared/components/header/header.component';
import { observer } from 'mobx-react';
import loaderStore from './shared/stores/loader.store';
import { Loader } from './shared/components/loader/loader.component';
import './App.css';
import { RegistrationForm } from './pages/registration/registration.component';

export const App = observer(() => {  
  return (
    <div className="app">
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

