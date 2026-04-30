import { useState,useEffect } from "react";
import Login from "./Pages/Login";
import Register from "./Pages/Register";
import Home from "./Pages/Home";
import Layout from "./Componants/Layout";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "bootstrap-icons/font/bootstrap-icons.css";
import MyPagination from "./Componants/Pagination";
import CrimeDeatails from "./Pages/CrimeDetails";
import ExploreCrimes from "./Pages/ExploreCrimes";
import UserDashboard from "./Pages/UserDashboard";
import MyReports from "./Pages/MyReports";
import AddCrimes from "./Pages/AddCrimes";
import EditCrimes from "./Pages/EditCrimes";
import AdminDashboard from "./Pages/Admin/AdminDashboard";
import AdminCrimeReview from "./Pages/Admin/AdminCrimeReview";
import MangeUsers from "./Pages/Admin/ManageUsers";
import UserFilter from "./Componants/UserFilter";
import Test from "./Componants/test";
const BASE_URL = import.meta.env.VITE_API_BASE_URL;


function App() {
  const [crimes, setCrimes] = useState([]);

  useEffect(() => {
    fetch(`${BASE_URL}/api/user/crimes`)
      .then((res) => res.json())
      .then((data) => {
        const approvedCrimes = data.filter(
          (crime) => crime.status === "approved",
        );
        setCrimes(approvedCrimes);
      })
      .catch((err) => console.error(err));
  }, []);
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route element={<Layout />}>
            <Route path="UserFilter" element={<UserFilter />} />
            <Route path="EditCrimes/:id" element={<EditCrimes />} />
            <Route path="AddCrimes" element={<AddCrimes />} />
            <Route path="MyReports" element={<MyReports />} />
            <Route
              path="/UserDashBoard/:username"
              element={<UserDashboard />}
            />
            <Route path="ExploreCrimes" element={<ExploreCrimes crimes = {crimes} />} />
            <Route path="CrimeDetails/:id" element={<CrimeDeatails />} />
            <Route path="page" element={<MyPagination />} />
            <Route path="Home" element={<Home crimes = {crimes} />} />
          </Route>
          <Route path="login" element={<Login />} />
          <Route path="register" element={<Register />} />
          <Route path="*" element={<Login />} />
          <Route path="AdminDashboard" element={<AdminDashboard crimes = {crimes} />} />
          <Route path="ManageUsers" element={<MangeUsers />} />
          <Route path="test" element={<Test />} />
          <Route
            path="AdminCrimeReview/:id"
            element={<AdminCrimeReview />}
          />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
