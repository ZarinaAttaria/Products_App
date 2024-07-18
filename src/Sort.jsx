import React from "react";
import "./App.css";
import "./Sort.css";
function Sort({ setSort, setSortOrder }) {
  return (
    <>
      <img
        src="sort.png"
        className="sortIcon"
        data-bs-toggle="offcanvas"
        data-bs-target="#offcanvasSort"
        aria-controls="offcanvasSort"
      />
      <div
        className="offcanvas offcanvas-end"
        tabIndex="-1"
        id="offcanvasSort"
        aria-labelledby="offcanvasSortLabel"
      >
        <div className="offcanvas-header">
          <h5 className="offcanvas-title" id="offcanvasSortLabel">
            SORT BY:
          </h5>
          <button
            type="button"
            className="btn-close"
            data-bs-dismiss="offcanvas"
            aria-label="Close"
          ></button>
        </div>
        <div className="offcanvas-body">
          <div className="form-check">
            <input
              className="form-check-input"
              type="radio"
              name="flexRadioDefault"
              id="flexRadioDefault1"
              onClick={() => setSort("price")}
            />
            <label className="form-check-label" htmlFor="flexRadioDefault1">
              Price
            </label>
          </div>
          <div className="form-check">
            <input
              className="form-check-input"
              type="radio"
              name="flexRadioDefault"
              id="flexRadioDefault2"
              onClick={() => setSort("title")}
            />
            <label className="form-check-label" htmlFor="flexRadioDefault2">
              Alphabetically
            </label>
          </div>

          <button className="sort-button" onClick={() => setSortOrder("asc")}>
            Ascending
          </button>
          <button className="sort-button" onClick={() => setSortOrder("desc")}>
            Descending
          </button>
        </div>
      </div>
    </>
  );
}

export default Sort;
