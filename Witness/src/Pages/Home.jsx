import react from "react";
import { useState, useEffect } from "react";
import Layout from "../Componants/Layout";
import "../Style/pages/Home.css";
import { Link } from "react-router-dom";
const NEWS_URL = import.meta.env.VITE_API_NEWS_URL;
const BASE_URL = import.meta.env.VITE_API_BASE_URL;

function Home({ crimes }) {
  const [news, setNews] = useState([]);

  useEffect(() => {
    fetch(
      `${NEWS_URL}`,
    )
      .then((res) => res.json())
      .then((data) => {
        setNews(data.articles);
      })
      .catch((err) => console.error(err));
  }, []);

  const [currentNewsIndex, setCurrentNewsIndex] = useState(0);

  useEffect(() => {
    if (news.length === 0) return;

    const interval = setInterval(() => {
      setCurrentNewsIndex((prev) => (prev + 1) % news.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [news]);

  return (
    <>
      <br />
      <div className="home">
        <section className="intro">
          <h1>شاهد على الحقيقة: توثيق جرائم الاحتلال</h1>
          <p>
            منصة مستقلة تهدف آلى توثيق جرائم الاحتلال الإسرائيلي بحق المدنيين
            باستخدام الأدلة والصور والشهادات الموثوقة.
          </p>
          <div className="intro_button">
            <Link to="/AddCrimes">
              <button className="btn primary">أضف جريمة</button>
            </Link>
            <Link to={`/ExploreCrimes/`} className="btn outline">
              استعراض الجرائم
            </Link>
          </div>
          <br />
          {news.length > 0 && (
            <span key={currentNewsIndex} className="ticker-item animate">
              {news[currentNewsIndex].title}
            </span>
          )}
        </section>

        <section className="stats">
          <div className="stats-card">
            <i className="bi bi-clipboard-check stats-icon"></i>
            <h3>{crimes.length}</h3>
            <p>عدد الجرائم الموثوقة</p>
          </div>

          <div className="stats-card">
            <i className="bi bi-geo-alt stats-icon"></i>
            <h3>45+</h3>
            <p>مناطق مستهدفة</p>
          </div>

          <div className="stats-card">
            <i className="bi bi-bank stats-icon"></i>
            <h3>71,548+</h3>
            <p>عدد الضحايا</p>
          </div>
        </section>

        <section className="crime-section">
          <h2>آخر الجرائم الموثوقة</h2>
          <div className="crimes">
            {crimes.slice(0, 6).map((crime) => (
              <div className="crime-card" key={crime.id}>
                <section className="crime-info">
                  <h4>{crime.title}</h4>

                  <div className="crime-meta">
                    <p className="location">
                      <i className="bi bi-geo-alt"></i>
                      {crime.city}
                    </p>

                    <p className="date">
                      <i className="bi bi-calendar3"></i>
                      {crime.incident_date?.slice(0, 10)}
                    </p>
                  </div>

                  <p className="description">
                    <i className="bi bi-file-text"></i>
                    {crime.description}
                  </p>
                </section>

                <Link to={`/CrimeDetails/${crime.id}`} className="button">
                  <i className="bi bi-box-arrow-up-right"></i>
                  عرض التفاصيل
                </Link>
              </div>
            ))}
          </div>
        </section>
      </div>
    </>
  );
}

export default Home;
