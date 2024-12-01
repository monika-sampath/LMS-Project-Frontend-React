// // src/pages/Register.jsx

// import React, { useState } from "react";
// import { useNavigate } from "react-router-dom"; // Use useNavigate instead of useHistory
// import axios from "../axios";

// const Register = () => {
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [confirmPassword, setConfirmPassword] = useState("");
//   const [error, setError] = useState("");
//   const navigate = useNavigate(); // Using useNavigate here
//   const handleRegister = async (e) => {
//     e.preventDefault();

//     if (password !== confirmPassword) {
//       setError("Passwords do not match");
//       return;
//     }

//     try {
//       const response = await axios.post("/auth/register", { email, password });
//       // On successful registration, navigate to the login page
//       navigate("/login");
//     } catch (err) {
//       setError("Failed to register");
//     }
//   };

//   return (
//     <div className="max-w-sm mx-auto p-4">
//       <h1 className="text-2xl font-bold mb-4">Register</h1>
//       {error && <p className="text-red-500">{error}</p>}
//       <form onSubmit={handleRegister}>
//         <input
//           type="email"
//           placeholder="Email"
//           className="p-2 mb-2 border w-full"
//           value={email}
//           onChange={(e) => setEmail(e.target.value)}
//         />
//         <input
//           type="password"
//           placeholder="Password"
//           className="p-2 mb-2 border w-full"
//           value={password}
//           onChange={(e) => setPassword(e.target.value)}
//         />
//         <input
//           type="password"
//           placeholder="Confirm Password"
//           className="p-2 mb-2 border w-full"
//           value={confirmPassword}
//           onChange={(e) => setConfirmPassword(e.target.value)}
//         />
//         <button
//           type="submit"
//           className="bg-blue-500 text-white p-2 rounded w-full"
//         >
//           Register
//         </button>
//       </form>
//     </div>
//   );
// };

// export default Register;

import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    role: "student",
    profile: {
      name: "",
      bio: "",
      preferences: [],
    },
  });
  const [preferencesInput, setPreferencesInput] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name.startsWith("profile.")) {
      const profileField = name.split(".")[1];
      setFormData((prevData) => ({
        ...prevData,
        profile: {
          ...prevData.profile,
          [profileField]: value,
        },
      }));
    } else {
      setFormData((prevData) => ({
        ...prevData,
        [name]: value,
      }));
    }
  };

  const handleAddPreference = () => {
    if (preferencesInput.trim()) {
      setFormData((prevData) => ({
        ...prevData,
        profile: {
          ...prevData.profile,
          preferences: [...prevData.profile.preferences, preferencesInput],
        },
      }));
      setPreferencesInput("");
    }
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:3000/api/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      if (response.ok) {
        alert("Registration successful! Redirecting to login...");
        navigate("/login");
      } else {
        const errorData = await response.json();
        alert(`Registration failed: ${errorData.message}`);
      }
    } catch (error) {
      console.error("Error during registration:", error);
      alert("An error occurred. Please try again.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <form
        onSubmit={handleRegister}
        className="w-full max-w-lg bg-white shadow-md rounded-lg p-6"
      >
        <h1 className="text-2xl font-bold mb-6 text-center">Register</h1>

        {/* Username */}
        <div className="mb-4">
          <label htmlFor="username" className="block text-gray-700 font-medium">
            Username
          </label>
          <input
            type="text"
            id="username"
            name="username"
            value={formData.username}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Email */}
        <div className="mb-4">
          <label htmlFor="email" className="block text-gray-700 font-medium">
            Email
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Password */}
        <div className="mb-4">
          <label htmlFor="password" className="block text-gray-700 font-medium">
            Password
          </label>
          <input
            type="password"
            id="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Role */}
        <div className="mb-4">
          <label htmlFor="role" className="block text-gray-700 font-medium">
            Role
          </label>
          <select
            id="role"
            name="role"
            value={formData.role}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="student">Student</option>
            <option value="tutor">Tutor</option>
          </select>
        </div>

        {/* Profile Name */}
        <div className="mb-4">
          <label
            htmlFor="profile.name"
            className="block text-gray-700 font-medium"
          >
            Profile Name
          </label>
          <input
            type="text"
            id="profile.name"
            name="profile.name"
            value={formData.profile.name}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Bio */}
        <div className="mb-4">
          <label
            htmlFor="profile.bio"
            className="block text-gray-700 font-medium"
          >
            Bio
          </label>
          <textarea
            id="profile.bio"
            name="profile.bio"
            value={formData.profile.bio}
            onChange={handleChange}
            rows="3"
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          ></textarea>
        </div>

        {/* Preferences */}
        <div className="mb-4">
          <label
            htmlFor="preferences"
            className="block text-gray-700 font-medium"
          >
            Preferences
          </label>
          <div className="flex items-center space-x-2 mb-2">
            <input
              type="text"
              id="preferences"
              value={preferencesInput}
              onChange={(e) => setPreferencesInput(e.target.value)}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <button
              type="button"
              onClick={handleAddPreference}
              className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600"
            >
              Add
            </button>
          </div>
          <div className="space-x-2">
            {formData.profile.preferences.map((pref, index) => (
              <span
                key={index}
                className="inline-block bg-gray-200 text-gray-700 px-3 py-1 rounded-full text-sm"
              >
                {pref}
              </span>
            ))}
          </div>
        </div>

        {/* Submit */}
        <button
          type="submit"
          className="w-full bg-blue-500 text-white py-2 rounded-lg font-semibold hover:bg-blue-600"
        >
          Register
        </button>
      </form>
    </div>
  );
};

export default Register;
