import React from "react";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <nav className="bg-blue-500 p-4">
      <ul className="flex space-x-4">
        <li>
          <Link to="/login" className="text-white">
            Login
          </Link>
        </li>
        <li>
          <Link to="/register" className="text-white">
            Register
          </Link>
        </li>
      </ul>
    </nav>
  );
};

export default Header;
