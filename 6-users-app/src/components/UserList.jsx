import PropTypes from 'prop-types';
import { UserRow } from './UserRow';
import { useContext } from 'react';
import { UserContext } from '../context/UserContext';
import { AuthContext } from '../auth/context/AuthContext';
// eslint-disable-next-line react/prop-types
export const UserList = () => {
  const { users = [] } = useContext(UserContext);
  const { login } = useContext(AuthContext);
  return (
    <>
      <table className="table table-hover table-striped">
        <thead>
          <tr>
            <th>#</th>
            <th>username</th>
            <th>email</th>
            {!login.isAdmin || (
              <>
                <th>update</th>
                <th>update UserRoutes</th>
                <th>remove</th>
              </>
            )}
          </tr>
        </thead>
        <tbody>
          {users.map(({ id, username, email, admin }) => (
            <UserRow
              key={id}
              id={id}
              username={username}
              email={email}
              admin={admin}
            />
          ))}
        </tbody>
      </table>
    </>
  );
};

UserList.propTypes = {
  users: PropTypes.array,
};
