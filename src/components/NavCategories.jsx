import React from "react";
import { NavLink } from "react-router-dom";

const NavCategories = () => {
  return (

   <nav className="navbar navbar-expand-lg navbar-dark bg-primary">
     <div className="container-fluid">
      <div className="collapse navbar-collapse" id="navbarColor01">
        <ul class="navbar-nav me-auto">
          <li class="nav-item">
            <NavLink className="nav-link" activeClassName="nav-link active" to ="/venue">Venues</NavLink>
          </li>
          <li class="nav-item">
           <NavLink className="nav-link" activeClassName="nav-link active" to ="/food-and-beverages">Food & Beverages</NavLink>
          </li>
          <li class="nav-item">
            <NavLink className="nav-link" activeClassName="nav-link active" to ="/music">Music</NavLink>
          </li>
          <li class="nav-item">
            <NavLink className="nav-link" activeClassName="nav-link active" to ="/entertainment">Entertainment</NavLink>
          </li>
          <li class="nav-item">
            <NavLink className="nav-link" activeClassName="nav-link active" to ="/decorations-and-favors">Decorations & Favors</NavLink>
          </li>
          <li class="nav-item">
            <NavLink className="nav-link" activeClassName="nav-link active" to ="/furniture">Furniture</NavLink>
          </li>
          <li class="nav-item">
            <NavLink className="nav-link" activeClassName="nav-link active" to ="/costumes">Costumes</NavLink>
          </li>
        </ul>
      </div>
     </div>
    </nav>
  )
}

export default NavCategories

      {/* <ul>
        <li>
          <NavLink activeClassName="active" to ="/venue">Venues</NavLink>
        </li>
        <li>
          <NavLink activeClassName="active" to ="/food-and-beverages">Food & Beverages</NavLink>
        </li>
        <li>
          <NavLink activeClassName="active" to ="/music">Music</NavLink>
        </li>
        <li>
          <NavLink activeClassName="active" to ="/entertainment">Entertainment</NavLink>
        </li>
        <li>
          <NavLink activeClassName="active" to ="/decorations-and-favors">Decorations & Favors</NavLink>
        </li>
        <li>
          <NavLink activeClassName="active" to ="/furniture">Furniture</NavLink>
        </li>
        <li>
          <NavLink activeClassName="active" to ="/costumes">Costumes</NavLink>
        </li>
      </ul> */}