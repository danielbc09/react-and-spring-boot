import { loginReducer } from './../pages/reducers/loginReducer';
import { useReducer } from 'react';
import { loginUser } from '../services/authService';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';

const initialLogin = JSON.parse(sessionStorage.getItem('login')) || {
  isAuth: false,
  user: undefined,
};
export const useAuth = () => {
  const [login, dispatch] = useReducer(loginReducer, initialLogin);
  const navigate = useNavigate();

  const handlerLogin = ({ username, password }) => {
    const isLogin = loginUser({ username, password });
    if (isLogin) {
      const user = { username: 'admin' };
      dispatch({
        type: 'login',
        payload: user,
      });
      sessionStorage.setItem('login', JSON.stringify({ isAuth: true, user }));
      navigate('/users');
    } else {
      Swal.fire('Error Login', 'Username o password invalidos', 'error');
    }
  };

  const handlerLogOut = () => {
    dispatch({
      type: 'logout',
    });
    sessionStorage.removeItem('login');
  };

  return {
    login,
    handlerLogin,
    handlerLogOut,
  };
};
