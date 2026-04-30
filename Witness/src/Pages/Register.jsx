import react, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../Style/pages/login.css";
const BASE_URL = import.meta.env.VITE_API_BASE_URL;

function Register() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const navigate = useNavigate();

  async function handleSubmit(e) {
    e.preventDefault();
    if (password !== confirmPassword) {
      alert("Passwords do not match");
      return;
    }

    try {
      const response = await fetch(`${BASE_URL}/api/auth/signup`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ firstName, lastName, email, password }),
      });

      const result = await response.json();

      if (!response.ok) {
        alert(result.message || "Signup failed");
        return;
      }

      localStorage.setItem("user", JSON.stringify(result.user));

      navigate("/home");
    } catch (err) {
      console.error(err);
      alert("Server error");
    }

    setFirstName("");
    setLastName("");
    setEmail("");
    setPassword("");
    setConfirmPassword("");
  }

  return (
    <div>
      <div className="container">
        <div>
          <span>Witness</span>
          <span>⚖</span>
        </div>

        <h2>انشاء حساب جديد في منصة شهادة</h2>

        <form onSubmit={handleSubmit}>
          <p>الاسم</p>
          <input
            type="text"
            placeholder="أدخل اسمك الكامل"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
          />
          <p>اسم العائلة</p>

          <input
            type="text"
            placeholder="أدخل اسمك الكامل"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
          />

          <p>البريد الإلكتروني</p>
          <input
            type="text"
            placeholder="example@domain.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <p>كلمة المرور</p>
          <input
            type="password"
            placeholder="أدخل كلمة المرور"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <p>تأكيد كلمة المرور</p>
          <input
            type="password"
            placeholder="أعد إدخال كلمة المرور"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />

          <button type="submit">إنشاء حساب</button>
        </form>

        <p>لديك حساب بالفعل؟</p>
        <Link to="/login">تسجيل الدخول</Link>
      </div>
    </div>
  );
}

export default Register;
