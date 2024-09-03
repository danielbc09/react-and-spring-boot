import { UserContext } from './UserContext';
import { useUsers } from '../hooks/useUsers';

// eslint-disable-next-line react/prop-types
export const UserProvider = ({ children }) => {
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
    getUsers,
  } = useUsers();

  return (
    <UserContext.Provider
      value={{
        users,
        userSelected,
        initialUserForm,
        visibleForm,
        handlerAddUser,
        handleRemoveUser,
        handleUserSelectedForm,
        handleOpenForm,
        handleCloseForm,
        getUsers,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};
