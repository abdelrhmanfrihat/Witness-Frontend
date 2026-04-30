import React, { useEffect, useState } from "react";
import UserFilter from "../../Componants/UserFilter";
import UpdateStatus from "../../Componants/UpdateStatus";
import AdminNavBar from "../../Componants/AdminNavBar";
import "../../Style/Admin/ManageUsers.css";
const BASE_URL = import.meta.env.VITE_API_BASE_URL;

function ManageUsers() {
  const [users, setUsers] = useState([]);
  const [searchName, setSearchName] = useState("");
  const user = JSON.parse(localStorage.getItem("user"));

  useEffect(() => {
    fetch(`${BASE_URL}/api/admin/users`, {
      headers: {
        "x-role": "admin",
      },
    })
      .then((res) => res.json())
      .then((data) => setUsers(data))
      .catch((err) => console.error(err));
  }, []);

  const filteredUsers = users.filter((user) => {
    const fullName = `${user.first_name} ${user.last_name || ""}`;
    return fullName.includes(searchName);
  });

  function handleChangeState(id, newState) {
    fetch(`${BASE_URL}/api/admin/users/${id}/state`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "x-role": user.role
      },
      body: JSON.stringify({ state: newState }),
    })
      .then((res) => res.json())
      .then((data) => {
        setUsers((prev) =>
          prev.map((user) => (user.id === id ? data.user : user)),
        );
      })
      .catch((err) => console.error(err));
  }

  return (
    <>
      <AdminNavBar />

      <div className="manage-users">
        <div className="header">
          <h2>إدارة المستخدمين</h2>

          <UserFilter
            value={searchName}
            onChange={(e) => setSearchName(e.target.value)}
          />
        </div>

        <UpdateStatus
          filteredUsers={filteredUsers}
          onChangeState={handleChangeState}
        />
      </div>
    </>
  );
}

export default ManageUsers;
