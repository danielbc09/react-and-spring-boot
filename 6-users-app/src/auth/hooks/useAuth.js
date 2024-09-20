import { loginReducer } from './../pages/reducers/loginReducer';
import { useReducer } from 'react';
import { loginUser } from '../services/authService';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';

const initialLogin = JSON.parse(sessionStorage.getItem('login')) || {
  isAuth: false,
  user: undefined,
  isAdmin: false,
};
export const useAuth = () => {
  const [login, dispatch] = useReducer(loginReducer, initialLogin);
  const navigate = useNavigate();

  const handlerLogin = async ({ username, password }) => {
    try {
      const response = await loginUser({ username, password });
      const token = response.data.token;
      const claims = JSON.parse(window.atob(token.split('.')[1]));
      console.log('claims', claims);
      const user = { username: claims.username };
      dispatch({
        type: 'login',
        payload: { user, isAdmin: claims.isAdmin },
      });
      sessionStorage.setItem(
        'login',
        JSON.stringify({ isAuth: true, user, isAdmin: claims.isAdmin })
      );
      sessionStorage.setItem('token', `Bearer ${token}`);
      navigate('/users');
    } catch (error) {
      if (error.response?.status === 401) {
        Swal.fire('Error Login', 'Username o password invalidos', 'error');
      } else if (error.response?.status == 403) {
        Swal.fire(
          'Error Login',
          'No tiene acceso al recurso o permisos!',
          'error'
        );
      } else {
        throw error;
      }
    }
  };

  const handlerLogOut = () => {
    dispatch({
      type: 'logout',
    });
    sessionStorage.removeItem('login');
    sessionStorage.removeItem('token');
    sessionStorage.clear();
  };

  return {
    login,
    handlerLogin,
    handlerLogOut,
  };
};
