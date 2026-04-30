import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../Style/pages/AddEditCrime.css";
import Layout from "../Componants/Layout";
const BASE_URL = import.meta.env.VITE_API_BASE_URL;

function AddCrimes() {
  const [title, setTitle] = useState("");
  const [city, setCity] = useState("");
  const [incidentDate, setIncidentDate] = useState("");
  const [crimeType, setCrimeType] = useState("");
  const [shortDescription, setShortDescription] = useState("");
  const [description, setDescription] = useState("");

  const [imageFiles, setImageFiles] = useState([]);
  const [previews, setPreviews] = useState([]);

  const navigate = useNavigate();

  const user = JSON.parse(localStorage.getItem("user"));


  function handleImageUpload(e) {
    const files = Array.from(e.target.files)
      .filter((f) => f.type.startsWith("image/"))
      .slice(0, 3);

    if (files.length > 3) {
      alert("يمكنك رفع 3 صور كحد أقصى");
      return;
    }

    previews.forEach((url) => URL.revokeObjectURL(url));

    setImageFiles(files);
    setPreviews(files.map((f) => URL.createObjectURL(f)));

    e.target.value = "";
  }

  function removeImage(index) {
    URL.revokeObjectURL(previews[index]);

    setImageFiles((prev) => prev.filter((_, i) => i !== index));
    setPreviews((prev) => prev.filter((_, i) => i !== index));
  }

  async function handleSubmit() {
    if (!title || !city || !incidentDate) {
      alert("يرجى تعبئة الحقول المطلوبة");
      return;
    }

    const formData = new FormData();

    formData.append("title", title);
    formData.append("city", city);
    formData.append("incident_date", incidentDate);
    formData.append("crime_type", crimeType);
    formData.append("short_description", shortDescription);
    formData.append("description", description);

    formData.append("reporter_id",user.id);

    imageFiles.forEach((file) => {
      formData.append("images", file);
    });

    try {
      const res = await fetch(`${BASE_URL}/api/user/AddCrime`, {
        method: "POST",
        body: formData,
      });

      const data = await res.json();

      if (!res.ok) {
        alert(data.message || "فشل الحفظ");
        return;
      }

      alert("تم حفظ الجريمة بنجاح");
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
          <h3 className="card-title">تفاصيل الجريمة</h3>

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
              <input value={shortDescription} onChange={(e) => setShortDescription(e.target.value)} />
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

          <div className="media-section">
            <label className="upload-btn">
              رفع صور
              <input
                type="file"
                accept="image/*"
                multiple
                hidden
                onChange={handleImageUpload}
              />
            </label>

            <div className="image-preview">
              {previews.map((img, index) => (
                <div className="img-box" key={index}>
                  <img src={img} alt="preview" />
                  <button onClick={() => removeImage(index)}>✕</button>
                </div>
              ))}
            </div>
          </div>

          <div className="form-actions">
            <button className="btn save" onClick={handleSubmit}>
              حفظ
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AddCrimes;
