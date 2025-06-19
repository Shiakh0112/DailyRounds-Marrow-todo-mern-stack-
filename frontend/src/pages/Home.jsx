import React from "react";
import { NavLink } from "react-router-dom";

const Home = () => (
  <div className="min-h-screen bg-gray-100">
    {/* Navbar */}
    <nav className="bg-blue-600 p-4 shadow-md">
      <div className="max-w-5xl mx-auto flex gap-6">
        <NavLink
          to="/"
          className={({ isActive }) =>
            `text-white font-semibold hover:underline ${
              isActive ? "underline" : ""
            }`
          }
        >
          Home
        </NavLink>
        <NavLink
          to="/todos"
          className={({ isActive }) =>
            `text-white font-semibold hover:underline ${
              isActive ? "underline" : ""
            }`
          }
        >
          Todo Dashboard
        </NavLink>
      </div>
    </nav>

    {/* Content */}
    <div className="max-w-4xl mx-auto px-6 py-12 text-center">
      <h1 className="text-3xl font-bold text-gray-800 mb-4">
        Welcome to the Todo Management App
      </h1>
      <p className="text-gray-600 text-lg">
        Use the navigation above to manage your todos.
      </p>
    </div>
  </div>
);

export default Home;
