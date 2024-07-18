import React, { useState } from "react";
import "./App.css";

function SearchInput({ handleSearch }) {
  const [query, setQuery] = useState("");

  const handleChange = (e) => {
    setQuery(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    handleSearch(query);
  };
  return (
    <>
      <form className="d-flex" onSubmit={handleSubmit}>
        <input
          className="form-control me-2"
          type="search"
          value={query}
          onChange={handleChange}
          placeholder="Search"
          aria-label="Search"
        />
        <button className="btn btn-outline-success search_Btn" type="submit">
          Search
        </button>
      </form>
    </>
  );
}

export default SearchInput;
