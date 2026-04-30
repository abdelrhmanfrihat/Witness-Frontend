import {Link} from "react-router-dom"


function AdminNavBar() {
  return (
        <header className="topbar">
        <nav className="nav" dir="">
          <div className="nav__links">
            <Link to="/AdminDashboard">الصفحة الرئيسية</Link>
            <Link to="/ManageUsers">استعراض جميع المستخدمين</Link>
          </div>

        </nav>
      </header>
  );
}

export default AdminNavBar;
