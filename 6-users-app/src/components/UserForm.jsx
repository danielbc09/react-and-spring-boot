import { useContext, useEffect, useState } from 'react';
import { UserContext } from '../context/UserContext';

// eslint-disable-next-line react/prop-types
export const UserForm = ({ userSelected, handleCloseForm }) => {
  const { initialUserForm, handlerAddUser, errors } = useContext(UserContext);
  const [userForm, setUserForm] = useState(initialUserForm);
  const { id, username, password, email } = userForm;

  const onInputChange = ({ target }) => {
    const { name, value } = target;
    setUserForm({
      ...userForm,
      [name]: value,
    });
  };

  const onsubmit = (event) => {
    event.preventDefault();
    /*
    if (!username || (!password && id === 0) || !email) {
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
    }*/
    handlerAddUser(userForm);
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
        name="username"
        value={username}
        onChange={onInputChange}
      />
      <p className="text-danger">{errors?.username}</p>
      {id > 0 || (
        <>
          <input
            className="form-control my-3 w-75"
            placeholder="Password"
            name="password"
            type="password"
            value={password}
            onChange={onInputChange}
          />
          <p className="text-danger">{errors?.password}</p>
        </>
      )}

      <input
        className="form-control my-3 w-75"
        placeholder="email"
        name="email"
        value={email}
        onChange={onInputChange}
      />
      <p className="text-danger">{errors?.email}</p>

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
