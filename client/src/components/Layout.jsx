import React from "react";
import { Outlet } from "react-router-dom";
import Navbar from "./Navbar";
// import Sidebar from './Sidebar';

const Layout = ({ logout }) => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar logout={logout} />
      
      <main className="flex-grow container mx-auto p-4">
      {/* <Sidebar/> */}
        <Outlet />
      </main>
    </div>
  );
};

export default Layout;
