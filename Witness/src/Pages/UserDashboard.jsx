import React, { useEffect, useState } from "react";
import "../Style/pages/UserDashboard.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import Layout from "../Componants/Layout";
import { useNavigate, useParams } from "react-router-dom";
const BASE_URL = import.meta.env.VITE_API_BASE_URL;

function UserDashboard() {
  const { username } = useParams();
  const navigate = useNavigate();

  const [reports, setReports] = useState([]);

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));

    fetch(`${BASE_URL}/api/user/crimes/user/${user.id}`)
      .then(res => res.json())
      .then(data => setReports(data))
      .catch(err => console.error(err));
  }, []);

  const totalReports = reports.length;
  const approvedReports = reports.filter(r => r.status === "approved").length;
  const rejectedReports = reports.filter(r => r.status === "rejected").length;

  const lastFiveReports = [...reports]
    .sort((a, b) => new Date(b.incident_date) - new Date(a.incident_date))
    .slice(0, 5);

  return (
      <div className="dashboard-page">
        <div className="dashboard-container">

          <div className="dashboard-header">
            <h2 className="welcome">
              مرحباً بك، {username}
            </h2>

            <button
              className="add-btn"
              onClick={() => navigate("/AddCrimes")}
            >
              <i className="bi bi-plus"></i>
              إضافة تقرير
            </button>
          </div>

          {/* ===== Stats ===== */}
          <div className="stats-grid">
            <div className="stat-card">
              <span className="stat-title">عدد التقارير المرفوضة</span>
              <span className="stat-value">{rejectedReports}</span>
            </div>

            <div className="stat-card">
              <span className="stat-title">عدد التقارير الموثقة</span>
              <span className="stat-value">{approvedReports}</span>
            </div>

            <div className="stat-card">
              <span className="stat-title">عدد التقارير المقدمة</span>
              <span className="stat-value">{totalReports}</span>
            </div>
          </div>

          {/* ===== Table ===== */}
          <div className="table-card">
            <h3 className="table-title">آخر 5 تقارير</h3>

            <table>
              <thead>
                <tr>
                  <th>العنوان</th>
                  <th>النوع</th>
                  <th>التاريخ</th>
                  <th>الحالة</th>
                </tr>
              </thead>

              <tbody>
                {lastFiveReports.map(report => (
                  <tr key={report.id}>
                    <td>{report.title}</td>
                    <td>{report.crime_type}</td>
                    <td>{report.incident_date?.slice(0, 10)}</td>
                    <td className={`status ${report.status}`}>
                      {report.status === "approved" && "موثق"}
                      {report.status === "pending" && "قيد المراجعة"}
                      {report.status === "rejected" && "مرفوض"}
                    </td>
                  </tr>
                ))}

                {lastFiveReports.length === 0 && (
                  <tr>
                    <td colSpan="4" style={{ textAlign: "center" }}>
                      لا توجد تقارير
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

        </div>
      </div>
  );
}

export default UserDashboard;
