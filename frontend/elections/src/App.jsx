

import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./components/Home/Home";
import SignIn from "./components/SignIn/SignIn";
import Electoral from "./components/Electoral-lists/Electoral";
import AboutUS from "./components/AboutUs/AboutUS";
import ContactUS from "./components/ContactUs/ContactUS";
import AdminDashboard from "./components/DashBoard/AdminDashboard";
import PaymentComponent from "./components/PaymentComponent";
import LoginPage from "./components/LoginPage";
const App = () => {
  return (
    <Router>
      <Routes>
        {/* <Route path="/" element={<Home />} /> */}
        <Route path="/electoral" element={<Electoral />} />
        <Route path="/about" element={<AboutUS />} />
        <Route path="/contact" element={<ContactUS />} />
        <Route path="/signin" element={<SignIn />} />
        <Route path="/AdminDashboard/*" element={<AdminDashboard />} />
        <Route path="/PaymentComponent" element={<PaymentComponent />} />
        <Route path="/" element={<LoginPage />} />
      
      </Routes>
    </Router>
  );
};

export default App;
