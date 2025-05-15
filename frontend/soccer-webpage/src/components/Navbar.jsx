import React from "react";
import { NavLink } from "react-router-dom";
const Navbar = () => {
  return (
    <nav className="bg-white dark:bg-gray-900 fixed w-full z-20 top-0 start-0 border-b border-gray-200 dark:border-gray-600">
      <div className="max-w-screen-xl mx-auto px-4 py-6 flex items-center flex-wrap justify-between">
        <div className="flex items-center">
          <div className="flex items-center space-x-3 rtl:space-x-reverse">
            <img
              src="/LaLiga.svg"
              className="h-8"
              alt="Flowbite Logo"
            />
            <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">
              LaLiga
            </span>
          </div>
        </div>

        <div className="flex-1 flex justify-center">
          <ul className="flex space-x-10 font-medium">
            <CustomLink to="/">Home</CustomLink>
            <CustomLink to="/nation">Nation</CustomLink>
            <CustomLink to="/position">Position</CustomLink>
            <CustomLink to="/search">Search</CustomLink>
          </ul>
        </div>
      </div>
    </nav>
  );
};

const CustomLink = ({ to, children }) => {
  return (
    <li>
      <NavLink
        to={to}
        className={({ isActive }) =>
          isActive
            ? "text-white bg-blue-700 block py-2 px-3 rounded-sm md:bg-transparent md:text-blue-700 md:p-0 md:dark:text-blue-500"
            : "block py-2 px-3 text-gray-900 rounded-sm hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 md:dark:hover:text-blue-500 dark:text-white dark:hover:bg-gray-700 md:dark:hover:bg-transparent"
        }
      >
        {children}
      </NavLink>
    </li>
  );
};

export default Navbar;
