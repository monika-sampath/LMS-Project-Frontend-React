import React, { useState } from "react";

const SearchBar = ({ onSearch }) => {
  const [subject, setSubject] = useState("");
  const [rating, setRating] = useState("");
  const [price, setPrice] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    onSearch({ subject, rating, price });
  };

  return (
    <form onSubmit={handleSubmit} className="space-x-4 p-4">
      <input
        type="text"
        placeholder="Subject"
        value={subject}
        onChange={(e) => setSubject(e.target.value)}
        className="p-2 border rounded"
      />
      <input
        type="number"
        placeholder="Min Rating"
        value={rating}
        onChange={(e) => setRating(e.target.value)}
        className="p-2 border rounded"
      />
      <input
        type="number"
        placeholder="Max Price"
        value={price}
        onChange={(e) => setPrice(e.target.value)}
        className="p-2 border rounded"
      />
      <button type="submit" className="bg-blue-500 text-white p-2 rounded">
        Search
      </button>
    </form>
  );
};

export default SearchBar;
