import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../Style/pages/MyReports.css";
import "bootstrap-icons/font/bootstrap-icons.css";
const BASE_URL = import.meta.env.VITE_API_BASE_URL;

function MyReports() {
  const navigate = useNavigate();
  const [reports, setReports] = useState([]);

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));

    if (!user) return;

    fetch(`${BASE_URL}/api/user/crimes/user/${user.id}`)
      .then((res) => res.json())
      .then((data) => setReports(data))
      .catch((err) => console.error(err));
  }, []);

  async function handleDelete(crimeId) {
    const report = reports.find((r) => r.id === crimeId);

    const confirmDelete = window.confirm("هل أنت متأكد من حذف التقرير؟");
    if (!confirmDelete) return;

    try {
      const res = await fetch(
        `${BASE_URL}/api/user/deleteCrime/${crimeId}`,
        { method: "DELETE" },
      );

      window.location.reload();
    } catch (err) {
      console.error(err);
      alert("خطأ في الخادم");
    }
  }

  return (
    <>
      <div className="my-reports-page">
        <div className="my-reports-container">
          <div className="reports-header">
            <h2 className="page-title">تقاريري</h2>

            <Link to="/AddCrimes">
              <button className="add-report-btn">
                <i className="bi bi-plus-lg"></i>
                إضافة تقرير
              </button>
            </Link>
          </div>

          <div className="reports-table-card">
            <table>
              <thead>
                <tr>
                  <th>العنوان</th>
                  <th>النوع</th>
                  <th>التاريخ</th>
                  <th>الحالة</th>
                  <th>الإجراءات</th>
                </tr>
              </thead>

              <tbody>
                {reports.length === 0 ? (
                  <tr>
                    <td colSpan="5">لا توجد تقارير بعد</td>
                  </tr>
                ) : (
                  reports.map((report) => (
                    <tr key={report.id}>
                      <td>{report.title}</td>
                      <td>{report.crime_type}</td>
                      <td>{report.incident_date?.slice(0, 10)}</td>

                      <td>
                        <span className={`status ${report.status}`}>
                          {report.status === "approved" && "مقبول"}
                          {report.status === "pending" && "قيد المراجعة"}
                          {report.status === "rejected" && "مرفوض"}
                        </span>
                      </td>

                      <td className="actions">
                        <i
                          className="bi bi-eye"
                          onClick={() => navigate(`/CrimeDetails/${report.id}`)}
                        ></i>

                        <i
                          className="bi bi-pencil"
                          onClick={() => navigate(`/EditCrimes/${report.id}`)}
                        ></i>

                        <i
                          className="bi bi-trash"
                          onClick={() => handleDelete(report.id)}
                        ></i>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  );
}

export default MyReports;
