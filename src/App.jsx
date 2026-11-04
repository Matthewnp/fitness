// src/App.jsx
import { Routes, Route, Navigate } from "react-router";
import Layout from "./Components/Layout";
import AuthLayout from "./Components/AuthLayout";
import Trainers from "./Components/Trainers";
import Membership from "./Components/Membership";
import ClassSchedule from "./Components/ClassSchedule";
import SignUp from "./Components/SignUp";
import Login from "./Components/Login";
import ForgotPassword from "./Components/ForgotPassword";
import PasswordReset from "./Components/PasswordReset";
import Dashboard from "./Components/Dashboard";
import Success from "./Components/Success";          
import ProtectRoute from "./Components/ProtectedRoute";
import "./App.css";

function App() {
  return (
   
      <Routes>
        {/* ── App shell: navbar + Hi/Logout OR Sign Up/Login ── */}
        <Route element={<Layout />}>
          <Route path="/" element={<Navigate to="/trainer" replace />} />
          <Route path="/trainer" element={<Trainers />} />
          <Route path="/membership" element={<Membership />} />
          <Route path="/schedule" element={<ClassSchedule />} />
          <Route
            path="/dashboard"
            element={
              <ProtectRoute>
                <Dashboard />
              </ProtectRoute>
            }
          />
        </Route>

        {/* ── Auth shell: no navbar, clean form / confirmation ── */}
        <Route element={<AuthLayout />}>
          <Route path="/signup" element={<SignUp />} />
          <Route path="/login" element={<Login />} />
          <Route path="/forgotpassword" element={<ForgotPassword />} />
          <Route path="/passwordreset" element={<PasswordReset />} />
          <Route path="/success" element={<Success />} />     
          <Route path="/cancel" element={<CancelPage />} />   
        </Route>
      </Routes>
  
  );
}

// small inline component for /cancel
function CancelPage() {
  return (
    <main className="min-h-screen flex items-center justify-center bg-[#1a1d24] text-white p-6">
      <div className="text-center">
        <div className="text-5xl mb-4">✋</div>
        <h1 className="text-2xl font-bold mb-2">Payment cancelled</h1>
        <p className="text-gray-300 mb-4">No charge was made.</p>
        <a
          href="/membership"
          className="bg-orange-500 hover:bg-orange-600 px-6 py-2 rounded-full font-bold text-white inline-block"
        >
          Try again
        </a>
      </div>
    </main>
  );
}

export default App;