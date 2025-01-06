import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Layout from "./components/Layout";
import ProtectedRoute from "./components/ProtectedRoute";
import Home from "./pages/Home";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Settings from "./pages/Settings";
import Login from "./pages/Login";
import Skills from "./pages/Skills";
import Education from "./pages/Education";
import Experience from "./pages/Experience";
import Projects from "./pages/Projects";
import Categories from "./components/Categories";

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(
    Boolean(localStorage.getItem("isAuthenticated"))
  );

  const login = () => {
    setIsAuthenticated(true);
    localStorage.setItem("isAuthenticated", "true");
  };

  const logout = () => {
    setIsAuthenticated(false);
    localStorage.removeItem("isAuthenticated");
  };

  return (
    <Router>
      <Routes>
        {/* Public Routes */}
        <Route
          path="/login"
          element={
            isAuthenticated ? <Navigate to="/" replace /> : <Login login={login} />
          }
        />

        {/* Protected Routes */}
        <Route element={<Layout logout={logout} />}>
          <Route
            path="/"
            element={<ProtectedRoute isAuthenticated={isAuthenticated} element={<Home />} />}
          />
          <Route
            path="/about"
            element={<ProtectedRoute isAuthenticated={isAuthenticated} element={<About />} />}
          />
          <Route
            path="/contact"
            element={<ProtectedRoute isAuthenticated={isAuthenticated} element={<Contact />} />}
          />
          <Route
            path="/settings"
            element={<ProtectedRoute isAuthenticated={isAuthenticated} element={<Settings />} />}
          />
          <Route
            path="/skills"
            element={<ProtectedRoute isAuthenticated={isAuthenticated} element={<Skills/>} />}
          />
          <Route
            path="/education"
            element={<ProtectedRoute isAuthenticated={isAuthenticated} element={<Education/>} />}
          />
          <Route
            path="/experience"
            element={<ProtectedRoute isAuthenticated={isAuthenticated} element={<Experience/>} />}
          />
          <Route
            path="/projects"
            element={<ProtectedRoute isAuthenticated={isAuthenticated} element={<Projects/>} />}
          />
          <Route
            path="/categories"
            element={<ProtectedRoute isAuthenticated={isAuthenticated} element={<Categories/>} />}
          />
        </Route>

        {/* Catch-all Route for 404 */}
        <Route path="*" element={<div>404 - Page Not Found</div>} />
      </Routes>
    </Router>
  );
}

export default App;
