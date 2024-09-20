import { useContext, useEffect, useState } from 'react';
import { UserContext } from '../context/UserContext';

// eslint-disable-next-line react/prop-types
export const UserForm = ({ userSelected, handleCloseForm }) => {
  const { initialUserForm, handlerAddUser, errors } = useContext(UserContext);
  const [userForm, setUserForm] = useState(initialUserForm);
  const { id, username, password, email, admin } = userForm;
  const [checked, setChecked] = useState(userForm.admin);

  const onInputChange = ({ target }) => {
    const { name, value } = target;
    setUserForm({
      ...userForm,
      [name]: value,
    });
  };

  const onsubmit = (event) => {
    event.preventDefault();
    handlerAddUser(userForm);
  };

  const onCheckboxChange = () => {
    setChecked(!checked);
    setUserForm({
      ...userForm,
      admin: checked,
    });
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
      <div className="my-3 form-check">
        <input
          type="checkbox"
          name="admin"
          checked={admin}
          className="form-check-input"
          onChange={onCheckboxChange}
        />
        <label className="form-check-label">Admin </label>
      </div>
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
