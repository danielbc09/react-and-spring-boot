import { AuthContext } from './AuthContext';
import { useAuth } from '../hooks/useAuth';

// eslint-disable-next-line react/prop-types
export const AuthProvider = ({ children }) => {
  const { login, handlerLogin, handlerLogOut } = useAuth();

  return (
    <AuthContext.Provider value={{ login, handlerLogin, handlerLogOut }}>
      {children}
    </AuthContext.Provider>
  );
};
