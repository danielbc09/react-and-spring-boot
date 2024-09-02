import { NavLink } from 'react-router-dom';

// eslint-disable-next-line react/prop-types
export const UserRow = ({
  id,
  userName,
  email,
  handleRemoveUser,
  handleUserSelectedForm,
}) => {
  return (
    <tr key={id}>
      <td>{id}</td>
      <td>{userName}</td>
      <td>{email}</td>
      <td>
        <button
          type="button"
          className="btn btn-secondary btn-sm"
          onClick={() =>
            handleUserSelectedForm({
              id,
              userName,
              email,
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
    </tr>
  );
};
