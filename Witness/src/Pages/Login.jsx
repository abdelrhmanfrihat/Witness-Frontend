import react, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../Style/pages/login.css";
const BASE_URL = import.meta.env.VITE_API_BASE_URL;

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  async function handleSubmit(e) {
    e.preventDefault();

    try {
      const response = await fetch(`${BASE_URL}/api/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      localStorage.setItem("user", JSON.stringify(data.user));

      if (!response.ok) {
        alert(data.message);
        return;
      }

      if (data.user.role === "admin") {
        navigate("/AdminDashboard");
      } else if (data.user.role === "user") {
        if (data.user.state === "active") navigate("/home");
        else {
          alert("Your Account is not Active");
        }
      }
    } catch (err) {
      console.error(err);
      alert("Server error");
    }
  }

  return (
    <div className="Home">
      <div className="container">
        <div>
          <span>Witness</span>
          <span>⚖</span>
        </div>

        <h2>تسجيل الدخول إلى منصة شهادة</h2>

        <form onSubmit={handleSubmit}>
          <p>البريد الالكتروني</p>
          <input
            type="text"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <p>كلمة السر</p>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <button type="submit">تسجيل الدخول</button>
        </form>

        <p>
          ليس لديك حساب؟ <Link to="/Register">سجل الآن</Link>
        </p>
      </div>
    </div>
  );
}

export default Login;
