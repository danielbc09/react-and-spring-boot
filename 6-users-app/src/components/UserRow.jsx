import { useContext } from 'react';
import { NavLink } from 'react-router-dom';
import { UserContext } from '../context/UserContext';
import { AuthContext } from '../auth/context/AuthContext';

// eslint-disable-next-line react/prop-types
export const UserRow = ({ id, username, email, admin }) => {
  const { handleRemoveUser, handleUserSelectedForm } = useContext(UserContext);
  const { login } = useContext(AuthContext);

  return (
    <tr key={id}>
      <td>{id}</td>
      <td>{username}</td>
      <td>{email}</td>
      {!login.isAdmin || (
        <>
          <td>
            <button
              type="button"
              className="btn btn-secondary btn-sm"
              onClick={() =>
                handleUserSelectedForm({
                  id,
                  username,
                  email,
                  admin,
                })
              }
            >
              Update
            </button>
          </td>
          <td>
            <NavLink
              className={'btn btn-secondary btn-sm'}
              to={'/users/edit/' + id}
            >
              Update route
            </NavLink>
          </td>
          <td>
            <button
              type="button"
              className="btn btn-danger btn-sm"
              onClick={() => handleRemoveUser(id)}
            >
              remove
            </button>
          </td>
        </>
      )}
    </tr>
  );
};
