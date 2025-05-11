import React from "react";
import { NavLink } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="container-fluid p-0">
        <ul className="nav w-100">
          <CustomLink to="/">Home</CustomLink>
          <CustomLink to="/nation">Nation</CustomLink>
          <CustomLink to="/position">Position</CustomLink>
          <CustomLink to="/search">Search</CustomLink>
        </ul>
      </div>
    </nav>
  );
};

const CustomLink = ({ to, children }) => {
  return (
    <li className="nav-item flex-fill text-center">
      <NavLink to={to} className="nav-link py-4">
        {children}
      </NavLink>
    </li>
  );
};

export default Navbar;
