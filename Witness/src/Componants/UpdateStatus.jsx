import React from "react";
import "../Style/Admin/ManageUsers.css"

function UpdateStatus({ filteredUsers, onChangeState }) {
  if (filteredUsers.length === 0) {
    return <p style={{ textAlign: "center" }}>لا يوجد مستخدمون</p>;
  }

  return (
    <div className="table-wrapper">
      <table>
        <thead>
          <tr>
            <th>الاسم</th>
            <th>البريد الإلكتروني</th>
            <th>الحالة</th>
            <th>الإجراءات</th>
          </tr>
        </thead>

        <tbody>
          {filteredUsers.map((user) => (
            <tr key={user.id}>
              <td>{`${user.first_name} ${user.last_name || ""}`}</td>
              <td>{user.email}</td>

              <td>
                <span
                  className={`status ${
                    user.state === "active" ? "active" : "disabled"
                  }`}
                >
                  {user.state === "active" ? "نشط" : "معطل"}
                </span>
              </td>

              <td className="actions">
                <select
                  className="actionsSelect"
                  value={user.state}
                  onChange={(e) =>
                    onChangeState(user.id, e.target.value)
                  }
                  disabled={user.role === "admin"} // حماية الأدمن
                >
                  <option value="active">نشط</option>
                  <option value="disabled">معطل</option>
                </select>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default UpdateStatus;
