import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { FaSignOutAlt, FaBars, FaTimes } from "react-icons/fa";

const Navbar = ({ logout }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false); // To manage sidebar state
  const location = useLocation(); // To track the current route

  // Helper function for active link styling
  const isActive = (path) =>
    location.pathname === path ? "text-blue-300 font-bold" : "";

  return (
    <>
      {/* Top Navbar */}
      <nav className="bg-blue-800 text-white p-4 shadow-lg">
        <div className="max-w-screen-xl mx-auto flex justify-between items-center">
          {/* Logo */}
          <div className="text-2xl font-semibold">
            <Link to="/" className="hover:text-gray-300">
              MyApp
            </Link>
          </div>

          {/* Hamburger Button for Sidebar */}
          <button
            className="md:hidden text-white text-2xl"
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
          >
            {isSidebarOpen ? <FaTimes /> : <FaBars />}
          </button>

          {/* Navigation Links (Desktop View) */}
          <ul className="hidden md:flex space-x-8">
            <li>
              <Link to="/" className={`hover:text-blue-300 ${isActive("/")}`}>
                Home
              </Link>
            </li>
            <li>
              <Link
                to="/about"
                className={`hover:text-blue-300 ${isActive("/about")}`}
              >
                About
              </Link>
            </li>
            <li>
              <Link
                to="/skills"
                className={`hover:text-blue-300 ${isActive("/skills")}`}
              >
                Skills
              </Link>
            </li>
            <li>
              <Link
                to="/education"
                className={`hover:text-blue-300 ${isActive("/education")}`}
              >
                Education
              </Link>
            </li>
            <li>
              <Link
                to="/experience"
                className={`hover:text-blue-300 ${isActive("/experience")}`}
              >
                Experience
              </Link>
            </li>
            <li>
              <Link
                to="/projects"
                className={`hover:text-blue-300 ${isActive("/projects")}`}
              >
                Projects
              </Link>
            </li>
            <li>
              <Link
                to="/contact"
                className={`hover:text-blue-300 ${isActive("/contact")}`}
              >
                Contact
              </Link>
            </li>
            <li>
              <Link
                to="/settings"
                className={`hover:text-blue-300 ${isActive("/settings")}`}
              >
                Settings
              </Link>
            </li>
          </ul>

          {/* Logout Button */}
          <button
            onClick={logout}
            className="hidden md:flex bg-red-600 hover:bg-red-700 text-white py-2 px-4 rounded-lg items-center space-x-2 transition duration-200 transform hover:scale-105"
          >
            <FaSignOutAlt />
            <span>Logout</span>
          </button>
        </div>
      </nav>

      {/* Sidebar for Mobile View */}
      <div
        className={`fixed inset-y-0 left-0 z-50 bg-blue-900 text-white transform ${
          isSidebarOpen ? "translate-x-0" : "-translate-x-full"
        } transition-transform duration-300 md:hidden w-[40%]`}
      >
        <div className="p-4">
          {/* Close Button */}
          <button
            className="text-2xl text-white mb-4"
            onClick={() => setIsSidebarOpen(false)}
          >
            <FaTimes />
          </button>

          {/* Sidebar Links */}
          <ul className="space-y-4">
            <li>
              <Link
                to="/"
                className={`block hover:text-blue-300 ${isActive("/")}`}
                onClick={() => setIsSidebarOpen(false)}
              >
                Home
              </Link>
            </li>
            <li>
              <Link
                to="/about"
                className={`block hover:text-blue-300 ${isActive("/about")}`}
                onClick={() => setIsSidebarOpen(false)}
              >
                About
              </Link>
            </li>
            <li>
              <Link
                to="/skills"
                className={`block hover:text-blue-300 ${isActive("/skills")}`}
                onClick={() => setIsSidebarOpen(false)}
              >
                Skills
              </Link>
            </li>
            <li>
              <Link
                to="/education"
                className={`block hover:text-blue-300 ${isActive("/education")}`}
                onClick={() => setIsSidebarOpen(false)}
              >
                Education
              </Link>
            </li>
            <li>
              <Link
                to="/experience"
                className={`block hover:text-blue-300 ${isActive("/experience")}`}
                onClick={() => setIsSidebarOpen(false)}
              >
                Experience
              </Link>
            </li>
            <li>
              <Link
                to="/projects"
                className={`block hover:text-blue-300 ${isActive("/projects")}`}
                onClick={() => setIsSidebarOpen(false)}
              >
                Projects
              </Link>
            </li>
            <li>
              <Link
                to="/contact"
                className={`block hover:text-blue-300 ${isActive("/contact")}`}
                onClick={() => setIsSidebarOpen(false)}
              >
                Contact
              </Link>
            </li>
            <li>
              <Link
                to="/settings"
                className={`block hover:text-blue-300 ${isActive("/settings")}`}
                onClick={() => setIsSidebarOpen(false)}
              >
                Settings
              </Link>
            </li>
          </ul>

          {/* Logout Button */}
          <button
            onClick={logout}
            className="mt-6 w-full bg-red-600 hover:bg-red-700 text-white py-2 px-4 rounded-lg flex items-center justify-center transition duration-200 transform hover:scale-105"
          >
            <FaSignOutAlt />
            <span>Logout</span>
          </button>
        </div>
      </div>
    </>
  );
};

export default Navbar;
