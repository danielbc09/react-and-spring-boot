import { useContext, useEffect, useState } from 'react';
import Swal from 'sweetalert2';
import { UserContext } from '../context/UserContext';

// eslint-disable-next-line react/prop-types
export const UserForm = ({ userSelected, handleCloseForm }) => {
  const { initialUserForm, handlerAddUser } = useContext(UserContext);
  const [userForm, setUserForm] = useState(initialUserForm);
  const { id, userName, password, email } = userForm;

  const onInputChange = ({ target }) => {
    const { name, value } = target;
    setUserForm({
      ...userForm,
      [name]: value,
    });
  };

  const onsubmit = (event) => {
    event.preventDefault();
    if (!userName || (!password && id === 0) || !email) {
      Swal.fire({
        title: 'Error de validación ',
        text: 'Debe completar los campos del formulario!',
        icon: 'error',
      });
      return;
    }
    if (!email.includes('@')) {
      Swal.fire({
        title: 'Error de validación email',
        text: 'El email debe ser valido, incluir una arroba!',
        icon: 'error',
      });
      return;
    }
    handlerAddUser(userForm);
    setUserForm(initialUserForm);
  };

  useEffect(() => {
    setUserForm({ ...userSelected });
  }, [userSelected]);

  const onCloseForm = () => {
    handleCloseForm();
    setUserForm(initialUserForm);
  };

  return (
    <form onSubmit={onsubmit}>
      <input
        className="form-control my-3 w-75"
        placeholder="User name"
        name="userName"
        value={userName}
        onChange={onInputChange}
      />
      {id > 0 || (
        <input
          className="form-control my-3 w-75"
          placeholder="Password"
          name="password"
          type="password"
          value={password}
          onChange={onInputChange}
        />
      )}
      <input
        className="form-control my-3 w-75"
        placeholder="email"
        name="email"
        value={email}
        onChange={onInputChange}
      />
      <input type="hidden" name="id" value={id} />
      <button className="btn btn-primary" type="submit">
        {id > 0 ? 'Editar' : 'Crear'}
      </button>
      {!handleCloseForm || (
        <button
          className="btn btn-primary mx-2"
          type="button"
          onClick={onCloseForm}
        >
          Cerrar
        </button>
      )}
    </form>
  );
};
