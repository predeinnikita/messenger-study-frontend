import { useEffect } from 'react';
import { Route, Routes, useNavigate } from 'react-router-dom';
import { LoginForm } from './shared/components/login/login.component';
import { Main } from './shared/components/main/main.component';
import { Footer } from './shared/components/footer/footer.component';
import { Header } from './shared/components/header/header.component';
import { observer } from 'mobx-react';
import loaderStore from './shared/stores/loader.store';
import { Loader } from './shared/components/loader/loader.component';

export const App = observer(() => {
  const navigate = useNavigate();

  useEffect(() => {
    setTimeout(() => {
      loaderStore.setState(false);
    }, 2000);

    VK.Auth.getLoginStatus((response) => {
      if (response.status === 'not_authorized' || response.status === 'unknown') {
        navigate('/login');
      } else {
        console.log(response);
        navigate('/main');
      }
    });
  }, []);

  return (
    <div className="app">
      <Header/>
        <Routes>
          <Route path="login" element={<LoginForm />}/>
          <Route path="main" element={<Main />}/>
        </Routes>
      <Footer />
      { loaderStore.loading? <Loader />: '' }
    </div>
  )
})

