import React from "react";
import { Link, useLocation } from "react-router-dom";
import { FaSignOutAlt } from "react-icons/fa";

const Navbar = ({ logout }) => {
  const location = useLocation(); // To track the current route

  return (
    <nav className="bg-blue-800 text-white p-4 shadow-lg">
      <div className="max-w-screen-xl mx-auto flex justify-between items-center">
        {/* Logo or title */}
        <div className="text-2xl font-semibold">
          <Link to="/" className="hover:text-gray-300">MyApp</Link>
        </div>

        {/* Links */}
        <ul className="hidden md:flex space-x-8">
          <li>
            <Link
              to="/"
              className={`hover:text-blue-300 ${
                location.pathname === "/" ? "text-blue-300 font-bold" : ""
              }`}
            >
              Home
            </Link>
          </li>
          <li>
            <Link
              to="/about"
              className={`hover:text-blue-300 ${
                location.pathname === "/about" ? "text-blue-300 font-bold" : ""
              }`}
            >
              About
            </Link>
          </li>
          
          <li>
            <Link
              to="/skills"
              className={`hover:text-blue-300 ${
                location.pathname === "/settings" ? "text-blue-300 font-bold" : ""
              }`}
            >
              Skills
            </Link>
          </li>
          <li>
            <Link
              to="/education"
              className={`hover:text-blue-300 ${
                location.pathname === "/education" ? "text-blue-300 font-bold" : ""
              }`}
            >
              Education
            </Link>
          </li>
          <li>
            <Link
              to="/experience"
              className={`hover:text-blue-300 ${
                location.pathname === "/experience" ? "text-blue-300 font-bold" : ""
              }`}
            >
              Experience
            </Link>
          </li>
          <li>
            <Link
              to="/projects"
              className={`hover:text-blue-300 ${
                location.pathname === "/projects" ? "text-blue-300 font-bold" : ""
              }`}
            >
              Projects
            </Link>
          </li>
          <li>
            <Link
              to="/contact"
              className={`hover:text-blue-300 ${
                location.pathname === "/contact" ? "text-blue-300 font-bold" : ""
              }`}
            >
              Contact
            </Link>
          </li>
          <li>
            <Link
              to="/settings"
              className={`hover:text-blue-300 ${
                location.pathname === "/settings" ? "text-blue-300 font-bold" : ""
              }`}
            >
              Settings
            </Link>
          </li>
        </ul>

        {/* Logout Button */}
        <button
          onClick={logout}
          className="bg-red-600 hover:bg-red-700 text-white py-2 px-4 rounded-lg flex items-center space-x-2 transition duration-200 transform hover:scale-105"
        >
          <FaSignOutAlt />
          <span>Logout</span>
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
