import PropTypes from 'prop-types';
import { UserRow } from './UserRow';
import { useContext } from 'react';
import { UserContext } from '../context/UserContext';

// eslint-disable-next-line react/prop-types
export const UserList = () => {
  const { users = [] } = useContext(UserContext);
  return (
    <>
      <table className="table table-hover table-striped">
        <thead>
          <tr>
            <th>#</th>
            <th>username</th>
            <th>email</th>
            <th>update</th>
            <th>update UserRoutes</th>
            <th>remove</th>
          </tr>
        </thead>
        <tbody>
          {users.map(({ id, userName, email }) => (
            <UserRow key={id} id={id} userName={userName} email={email} />
          ))}
        </tbody>
      </table>
    </>
  );
};

UserList.propTypes = {
  users: PropTypes.array,
};
