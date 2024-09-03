import { useContext } from 'react';
import { UserForm } from './UserForm';
import { UserContext } from '../context/UserContext';

// eslint-disable-next-line react/prop-types
export const UserModalForm = () => {
  const { userSelected, handleCloseForm } = useContext(UserContext);
  return (
    <div className="abrir-modal animacion fadeIn">
      <div className="modal" style={{ display: 'block' }} tabIndex="-1">
        <div className="modal-dialog" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">
                {
                  // eslint-disable-next-line react/prop-types
                  userSelected.id > 0 ? 'Editar' : 'Crear'
                }
                Modal Ususarios
              </h5>
            </div>
            <div className="modal-body">
              <UserForm
                userSelected={userSelected}
                handleCloseForm={handleCloseForm}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
