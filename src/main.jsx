// src/index.js (or main.js)
import { createRoot } from "react-dom/client";
import "./index.css";
import React from "react";
import ReactDOM from "react-dom/client"; // Updated for React 18
import App from "./App";
import { BrowserRouter } from "react-router-dom"; // Import BrowserRouter from react-router-dom

const root = ReactDOM.createRoot(document.getElementById("root")); // Updated for React 18

root.render(
  <BrowserRouter>
    <App />
  </BrowserRouter>
);
