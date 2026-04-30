import React from "react";
import "../Style/componants/UserFilter.css"

function UserFilter({ value, onChange }) {
  return (
    <input
      type="text"
      placeholder="ابحث بالاسم..."
      value={value}
      onChange={onChange}
    />
  );
}

export default UserFilter;
