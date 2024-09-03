import { Navigate, Route, Routes } from 'react-router-dom';
import { UsersPage } from '../pages/UsersPage';
import { Navbar } from '../components/layout/Navbar';
import { RegisterPage } from '../pages/RegisterPage';
import { UserProvider } from '../context/UserProvider';
export const UserRoutes = () => {
  return (
    <>
      <UserProvider>
        <Navbar />
        <Routes>
          <Route path="users" element={<UsersPage />}></Route>
          <Route path="users/register" element={<RegisterPage />}></Route>
          <Route path="users/edit/:id" element={<RegisterPage />}></Route>
          <Route path="/" element={<Navigate to="/users" />}></Route>
        </Routes>
      </UserProvider>
    </>
  );
};
