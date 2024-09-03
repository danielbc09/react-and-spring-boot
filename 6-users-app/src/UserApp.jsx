import { LoginPage } from './auth/pages/LoginPage';
import { Route, Routes, Navigate } from 'react-router-dom';
import { UserRoutes } from './routes/UserRoutes';
import { useContext } from 'react';
import { AuthContext } from './auth/context/AuthContext';

export const UserApp = () => {
  const { login } = useContext(AuthContext);
  return (
    <Routes>
      {login.isAuth ? (
        <>
          <Route path="/*" element={<UserRoutes />} />
        </>
      ) : (
        <>
          <Route path="login" element={<LoginPage />} />
          <Route path="/*" element={<Navigate to="login" />} />
        </>
      )}
    </Routes>
  );
};
