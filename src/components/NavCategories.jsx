import React from "react";
import { NavLink } from "react-router-dom";

const NavCategories = () => {
  return (

   <nav className="navbar navbar-expand-lg navbar-dark bg-primary">
     <div className="container-fluid">
      <div className="collapse navbar-collapse" id="navbarColor01">
        <ul className="navbar-nav me-auto">
          <div className="d-flex justify-content-evenly"></div>
          <li className="nav-item">
            <NavLink className="nav-link" activeClassName="nav-link active" to ="/venue">Venues</NavLink>
          </li>
          <li className="nav-item">
           <NavLink className="nav-link" activeClassName="nav-link active" to ="/food-and-beverages">Food & Beverages</NavLink>
          </li>
          <li className="nav-item">
            <NavLink className="nav-link" activeClassName="nav-link active" to ="/music">Music</NavLink>
          </li>
          <li className="nav-item">
            <NavLink className="nav-link" activeClassName="nav-link active" to ="/entertainment">Entertainment</NavLink>
          </li>
          <li className="nav-item">
            <NavLink className="nav-link" activeClassName="nav-link active" to ="/decorations-and-favors">Decorations & Favors</NavLink>
          </li>
          <li className="nav-item">
            <NavLink className="nav-link" activeClassName="nav-link active" to ="/furniture">Furniture</NavLink>
          </li>
          {/* <li className="nav-item">
            <NavLink className="nav-link" activeClassName="nav-link active" to ="/costumes">Costumes</NavLink>
          </li> */}
        </ul>
      </div>
     </div>
    </nav>
  )
}

export default NavCategories
