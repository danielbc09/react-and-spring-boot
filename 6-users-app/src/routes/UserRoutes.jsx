import { useContext } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import { UsersPage } from '../pages/UsersPage';
import { Navbar } from '../components/layout/Navbar';
import { RegisterPage } from '../pages/RegisterPage';
import { UserProvider } from '../context/UserProvider';
import { AuthContext } from '../auth/context/AuthContext';
export const UserRoutes = () => {
  const { login } = useContext(AuthContext);

  return (
    <>
      <UserProvider>
        <Navbar />
        <Routes>
          <Route path="users" element={<UsersPage />}></Route>
          {!login.isAdmin || (
            <>
              <Route path="users/register" element={<RegisterPage />}></Route>
              <Route path="users/edit/:id" element={<RegisterPage />}></Route>
            </>
          )}
          <Route path="/" element={<Navigate to="/users" />}></Route>
        </Routes>
      </UserProvider>
    </>
  );
};
