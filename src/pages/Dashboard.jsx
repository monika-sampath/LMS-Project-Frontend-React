// Example of a component that maps over tutor data

import React, { useEffect, useState } from "react";
import TutorCard from "../components/TutorCard";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const [tutors, setTutors] = useState([]); // Initialize with an empty array
  const [loading, setLoading] = useState(true);
  const [studentProfile, setStudentProfile] = useState(null);
  const [isEditingProfile, setIsEditingProfile] = useState(false); // Flag to toggle editing mode
  const [updatedProfile, setUpdatedProfile] = useState({}); // State to hold updated profile data
  const [filteredTutors, setFilteredTutors] = useState([]); // Tutors after applying filters

  // Filter states
  const [search, setSearch] = useState("");
  const [subject, setSubject] = useState("");
  const [minRating, setMinRating] = useState(0);
  const [priceRange, setPriceRange] = useState([0, 100]);
  const [availability, setAvailability] = useState("");

  useEffect(() => {
    const fetchTutors = async () => {
      try {
        // Replace with your API call to fetch tutor data
        const response = await fetch("http://localhost:3000/api/tutors");
        const data = await response.json();
        setTutors(data); // Populate tutors state with the fetched data
      } catch (error) {
        console.error("Error fetching tutors:", error);
      } finally {
        setLoading(false);
      }
    };
    const fetchProfile = async () => {
      try {
        const response = await axios.get("http://localhost:3000/api/profile", {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        });
        setStudentProfile(response.data);
        setUpdatedProfile(response.data); // Initialize updatedProfile with current profile data
      } catch (error) {
        console.error("Error fetching profile:", error);
      }
    };
    fetchTutors();
    fetchProfile();
  }, []);
  const handleEditProfile = () => {
    setIsEditingProfile(!isEditingProfile);
  };

  const handleProfileChange = (e) => {
    const { name, value } = e.target;
    setUpdatedProfile((prevProfile) => ({
      ...prevProfile,
      [name]: value,
    }));
  };

  const handleProfileUpdate = async () => {
    try {
      const response = await axios.put(
        "http://localhost:3000/api/profile",
        updatedProfile,
        {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        }
      );
      setStudentProfile(response.data);
      setIsEditingProfile(false);
    } catch (error) {
      console.error("Error updating profile:", error);
    }
  };

  // Filter tutors based on search and filter criteria
  const filterTutors = () => {
    let updatedTutors = tutors;

    // Search filter (name or subject)
    if (search) {
      updatedTutors = updatedTutors.filter(
        (tutor) =>
          tutor.name.toLowerCase().includes(search.toLowerCase()) ||
          tutor.subjects.some((sub) =>
            sub.toLowerCase().includes(search.toLowerCase())
          )
      );
    }

    // Subject filter
    if (subject) {
      updatedTutors = updatedTutors.filter((tutor) =>
        tutor.subjects.includes(subject)
      );
    }

    // Rating filter
    if (minRating > 0) {
      updatedTutors = updatedTutors.filter(
        (tutor) => tutor.rating >= parseFloat(minRating)
      );
    }

    // Price range filter
    updatedTutors = updatedTutors.filter(
      (tutor) =>
        tutor.hourlyRate >= priceRange[0] && tutor.hourlyRate <= priceRange[1]
    );

    // Availability filter
    if (availability) {
      updatedTutors = updatedTutors.filter((tutor) =>
        tutor.availability.includes(availability)
      );
    }

    setFilteredTutors(updatedTutors);
  };

  // Handle form submission to apply filters
  const handleFilterSubmit = (e) => {
    e.preventDefault();
    filterTutors();
  };

  if (loading) {
    return <div>Loading...</div>; // Show a loading state while the data is being fetched
  }

  return (
    <div className="p-4">
      <div className="flex items-center space-x-4 mb-8">
        <img
          src="https://via.placeholder.com/100"
          alt="Profile Icon"
          className="w-16 h-16 rounded-full"
        />
        <div>
          <h1 className="text-2xl font-bold">{studentProfile?.name}</h1>
          <p className="text-gray-500">{studentProfile?.email}</p>
          <button
            onClick={handleEditProfile}
            className="mt-2 bg-blue-500 text-white px-4 py-2 rounded"
          >
            {isEditingProfile ? "Cancel" : "Edit Profile"}
          </button>
        </div>
      </div>
      {isEditingProfile && (
        <div className="bg-white p-4 rounded-lg shadow-md mb-8">
          <h2 className="text-xl font-semibold mb-4">Edit Profile</h2>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium">Name</label>
              <input
                type="text"
                name="name"
                value={updatedProfile.name || ""}
                onChange={handleProfileChange}
                className="w-full p-2 border border-gray-300 rounded"
              />
            </div>
            <div>
              <label className="block text-sm font-medium">Email</label>
              <input
                type="email"
                name="email"
                value={updatedProfile.email || ""}
                onChange={handleProfileChange}
                className="w-full p-2 border border-gray-300 rounded"
              />
            </div>
            <div>
              <label className="block text-sm font-medium">Preferences</label>
              <textarea
                name="preferences"
                value={updatedProfile.preferences || ""}
                onChange={handleProfileChange}
                className="w-full p-2 border border-gray-300 rounded"
              />
            </div>
            <button
              onClick={handleProfileUpdate}
              className="bg-green-500 text-white px-4 py-2 rounded mt-4"
            >
              Save Changes
            </button>
          </div>
        </div>
      )}
      <h1 className="text-2xl font-bold mb-4">Tutors</h1>

      {/* Filters Section */}
      <form onSubmit={handleFilterSubmit} className="filters mb-4">
        <div className="mb-2">
          <label>Search by Name/Subject:</label>
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="border p-2 w-full"
          />
        </div>
        <div className="mb-2">
          <label>Subject:</label>
          <input
            type="text"
            value={subject}
            onChange={(e) => setSubject(e.target.value)}
            placeholder="e.g., Math, Physics"
            className="border p-2 w-full"
          />
        </div>
        <div className="mb-2">
          <label>Minimum Rating:</label>
          <input
            type="number"
            value={minRating}
            onChange={(e) => setMinRating(e.target.value)}
            min="0"
            max="5"
            step="0.1"
            className="border p-2 w-full"
          />
        </div>
        <div className="mb-2">
          <label>Price Range:</label>
          <div className="flex space-x-2">
            <input
              type="number"
              value={priceRange[0]}
              onChange={(e) =>
                setPriceRange([Number(e.target.value), priceRange[1]])
              }
              placeholder="Min"
              className="border p-2 w-1/2"
            />
            <input
              type="number"
              value={priceRange[1]}
              onChange={(e) =>
                setPriceRange([priceRange[0], Number(e.target.value)])
              }
              placeholder="Max"
              className="border p-2 w-1/2"
            />
          </div>
        </div>
        <div className="mb-2">
          <label>Availability:</label>
          <select
            value={availability}
            onChange={(e) => setAvailability(e.target.value)}
            className="border p-2 w-full"
          >
            <option value="">All</option>
          </select>
        </div>
        <button type="submit" className="bg-blue-500 text-white px-4 py-2">
          Apply Filters
        </button>
      </form>

      {/* Tutors List */}

      <TutorCard tutors={filteredTutors} />
    </div>
  );
};

export default Dashboard;
