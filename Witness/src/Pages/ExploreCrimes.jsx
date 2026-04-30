import React, { useState } from "react";
import {Link} from "react-router-dom"
import CrimesFilter from "../Componants/CrimesFilter";
import MyPagination from "../Componants/Pagination";
import "../Style/pages/ExploreCrimes.css";
import Layout from "../Componants/Layout";
import "bootstrap-icons/font/bootstrap-icons.css";
import CrimeDeatails from "./CrimeDetails";

function ExploreCrimes({crimes}) {
  const ItemPerPage = 9;
  const [location, setLocation] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  let filteredCrimes = crimes;

  if (location !== "") {
    filteredCrimes = filteredCrimes.filter(
      (crime) => crime.location === location
    );
  }

  if (startDate !== "" && endDate !== "") {
    filteredCrimes = filteredCrimes.filter(
      (crimes) => crimes.date >= startDate && crimes.date <= endDate
    );
  }

  const totalPages = Math.ceil(filteredCrimes.length / ItemPerPage);
  const start = (currentPage - 1) * ItemPerPage;
  const end = start + ItemPerPage;
  const visibleCrimes = filteredCrimes.slice(start, end);

  function handelFilterChange(location, startDate, endDate) {
    setLocation(location);
    setStartDate(startDate);
    setEndDate(endDate);
    setCurrentPage(1);
  }

  function handlePageChange(pageNumber) {
    setCurrentPage(pageNumber);
    window.scrollTo({ top: 0 });
  }

  return (
    <>
      <CrimesFilter
        location={location}
        startDate={startDate}
        endDate={endDate}
        onchange={handelFilterChange}
      />

      <div className="cards-grid">
        {visibleCrimes.map((crime) => (
          <div className="crime-card" key={crime.id}>
            <section className="crime-info">
              <h4>{crime.title}</h4>

              <div className="crime-meta">
                <p className="location">
                  <i className="bi bi-geo-alt"></i>
                  {crime.city}
                </p>

                <p className="date">
                  <i className="bi bi-calendar3"></i>
                  {crime.incident_date?.slice(0,10)}
                </p>
              </div>

              <p className="description">
                <i className="bi bi-file-text"></i>
                {crime.description}
              </p>
            </section>

            <Link  to = {`/CrimeDetails/${crime.id}`} className="button">
              <i className="bi bi-box-arrow-up-right"></i>
              عرض التفاصيل
            </Link>
          </div>
        ))}
      </div>

      <MyPagination
        totalPages={totalPages}
        currentPage={currentPage}
        onPageChange={handlePageChange}
      />
    </>
  );
}

export default ExploreCrimes;
