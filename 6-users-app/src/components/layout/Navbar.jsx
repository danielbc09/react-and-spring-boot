import React from 'react';

// eslint-disable-next-line react/prop-types
export const Navbar = ({ login, handlerLogOut }) => {
  return (
    <nav className="navbar navbar-expand-lg bg-body-tertiary">
      <div className="container-fluid">
        <a className="navbar-brand" href="#">
          UsersApp
        </a>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div
          className="collapse navbar-collapse justify-content-end"
          id="navbarSupportedContent"
        >
          <span className="nav-item nav-link text-primary mx-3">
            {login.user?.username}
          </span>
          <button className="btn btn-outline-success" onClick={handlerLogOut}>
            Log out
          </button>
        </div>
      </div>
    </nav>
  );
};
