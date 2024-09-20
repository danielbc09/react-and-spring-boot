import { useReducer, useState, useContext } from 'react';
import { usersReducer } from '../reducers/usersReducer';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';
import { findAll, save, update, remove } from '../services/userService';
import { AuthContext } from '../auth/context/AuthContext';

const initialUsers = [];

const initialUserForm = {
  id: 0,
  username: '',
  password: '',
  email: '',
  admin: false,
};

const initialsErrors = {
  username: '',
  password: '',
  email: '',
};

export const useUsers = () => {
  const [users, dispatch] = useReducer(usersReducer, initialUsers);
  const [userSelected, setUserSelected] = useState(initialUserForm);
  const [visibleForm, setVisibleForm] = useState(false);
  const [errors, setErrors] = useState(initialsErrors);
  const { login, handlerLogOut } = useContext(AuthContext);

  const navigate = useNavigate();

  const getUsers = async () => {
    try {
      const result = await findAll();
      console.log(result);
      dispatch({
        type: 'loadingUsers',
        payload: result.data,
      });
    } catch (error) {
      if (error.response && error.response.status === 401) {
        handlerLogOut();
      }
    }
  };

  const handlerAddUser = async (user) => {
    if (!login.isAdmin) return;
    try {
      let response;
      if (user.id === 0) {
        response = await save(user);
      } else {
        response = await update(user);
      }
      dispatch({
        type: user.id === 0 ? 'addUser' : 'updateUser',
        payload: response.data,
      });
      Swal.fire(
        user.id === 0 ? 'Usuario Creado' : 'Usuario Actualizado',
        user.id === 0
          ? 'El usuario ha sido creado con exito!'
          : 'El usuario ha sido actualizado con exito!',
        'success'
      );
      handleCloseForm();
      navigate('/users');
    } catch (error) {
      if (error.response && error.response.status === 400) {
        setErrors(error.response.data);
      } else if (
        error.response &&
        error.response.status === 500 &&
        error.response.data?.message?.includes('constraint')
      ) {
        if (error.response.data?.message?.includes('UK_username')) {
          setErrors({ username: 'El username ya existe!' });
        }
        if (error.response.data?.message?.includes('UK_email')) {
          setErrors({ email: 'El email ya existe!' });
        }
      } else if (error.response && error.response.status === 401) {
        handlerLogOut();
      } else {
        throw error;
      }
    }
  };

  const handleRemoveUser = (id) => {
    if (!login.isAdmin) return;

    Swal.fire({
      title: 'Esta seguro que desea eliminar?',
      text: 'Cuidado el usuario será eliminado!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, eliminar!',
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          await remove(id);
          dispatch({
            type: 'removeUser',
            payload: id,
          });
          Swal.fire({
            title: 'Usuario Eliminado!',
            text: 'Usuario eliminado con exito.',
            icon: 'success',
          });
        } catch (error) {
          if (error.response && error.response.status === 401) {
            handlerLogOut();
          }
        }
      }
    });
  };

  const handleUserSelectedForm = (user) => {
    setUserSelected({ ...user });
    setVisibleForm(true);
  };

  const handleOpenForm = () => {
    setVisibleForm(true);
  };

  const handleCloseForm = () => {
    setVisibleForm(false);
    setUserSelected(initialUserForm);
    setErrors({});
  };

  return {
    users,
    userSelected,
    initialUserForm,
    visibleForm,
    errors,
    handlerAddUser,
    handleRemoveUser,
    handleUserSelectedForm,
    handleOpenForm,
    handleCloseForm,
    getUsers,
  };
};
