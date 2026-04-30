import React, { useEffect, useState } from "react";
import "../Style/pages/AddEditCrime.css";
import { useNavigate, useParams } from "react-router-dom";
const BASE_URL = import.meta.env.VITE_API_BASE_URL;

function EditCrime() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [title, setTitle] = useState("");
  const [city, setCity] = useState("");
  const [incidentDate, setIncidentDate] = useState("");
  const [crimeType, setCrimeType] = useState("");
  const [shortDescription, setShortDescription] = useState("");
  const [description, setDescription] = useState("");

  useEffect(() => {
    fetch(`${BASE_URL}/api/user/crimes/${id}`)
      .then((res) => res.json())
      .then((crime) => {
        setTitle(crime.title);
        setCity(crime.city);
        setIncidentDate(crime.incident_date?.slice(0, 10));
        setCrimeType(crime.crime_type);
        setShortDescription(crime.short_description || "");
        setDescription(crime.description || "");
      })
      .catch((err) => console.error(err));
  }, [id]);

  async function handleUpdate() {
    if (!title || !city || !incidentDate) {
      alert("يرجى تعبئة الحقول المطلوبة");
      return;
    }

    try {
      const res = await fetch(
        `${BASE_URL}/api/user/updateCrime/${id}`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            title,
            city,
            incident_date: incidentDate,
            crime_type: crimeType,
            short_description: shortDescription,
            description,
          }),
        },
      );

      const data = await res.json();

      if (!res.ok) {
        alert(data.message || "فشل التحديث");
        return;
      }

      alert("تم تحديث الجريمة بنجاح");
      navigate(-1);
    } catch (err) {
      console.error(err);
      alert("خطأ في الخادم");
    }
  }

  return (
    <div className="add-crime-page">
      <div className="add-crime-container">
        <div className="crime-form-card">
          <h3 className="card-title">تعديل الجريمة</h3>

          <div className="form-grid">
            <div className="form-group">
              <label>عنوان الجريمة</label>
              <input value={title} onChange={(e) => setTitle(e.target.value)} />
            </div>

            <div className="form-group">
              <label>المدينة</label>
              <input value={city} onChange={(e) => setCity(e.target.value)} />
            </div>

            <div className="form-group">
              <label>وصف قصير</label>
              <input
                value={shortDescription}
                onChange={(e) => setShortDescription(e.target.value)}
              />
            </div>

            <div className="form-group">
              <label>التاريخ</label>
              <input
                type="date"
                value={incidentDate}
                onChange={(e) => setIncidentDate(e.target.value)}
              />
            </div>

            <div className="form-group full">
              <label>نوع الجريمة</label>
              <select
                value={crimeType}
                onChange={(e) => setCrimeType(e.target.value)}
              >
                <option value="">اختر</option>
                <option value="قصف">قصف</option>
                <option value="غارات جوية">غارات جوية</option>
              </select>
            </div>

            <div className="form-group full">
              <label>وصف تفصيلي</label>
              <textarea
                rows="6"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
            </div>
          </div>

          <div className="form-actions">
            <button className="btn cancel" onClick={() => navigate(-1)}>
              إلغاء
            </button>
            <button className="btn save" onClick={handleUpdate}>
              حفظ التعديلات
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default EditCrime;
