import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";

const Login = ({ login }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isPasswordVisible, setIsPasswordVisible] = useState(false); // Password visibility toggle
  const navigate = useNavigate();

  // Email validation
  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Client-side validation
    if (!email || !password) {
      setError("Please fill in all fields.");
      return;
    }
    if (!validateEmail(email)) {
      setError("Please enter a valid email address.");
      return;
    }

    setIsLoading(true);
    try {
      // API Call for login
      const response = await axios.post(
        `${import.meta.env.VITE_API_BASE_URL}/auth/login`,
        { email, password },
        { withCredentials: true }
      );

      // Store JWT in cookies and update auth state
      const { token } = response.data;
      Cookies.set("authToken", token, { expires: 7, secure: true, sameSite: "Strict" });

      setError(null); // Clear errors
      login(); // Update authentication state
      navigate("/"); // Redirect to dashboard
    } catch (err) {
      setError(err.response?.data?.message || "Login failed. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center w-full max-w-md mx-auto p-8 bg-white rounded-2xl shadow-xl">
      {/* Header */}
      <div className="flex items-center gap-3 pb-6">
        <img src="/favicon.svg" alt="Logo" width="50" />
        <h1 className="text-3xl font-bold text-gray-700">Admin Dashboard</h1>
      </div>

      {/* Login Form */}
      <form onSubmit={handleSubmit} className="flex flex-col w-full">
        {/* Email Field */}
        <FormField
          label="Email"
          type="email"
          id="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="name@company.com"
          icon="mail"
        />

        {/* Password Field */}
        <FormField
          label="Password"
          type={isPasswordVisible ? "text" : "password"}
          id="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="••••••••••"
          icon="password"
          togglePassword={() => setIsPasswordVisible((prev) => !prev)}
          isPasswordVisible={isPasswordVisible}
        />

        {/* Error Message */}
        {error && <div className="text-red-500 text-sm mb-4">{error}</div>}

        {/* Login Button */}
        <button
          type="submit"
          disabled={isLoading}
          className={`w-full text-white ${
            isLoading ? "bg-gray-400" : "bg-indigo-600"
          } focus:ring-4 focus:outline-none font-medium rounded-lg text-sm px-5 py-2.5 text-center mb-6`}
        >
          {isLoading ? "Logging in..." : "Login"}
        </button>
      </form>
    </div>
  );
};

// FormField Component for Input Fields
const FormField = ({ label, type, id, value, onChange, placeholder, icon, togglePassword, isPasswordVisible }) => {
  const icons = {
    mail: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="lucide lucide-mail"
      >
        <rect width="20" height="16" x="2" y="4" rx="2"></rect>
        <path d="M22 7L13.03 12.7a1.94 1.94 0 0 1-2.06 0L2 7"></path>
      </svg>
    ),
    password: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="lucide lucide-square-asterisk"
      >
        <rect width="18" height="18" x="3" y="3" rx="2"></rect>
        <path d="M12 8v8"></path>
        <path d="M8.5 14l7-4"></path>
        <path d="M8.5 10l7 4"></path>
      </svg>
    ),
  };

  return (
    <div className="pb-4">
      <label htmlFor={id} className="block mb-2 text-sm font-medium text-gray-800">
        {label}
      </label>
      <div className="relative text-gray-400">
        <span className="absolute inset-y-0 left-0 flex items-center p-3">{icons[icon]}</span>
        <input
          type={type}
          id={id}
          value={value}
          onChange={onChange}
          className="pl-12 bg-gray-50 text-gray-600 border border-gray-300 rounded-lg focus:ring-1 focus:ring-indigo-500 block w-full p-2.5"
          placeholder={placeholder}
          autoComplete={type === "password" ? "new-password" : "off"}
        />
        {togglePassword && (
          <button
            type="button"
            onClick={togglePassword}
            className="absolute inset-y-0 right-0 flex items-center p-3"
          >
            {isPasswordVisible ? "Hide" : "Show"}
          </button>
        )}
      </div>
    </div>
  );
};

export default Login;
