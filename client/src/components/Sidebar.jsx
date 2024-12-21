import React from "react";
import { Link } from "react-router-dom";

const Sidebar = () => {
  return (
    <aside
      className="fixed top-16 left-0 z-40 w-64 h-screen pt-4 bg-white border-r dark:bg-gray-800 dark:border-gray-700"
    >
      <ul className="space-y-4 px-4">
        <li>
          <Link
            to="/"
            className="block p-2 text-gray-700 rounded-lg hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-700"
          >
            Dashboard
          </Link>
        </li>
        <li>
          <Link
            to="/settings"
            className="block p-2 text-gray-700 rounded-lg hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-700"
          >
            Settings
          </Link>
        </li>
        
        
      </ul>
    </aside>
  );
};

export default Sidebar;
