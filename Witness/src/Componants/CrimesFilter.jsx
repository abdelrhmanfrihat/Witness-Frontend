import React from "react";
import "../Style/componants/crimeFilter.css";
function CrimesFilter({ location, startDate, endDate, onchange }) {
  function onLocationChange(e) {
    onchange(e.target.value, startDate, endDate);
  }

  function onStartDateChange(e) {
    onchange(location, e.target.value, endDate);
  }

  function onEndDateChange(e) {
    onchange(location, startDate, e.target.value);
  }

  return (
    <>
      <h1>الجرائم الموثقة</h1>
      <div className="crimes-filter">
        <select value={location} onChange={onLocationChange}>
          <option value="">جميع المناطق</option>
          <option value="غزة">غزة</option>
          <option value="رفح">رفح</option>
          <option value="خان يونس">خان يونس</option>
        </select>

        <div className="date-input">
          <span className="inside-label">من</span>
          <input type="date" value={startDate} onChange={onStartDateChange} />
        </div>

        <div className="date-input">
          <span className="inside-label">إلى</span>
          <input
            type="date"
            value={endDate}
            onChange={onEndDateChange}
            placeholder="Choose a Date"
            required
          />
        </div>
      </div>
    </>
  );
}

export default CrimesFilter;
