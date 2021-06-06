import React from "react";
import { NavLink } from "react-router-dom";

const NavCategories = () => {
  return (
    <nav>
      <ul className="d-flex justify-content-around">
        <li>
          <NavLink to ="/venue">Venues</NavLink>
        </li>
        <li>
          <NavLink to ="/food-and-beverages">Food & Beverages</NavLink>
        </li>
        <li>
          <NavLink to ="/music">Music</NavLink>
        </li>
        <li>
          <NavLink to ="/entertainment">Entertainment</NavLink>
        </li>
        <li>
          <NavLink to ="/decorations-and-favors">Decorations & Favors</NavLink>
        </li>
        <li>
          <NavLink to ="/furniture">Furniture</NavLink>
        </li>
        <li>
          <NavLink to ="/costumes">Costumes</NavLink>
        </li>
      </ul>
    </nav>
  )
}

export default NavCategories
