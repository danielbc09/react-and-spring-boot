import { LoginPage } from './auth/pages/LoginPage';
import { useAuth } from './auth/hooks/useAuth';
import { Route, Routes, Navigate } from 'react-router-dom';
import { UserRoutes } from './routes/UserRoutes';

export const UserApp = () => {
  const { login, handlerLogin, handlerLogOut } = useAuth();
  return (
    <Routes>
      {login.isAuth ? (
        <>
          <Route
            path="/*"
            element={<UserRoutes login={login} handlerLogOut={handlerLogOut} />}
          />
        </>
      ) : (
        <>
          <Route
            path="login"
            element={<LoginPage handlerLogin={handlerLogin} />}
          />
          <Route path="/*" element={<Navigate to="login" />} />
        </>
      )}
    </Routes>
  );
};
