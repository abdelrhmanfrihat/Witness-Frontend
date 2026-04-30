import React, { useState } from "react";
import "../Style/componants/pagination.css";
function MyPagination({ currentPage, totalPages, onPageChange }) {
  const WINDOW_SIZE = 3;

  let windowStart = currentPage;

  if (currentPage + WINDOW_SIZE - 1 > totalPages) {
    windowStart = totalPages - WINDOW_SIZE + 1;
  }

  if (windowStart < 1) {
    windowStart = 1;
  }

  const pages = [];
  let p = windowStart;

  while (p <= totalPages && p < windowStart + WINDOW_SIZE) {
    pages.push(p);
    p++;
  }

  function prev() {
    if (currentPage > 1) {
      onPageChange(currentPage - 1);
    }
  }

  function next() {
    if (currentPage < totalPages) {
      onPageChange(currentPage + 1);
    }
  }

  return (
    <div className="pagination">
      <button onClick={prev} disabled={currentPage === 1}>
        السابق
      </button>

      {pages.map((num) => {
        let className = "";

        if (num === currentPage) {
          className = "active";
        }

        return (
          <button
            key={num}
            className={className}
            onClick={() => onPageChange(num)}
          >
            {num}
          </button>
        );
      })}

      <button onClick={next} disabled={currentPage === totalPages}>
        التالي
      </button>
    </div>
  );
}

export default MyPagination;
