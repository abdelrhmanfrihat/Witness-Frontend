import React, { useState, useEffect } from "react";
import "../../Style/Admin/AdminDashboard.css";
import AdminNavBar from "../../Componants/AdminNavBar";
import CrimesFilter from "../../Componants/CrimesFilter";
import Pagination from "../../Componants/Pagination";
import { Link } from "react-router-dom";
const BASE_URL = import.meta.env.VITE_API_BASE_URL;

function AdminDashboard() {
  const [crimes, setCrimes] = useState([]);

  useEffect(() => {
    fetch(`${BASE_URL}/api/user/crimes`)
      .then((res) => res.json())
      .then((data) => {
        const pendingCrimes = data.filter(
          (crime) => crime.status === "pending"
        );
        setCrimes(pendingCrimes);
      })
      .catch((err) => console.error(err));
  }, []);

  const [currentPage, setCurrentPage] = useState(1);
  const [location, setLocation] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  const ItemPerPage = 5;

  let filteredCrimes = crimes;

  if (startDate !== "" && endDate !== "") {
    filteredCrimes = filteredCrimes.filter(
      (crime) =>
        crime.incident_date >= startDate &&
        crime.incident_date <= endDate
    );
  }

  if (location !== "") {
    filteredCrimes = filteredCrimes.filter(
      (crime) => crime.city === location
    );
  }

  const start = (currentPage - 1) * ItemPerPage;
  const end = start + ItemPerPage;
  const totalPages = Math.ceil(filteredCrimes.length / ItemPerPage);
  const visibleCrimes = filteredCrimes.slice(start, end);

  function handleFilterSubmit(location, startDate, endDate) {
    setLocation(location);
    setStartDate(startDate);
    setEndDate(endDate);
    setCurrentPage(1);
  }

  function handlePageChange(pageNumber) {
    setCurrentPage(pageNumber);
  }

  const pendingCount = crimes.filter(
    (crime) => crime.status === "pending"
  ).length;

  const approvedCount = crimes.filter(
    (crime) => crime.status === "approved"
  ).length;

  const rejectedCount = crimes.filter(
    (crime) => crime.status === "rejected"
  ).length;

  const totalCount = crimes.length;

  return (
    <>
      <AdminNavBar />

      <div className="admin-dashboard-page">
        <div className="admin-dashboard-container">

          <div className="admin-stats-grid">
            <div className="admin-stat-card">
              <div className="admin-stat-icon">
                <i className="bi bi-trash"></i>
              </div>
              <div className="admin-stat-content">
                <span className="admin-stat-title">التقارير المرفوضة</span>
                <span className="admin-stat-value">{rejectedCount}</span>
                <span className="admin-stat-sub">
                  تقارير تم رفضها بعد المراجعة
                </span>
              </div>
            </div>

            <div className="admin-stat-card">
              <div className="admin-stat-icon">
                <i className="bi bi-box-arrow-up-right"></i>
              </div>
              <div className="admin-stat-content">
                <span className="admin-stat-title">التقارير الموثقة</span>
                <span className="admin-stat-value">{approvedCount}</span>
                <span className="admin-stat-sub">
                  تقارير تم التحقق منها وتوثيقها
                </span>
              </div>
            </div>

            <div className="admin-stat-card">
              <div className="admin-stat-icon">
                <i className="bi bi-clipboard-check"></i>
              </div>
              <div className="admin-stat-content">
                <span className="admin-stat-title">التقارير المعلقة</span>
                <span className="admin-stat-value">{pendingCount}</span>
                <span className="admin-stat-sub">
                  تقارير تنتظر المراجعة والتوثيق
                </span>
              </div>
            </div>

            <div className="admin-stat-card">
              <div className="admin-stat-icon">
                <i className="bi bi-file-earmark-text"></i>
              </div>
              <div className="admin-stat-content">
                <span className="admin-stat-title">إجمالي التقارير</span>
                <span className="admin-stat-value">{totalCount}</span>
                <span className="admin-stat-sub">
                  عدد التقارير الكلي في النظام
                </span>
              </div>
            </div>
          </div>

          <div className="admin-filter-wrapper">
            <CrimesFilter
              location={location}
              startDate={startDate}
              endDate={endDate}
              onchange={handleFilterSubmit}
            />
          </div>

          <div className="admin-table-card">
            <table>
              <thead>
                <tr>
                  <th>العنوان</th>
                  <th>الدولة</th>
                  <th>المدينة</th>
                  <th>التاريخ</th>
                  <th>الحالة</th>
                  <th>الإجراءات</th>
                </tr>
              </thead>

              <tbody>
                {visibleCrimes.length === 0 ? (
                  <tr>
                    <td colSpan="6">لا توجد تقارير حالياً</td>
                  </tr>
                ) : (
                  visibleCrimes.map((crime) => (
                    <tr key={crime.id}>
                      <td>{crime.title}</td>
                      <td>{crime.country}</td>
                      <td>{crime.city}</td>
                      <td>{crime.incident_date?.slice(0, 10)}</td>
                      <td>
                        <span
                          className={`admin-status admin-${crime.status}`}
                        >
                          {crime.status === "approved" && "موثق"}
                          {crime.status === "pending" && "قيد المراجعة"}
                          {crime.status === "rejected" && "مرفوض"}
                        </span>
                      </td>
                      <td className="admin-actions">
                        <Link to={`/AdminCrimeReview/${crime.id}`}>
                          <i className="bi bi-eye"></i>
                        </Link>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>

          <Pagination
            totalPages={totalPages}
            currentPage={currentPage}
            onPageChange={handlePageChange}
          />
        </div>
      </div>
    </>
  );
}

export default AdminDashboard;
