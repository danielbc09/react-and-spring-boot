import { useReducer, useState } from 'react';
import { usersReducer } from '../reducers/usersReducer';
import Swal from 'sweetalert2';

const initialUsers = [
  {
    id: 1,
    userName: 'pepe',
    password: '12345',
    email: 'pepe@correo.com',
  },
];

const initialUserForm = {
  id: 0,
  userName: '',
  password: '',
  email: '',
};

export const useUsers = () => {
  const [users, dispatch] = useReducer(usersReducer, initialUsers);
  const [userSelected, setUserSelected] = useState(initialUserForm);
  const [visibleForm, setVisibleForm] = useState(false);

  const handlerAddUser = (user) => {
    console.log(user);
    dispatch({
      type: user.id === 0 ? 'addUser' : 'updateUser',
      payload: user,
    });
    Swal.fire(
      user.id === 0 ? 'Usuario Creado' : 'Usuario Actualizado',
      user.id === 0
        ? 'El usuario ha sido creado con exito!'
        : 'El usuario ha sido actualizado con exito!',
      'success'
    );
    handleCloseForm();
  };

  const handleRemoveUser = (id) => {
    Swal.fire({
      title: 'Esta seguro que desea eliminar?',
      text: 'Cuidado el usuario será eliminado!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, eliminar!',
    }).then((result) => {
      if (result.isConfirmed) {
        dispatch({
          type: 'removeUser',
          payload: id,
        });
        Swal.fire({
          title: 'Usuario Eliminado!',
          text: 'Usuario eliminado con exito.',
          icon: 'success',
        });
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
  };

  return {
    users,
    userSelected,
    initialUserForm,
    visibleForm,
    handlerAddUser,
    handleRemoveUser,
    handleUserSelectedForm,
    handleOpenForm,
    handleCloseForm,
  };
};
