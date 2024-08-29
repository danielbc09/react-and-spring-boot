import { UserList } from '../components/UserList';
import { UserModalForm } from '../components/UserModalForm';
import { useUsers } from '../hooks/useUsers';

export const UsersPage = () => {
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
      {!visibleForm || (
        <UserModalForm
          userSelected={userSelected}
          initialUserForm={initialUserForm}
          handlerAddUser={handlerAddUser}
          handleCloseForm={handleCloseForm}
        />
      )}
      <div className="container my-4">
        <h2>Users App</h2>
        <div className="row">
          <div className="col">
            {visibleForm || (
              <button className="btn btn-primary my-2" onClick={handleOpenForm}>
                Nuevo Usuario
              </button>
            )}
            {users.length == 0 ? (
              <div className="alert alert-warning">
                No hay usuarios en el sistema!
              </div>
            ) : (
              <UserList
                users={users}
                handleRemoveUser={handleRemoveUser}
                handleUserSelectedForm={handleUserSelectedForm}
              />
            )}
          </div>
        </div>
      </div>
    </>
  );
};
