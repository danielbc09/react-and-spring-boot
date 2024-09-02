import { Navigate, Route, Routes } from 'react-router-dom';
import { UsersPage } from '../pages/UsersPage';
import { Navbar } from '../components/layout/Navbar';
import { RegisterPage } from '../pages/RegisterPage';
import { useUsers } from '../hooks/useUsers';
// eslint-disable-next-line react/prop-types
export const UserRoutes = ({ login, handlerLogOut }) => {
  const {
    users,
    userSelected,
    initialUserForm,
    visibleForm,
    handlerAddUser,
    handleRemoveUser,
    handleUserSelectedForm,
    handleOpenForm,
    handleCloseForm,
  } = useUsers();

  return (
    <>
      <Navbar login={login} handlerLogOut={handlerLogOut} />
      <Routes>
        <Route
          path="users"
          element={
            <UsersPage
              users={users}
              userSelected={userSelected}
              initialUserForm={initialUserForm}
              visibleForm={visibleForm}
              handlerAddUser={handlerAddUser}
              handleRemoveUser={handleRemoveUser}
              handleUserSelectedForm={handleUserSelectedForm}
              handleOpenForm={handleOpenForm}
              handleCloseForm={handleCloseForm}
            />
          }
        ></Route>
        <Route
          path="users/register"
          element={
            <RegisterPage
              handlerAddUser={handlerAddUser}
              initialUserForm={initialUserForm}
            />
          }
        ></Route>
        <Route
          path="users/edit/:id"
          element={
            <RegisterPage
              users={users}
              handlerAddUser={handlerAddUser}
              initialUserForm={initialUserForm}
            />
          }
        ></Route>
        <Route path="/" element={<Navigate to="/users" />}></Route>
      </Routes>
    </>
  );
};
