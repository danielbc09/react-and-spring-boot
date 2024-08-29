import { LoginPage } from './auth/pages/LoginPage';
import { UsersPage } from './pages/UsersPage';
import { Navbar } from './components/layout/Navbar';
import { useAuth } from './auth/hooks/useAuth';

export const UserApp = () => {
  const { login, handlerLogin, handlerLogOut } = useAuth();
  return (
    <>
      {login.isAuth ? (
        <>
          <Navbar login={login} handlerLogOut={handlerLogOut} />
          <UsersPage />
        </>
      ) : (
        <LoginPage handlerLogin={handlerLogin} />
      )}
    </>
  );
};
