import React from "react";
import { NavLink } from "react-router-dom";
import { withUser } from "../components/Auth/withUser";
import apiHandler from "../api/apiHandler";

const NavMain = (props) => {
  const { context } = props;

  function handleLogout() {
    apiHandler
      .logout()
      .then(() => {
        context.removeUser();
      })
      .catch((error) => {
        console.log(error);
      });
  }

  return (

    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <div className="container-fluid">
        <NavLink className="navbar-brand" exact to="/">FiestApp</NavLink>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarColor03" aria-controls="navbarColor03" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarColor02">
          <ul className="navbar-nav me-auto">
            {context.isLoggedIn && (
              <React.Fragment>
                <li className="nav-item">
                  <NavLink className="nav-link" to="/profile">
                    Your Profile
                  </NavLink>
                </li>
                  <li className="nav-item">
                <NavLink className="nav-link" to="/logout">
                    <p onClick={handleLogout}>Logout</p>
                </NavLink>
                  </li>

              </React.Fragment>
            )}
            {!context.isLoggedIn && (
              <React.Fragment>
                <li className="nav-item">
                  <NavLink className="nav-link" to="/signin">Log in</NavLink>
                </li>
                <li className="nav-item">
                  <NavLink className="nav-link" to="/signup">Create account</NavLink>
                </li>
              </React.Fragment>
            )}
          </ul>
        </div>

      </div>

    </nav>

  );
};

export default withUser(NavMain);
