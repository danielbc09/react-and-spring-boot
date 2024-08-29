import PropTypes from 'prop-types';
import { UserRow } from './UserRow';

// eslint-disable-next-line react/prop-types
export const UserList = ({
  users = [],
  handleRemoveUser,
  handleUserSelectedForm,
}) => {
  return (
    <>
      <table className="table table-hover table-striped">
        <thead>
          <tr>
            <th>#</th>
            <th>username</th>
            <th>email</th>
            <th>update</th>
            <th>remove</th>
          </tr>
        </thead>
        <tbody>
          {users.map(({ id, userName, email }) => (
            <UserRow
              key={id}
              id={id}
              userName={userName}
              email={email}
              handleRemoveUser={handleRemoveUser}
              handleUserSelectedForm={handleUserSelectedForm}
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
