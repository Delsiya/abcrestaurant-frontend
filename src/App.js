import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import HomePage from "./components/HomePage";
import Login from "./components/Login";
import SignUp from "./components/Signup";
import AdminDashboard from "./components/AdminDashboard";
import AmbulanceManagement from "./components/AmbulanceManagement";
import BloodManagementMenu from "./components/BloodManagement"
import BranchManagement from "./components/BranchManagement"
import IncidentForm from "./components/IncidentForm";
import BloodSearch from "./components/BloodSearch"
import DonorRegistration from "./components/DonorRegistration"
import EventManagement from "./components/EventManagement"
import BloodBank from "./components/BloodBank"
import AmbulanceForm from "./components/AmbulanceForm"



const App = () => {
  const [userLoggedIn, setUserLoggedIn] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    const storedUserLoggedIn = localStorage.getItem("userLoggedIn");
    const storedIsAdmin = localStorage.getItem("isAdmin") === "true";

    if (storedUserLoggedIn === "true") {
      setUserLoggedIn(true);
      setIsAdmin(storedIsAdmin);
    }
  }, []);

  const handleLogin = (email, password) => {
    console.log("Logged in with:", email, password);

    const admin = email === "admin@domain.com" && password === "password";

    localStorage.setItem("userLoggedIn", "true");
    localStorage.setItem("isAdmin", admin ? "true" : "false");

    setUserLoggedIn(true);
    setIsAdmin(admin);
  };

  const handleLogout = () => {
    localStorage.removeItem("userLoggedIn");
    localStorage.removeItem("isAdmin");
    setUserLoggedIn(false);
    setIsAdmin(false);
  };

  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<Login onLogin={handleLogin} />} />
        <Route path="/signup" element={<SignUp />} />

        {/* Admin Dashboard */}
        <Route
          path="/admin-dashboard"
          element={isAdmin ? <AdminDashboard onLogout={handleLogout} /> : <Navigate to="/" />}
        />

        {/* Ambulance Management */}
        <Route
          path="/ambulance-management"
          element={isAdmin ? <AmbulanceManagement /> : <Navigate to="/" />}
        />

        {/* Blood Management */}
        <Route
          path="/blood-management"
          element={isAdmin ? <BloodManagementMenu /> : <Navigate to="/" />}
        />
         <Route
          path="/branch-management"
          element={isAdmin ? <BranchManagement /> : <Navigate to="/" />}
        />
       
        <Route
          path="/blood-search"
          element={isAdmin ? < BloodSearch /> : <Navigate to="/" />}
        />
        <Route
          path="/donor-registration"
          element={isAdmin ? <DonorRegistration /> : <Navigate to="/" />}
        />
          
          <Route
          path="/event-management"
          element={isAdmin ? <EventManagement /> : <Navigate to="/" />}
        />
         <Route
          path="/blood-bank"
          element={isAdmin ? <BloodBank /> : <Navigate to="/" />}
        />
         <Route
          path="/ambulance-management"
          element={isAdmin ? <AmbulanceManagement /> : <Navigate to="/" />}
        />
         <Route
          path="/ambulance-form"
          element={isAdmin ? <AmbulanceForm /> : <Navigate to="/" />}
        />
         {/* Incident Form for regular users */}
         <Route
          path="/incident-form"
          element={userLoggedIn && !isAdmin ? <IncidentForm /> : <Navigate to="/login" />}
        />
      </Routes>


    </Router>
  );
};

export default App;
