import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import "../../Style/Admin/AdminCrimeReview.css";
import AdminNavBar from "../../Componants/AdminNavBar";

const BASE_URL = import.meta.env.VITE_API_BASE_URL;
const user = JSON.parse(localStorage.getItem("user"));

function AdminCrimeReview() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [crime, setCrime] = useState(null);

  useEffect(() => {
    fetch(`${NEWS_URL}/api/user/crimes/${id}`)
      .then((crime) => crime.json())
      .then((data) => setCrime(data))
      .catch((err) => console.error(err));
  }, []);

  async function updateStatus(newStatus) {
    window.confirm(newStatus === "approved"
        ? "هل أنت متأكد من توثيق التقرير؟"
        : "هل أنت متأكد من رفض التقرير؟",
    );
    
    try {
      const res = await fetch(
        `${BASE_URL}/api/admin/crimes/${id}/status`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json","x-role": user.role },
          body: JSON.stringify({ status: newStatus }),
        }
      );


    } catch (err) {
      console.error(err);
      alert("خطأ في الخادم");
    }
  }

  if (!crime) {
    return <div style={{ direction: "rtl", padding: 20 }}>جاري التحميل...</div>;
  }

  return (
    <>
      <AdminNavBar />

      <div className="crime-review-page" dir="rtl">
        <div className="crime-review-container">
          <h1 className="crime-review-title">{crime.title}</h1>

          <div className="crime-review-layout">
            <div>
              <div className="crime-card">
                <h3 className="crime-card-title">معلومات الجريمة</h3>

                <div className="crime-grid">
                  <span className="crime-label">التاريخ</span>
                  <span className="crime-value">
                    {crime.incident_date?.slice(0, 10)}
                  </span>

                  <span className="crime-label">الدولة</span>
                  <span className="crime-value">{crime.country}</span>

                  <span className="crime-label">المدينة/المنطقة</span>
                  <span className="crime-value">{crime.city}</span>

                  <span className="crime-label">حالة التقرير</span>
                  <span className="crime-value">
                    <span className={`crime-status-pill ${crime.status}`}>
                      {crime.status === "approved" && "موثق"}
                      {crime.status === "pending" && "قيد المراجعة"}
                      {crime.status === "rejected" && "مرفوض"}
                    </span>
                  </span>
                </div>
              </div>

              <div className="crime-card">
                <h3 className="crime-card-title">معلومات المبلغ</h3>

                <div className="crime-grid">
                  <span className="crime-label">اسم المبلغ</span>
                  <span className="crime-value">{crime.reporter}</span>

                  <span className="crime-label">البريد الإلكتروني</span>
                  <span className="crime-value">{crime.email || "-"}</span>
                </div>
              </div>

              <div className="crime-card">
                <h3 className="crime-card-title">الوصف التفصيلي</h3>
                <p className="crime-description">{crime.description}</p>
              </div>

              <div className="crime-card">
                <h3 className="crime-card-title">معرض الوسائط</h3>

                {crime.media && crime.media.length > 0 ? (
                  <div className="crime-media-grid">
                    {crime.media.map((src, idx) => (
                      <div className="crime-media-item" key={idx}>
                        <img src={`${BASE_URL}${src}`} alt="" />
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="crime-media-empty">لا توجد وسائط</div>
                )}
              </div>
            </div>

            <div className="crime-side-panel">
              <button
                className="crime-btn primary"
                onClick={() => updateStatus("approved")}
              >
                توثيق
              </button>

              <button
                className="crime-btn"
                onClick={() => updateStatus("rejected")}
              >
                رفض
              </button>

              <button className="crime-btn" onClick={() => navigate(-1)}>
                رجوع
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default AdminCrimeReview;
