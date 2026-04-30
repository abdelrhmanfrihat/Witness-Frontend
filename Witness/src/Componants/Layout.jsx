import React from "react";
import { Link, Outlet } from "react-router-dom";
import "../Style/componants/Layout.css";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";

function Layout() {
  const username = JSON.parse(localStorage.getItem("user"));
  return (
    <>
      <Navbar
        expand="lg"
        bg="1f232b"
        variant="dark"
        className="admin-navbar w-100"
        dir="rtl"
      >
        <Container fluid className="px-3">
          <Navbar.Brand className="fw-bold" href="#"></Navbar.Brand>

          <Navbar.Toggle
            aria-controls="mainNavbar"
            className="shadow-none border-0"
          />

          <Navbar.Collapse id="mainNavbar" className="justify-content-start">
            <Nav className="gap-4">
              <Nav.Link as={Link} to="/home">
                الرئيسية
              </Nav.Link>
              <Nav.Link as={Link} to="/ExploreCrimes">
                استعراض جميع الجرائم
              </Nav.Link>
              <Nav.Link as={Link} to="/MyReports">
                تقاريري
              </Nav.Link>
              <Nav.Link as={Link} to={`/UserDashBoard/${username.first_name}`}>
                الملف الشخصي
              </Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>

      <Outlet />

      <footer className="footer" dir="rtl">
        <div className="footer__container">
          <div className="footer__grid">
            <div className="footer__col footer__brand">
              <p>منصة لتوثيق جرائم الاحتلال الإسرائيلي بحق المدنيين.</p>
            </div>

            <div className="footer__col">
              <h4>روابط سريعة</h4>
              <Link to="/home">الصفحة الرئيسية</Link>
              <Link to="/CrimeDeatails">استعراض الجرائم</Link>
              <Link to="/register">التسجيل</Link>
              <Link to="/about">عن المنصة</Link>
            </div>

            <div className="footer__col">
              <h4>الدعم</h4>
              <Link to="/contact">تواصل معنا</Link>
              <Link to="/faq">الأسئلة الشائعة</Link>
              <Link to="/privacy">سياسة الخصوصية</Link>
              <Link to="/terms">الشروط</Link>
            </div>
          </div>

          <div className="footer__line"></div>

          <p className="footer__copy">
            &copy; 2025 Witness — جميع الحقوق محفوظة.
          </p>
        </div>
      </footer>
    </>
  );
}

export default Layout;
