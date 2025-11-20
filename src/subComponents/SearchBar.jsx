import React, { useState, useEffect } from "react";
import SearchResults from "./SearchResults";

const SearchBar = ({ onAddGame }) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);

  useEffect(() => {
    if (!searchQuery) {
      setSearchResults([]);
      return;
    }

    const fetchResults = async () => {
      try {
        const res = await fetch(
          `/games/rawg?search=${encodeURIComponent(searchQuery)}`
        );

        // Check if the response is JSON
        if (!res.ok) {
          throw new Error(`HTTP error! Status: ${res.status}`);
        }

        const data = await res.json();
        setSearchResults(data);
      } catch (err) {
        console.error("Error fetching search results:", err);
      }
    };


    fetchResults();
  }, [searchQuery]);

  return (
    <div className="w-full relative">
      <input
        type="text"
        placeholder="Search and add games..."
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        className="w-full bg-black/60 border border-cyan-600 rounded-lg px-4 py-2 text-cyan-200 focus:outline-none focus:ring-2 focus:ring-cyan-400 transition placeholder-cyan-400"
      />

      {searchResults.length > 0 && (
        <div className="absolute top-full mt-2 w-full z-50">
          <SearchResults results={searchResults} onAddGame={onAddGame} />
        </div>
      )}
    </div>
  );
};

export default SearchBar;
