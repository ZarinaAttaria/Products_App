import React, { useState } from "react";
import "./App.css";
import Dropdown from "./Dropdown";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft, faArrowRight } from "@fortawesome/free-solid-svg-icons";
import "./Pagination.css";

function Pagination({
  totalProducts,
  productsPerPage,
  setProductsPerPage,
  page,
  setPage,
}) {
  const first = (page - 1) * productsPerPage + 1;
  const last = Math.min(page * productsPerPage, totalProducts);

  console.log(`Page: ${page}, Products Per Page: ${productsPerPage}`);
  console.log(`First: ${first}, Last: ${last}, Total: ${totalProducts}`);

  const handleNext = () => {
    setPage((prevPage) => prevPage + 1);
  };

  const handlePrevious = () => {
    setPage((prevPage) => Math.max(prevPage - 1, 1));
  };

  const handleProductsPerPage = async (products_per_page) => {
    const totalPages = Math.ceil(totalProducts / products_per_page);
    if (page > totalPages) {
      setPage(totalPages);
    }
    setProductsPerPage(products_per_page);
  };

  return (
    <div className="d-flex align-items-center m-3 justify-content-end">
      <Dropdown
        type="productsPerPage"
        productsPerPage={productsPerPage}
        handleAction={handleProductsPerPage}
      />
      <button
        onClick={handlePrevious}
        disabled={page === 1}
        className="pagination_button"
      >
        <FontAwesomeIcon className="arrowIcon" icon={faArrowLeft} />
      </button>

      <span>
        {first} - {last} of {totalProducts}
      </span>
      <button
        onClick={handleNext}
        disabled={productsPerPage * page >= totalProducts}
        className="pagination_button"
      >
        <FontAwesomeIcon className="arrowIcon" icon={faArrowRight} />
      </button>
    </div>
  );
}

export default Pagination;
