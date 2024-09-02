import { useEffect, useState } from 'react';
import { UserForm } from '../components/UserForm';
import { useParams } from 'react-router-dom';

// eslint-disable-next-line react/prop-types
export const RegisterPage = ({
  users = [],
  handlerAddUser,
  initialUserForm,
}) => {
  const { id } = useParams();
  const [userSelected, setUserSelected] = useState(initialUserForm);

  useEffect(() => {
    if (id) {
      const user = users.find((user) => user.id == id) || initialUserForm;
      setUserSelected(user);
    }
    // eslint-disable-next-line react/prop-types
  }, [id]);

  return (
    <div className="container my-4">
      <h4>{userSelected.id > 0 ? 'Editar' : 'Registrar'} ususarios</h4>
      <div className="row">
        <div className="col">
          <UserForm
            userSelected={userSelected}
            handlerAddUser={handlerAddUser}
            initialUserForm={initialUserForm}
          />
        </div>
      </div>
    </div>
  );
};
