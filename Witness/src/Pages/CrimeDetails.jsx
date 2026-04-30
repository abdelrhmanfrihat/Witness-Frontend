import React, { useState, useEffect } from "react";
import "../Style/pages/CrimeDetails.css";
import Layout from "../Componants/Layout";
import "bootstrap-icons/font/bootstrap-icons.css";
import { useParams } from "react-router-dom";
const BASE_URL = import.meta.env.VITE_API_BASE_URL;

function CrimeDetails() {
  const { id } = useParams();
  const [crime, setCrime] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`${BASE_URL}/api/user/crimes/${id}`)
      .then((res) => res.json())
      .then((data) => {
        setCrime(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
      });
  }, [id]);

  if (loading) return <p>Loading...</p>;
  if (!crime) return <p>Crime not found</p>;

  return (
    <>
      <div className="cd-page">
        <div className="cd-container">
          <div className="cd-wrapper">
            <h1 className="cd-title">{crime.title}</h1>

            <div className="cd-info-bar">
              <div className="cd-info-item">
                <span className="cd-label">التاريخ</span>
                <span className="cd-value">
                  {crime.incident_date?.slice(0, 10)}
                </span>
              </div>

              <div className="cd-info-item">
                <span className="cd-label">الموقع</span>
                <span className="cd-value">{crime.city}</span>
              </div>

              <div className="cd-info-item">
                <span className="cd-label">حالة التقرير</span>
                <span className="cd-value cd-state">{crime.status}</span>
              </div>

              <div className="cd-info-item">
                <span className="cd-label">المراسل</span>
                <span className="cd-value">{crime.reporter}</span>
              </div>
            </div>

            <div className="cd-details-card">
              <h3 className="cd-section-title">تفاصيل الجريمة</h3>
              <p className="cd-details-text">{crime.description}</p>
            </div>

            <div className="cd-images-card">
              <h3 className="cd-section-title">صور وتوضيحات</h3>

              <div className="cd-images-grid">
                {crime.media?.map((img, index) => (
                  <div className="cd-img-box" key={index}>
                    <img
                      className="cd-img"
                      src={`${BASE_URL}${img}`}
                      alt={`crime-${index}`}
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default CrimeDetails;
