import React from "react";
import { Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";

import Home from "./pages/Home";
import Layout from "./pages/Layout";
import Dashboard from "./pages/Dashboard";
import ResumeBuilder from "./pages/ResumeBuilder";
import Preview from "./pages/Preview";
import Login from "./pages/Login";
import EmailVerify from "./pages/EmailVerify";
import ResetPassword from "./pages/ResetPassword";

const App = () => {
  return (
    <>
      <ToastContainer />
      <Routes>
        
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/email-verify" element={<EmailVerify />} />
        <Route path="/reset-password" element={<ResetPassword />} />
        <Route path="/view/:resumeId" element={<Preview />} />

       
        <Route path="/app" element={<Layout />}>
          <Route index element={<Dashboard />} /> {/* /app -> Dashboard */}
          <Route path="dashboard" element={<Dashboard />} /> {/* /app/dashboard */}
          <Route path="builder/:resumeId" element={<ResumeBuilder />} /> {/* /app/builder/:resumeId */}
        </Route>
      </Routes>
    </>
  );
};

export default App;
