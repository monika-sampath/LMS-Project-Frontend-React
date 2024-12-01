// src/App.jsx

import React from "react";
import { Routes, Route, Navigate } from "react-router-dom"; // Import Navigate component for redirection
import Header from "./components/Header"; // Import the Header component
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";

const App = () => {
  return (
    <>
      <Header />

      <div className="container mx-auto p-4">
        <Routes>
          <Route path="/" element={<Navigate to="/login" />} />{" "}
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="*" element={<h1>404 Page Not Found</h1>} />
        </Routes>
      </div>
    </>
  );
};

export default App;
