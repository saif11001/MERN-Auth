import { Route, Routes, Navigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import FloatingShape from "./components/FloatingShape";
import SignUpPage from './pages/SignUpPage';
import LoginPage from './pages/LoginPage';
import EmailVerificationPage from "./pages/EmailVerificationPage";
import HomePage from './pages/HomePage';
import ResetPasswordPage from "./pages/ResetPasswordPage";
import ForgetPasswordPage from "./pages/ForgetPasswordPage";
import AdminPage from "./pages/AdminPage";

import { checkAuth } from './redux/features/auth/authSlice';

function App() {
  const { isAuthenticated, user, isCheckingAuth } = useSelector((state) => state.auth);
  const [showSpinner, setShowSpinner] = useState(true);

  const dispatch = useDispatch();
  
  useEffect(() => {
    dispatch(checkAuth());
    setTimeout(() => {
      setShowSpinner(false);
    }, 1000);
  }, [dispatch])

  if(isCheckingAuth || showSpinner) {
    return (
      <div
        className="min-h-screen flex items-center justify-center"
        style={{ background: 'linear-gradient(135deg, #1a1a2e 0%, #16213e 50%, #0f3460 100%)' }}
      >
        <div className="w-10 h-10 border-4 border-purple-500 border-t-transparent rounded-full animate-spin" />
      </div>
    )
  }

  return (
    <div
      className="min-h-screen flex items-start sm:items-center justify-center relative overflow-hidden px-4 py-8 sm:py-0"
      style={{ background: 'linear-gradient(135deg, #1a1a2e 0%, #16213e 50%, #0f3460 100%)' }}
    >

      <div
        className="absolute inset-0 opacity-50 pointer-events-none"
        style={{
          backgroundImage: "radial-gradient(circle, rgba(255,255,255,0.03) 1px, transparent 1px)",
          backgroundSize: "3px 3px"
        }}
      />

      <FloatingShape color="bg-purple-600 shadow-2xl shadow-purple-500/40" size="w-64 h-64" top="-5%" left="10%" delay={1} />
      <FloatingShape color="bg-indigo-600 shadow-2xl shadow-indigo-500/40" size="w-48 h-48" top="70%" left="80%" delay={4} />
      <FloatingShape color="bg-violet-600 shadow-2xl shadow-violet-500/40" size="w-32 h-32" top="40%" left="-10%" delay={2} />
      <FloatingShape color="bg-purple-500 shadow-2xl shadow-purple-400/40" size="w-32 h-32" top="30%" left="60%" delay={5} />

      <div className="w-full z-10">
        <Routes>
          <Route path="/" element={
            isAuthenticated && user?.isVerified
              ? user?.role === "admin"
                ? <Navigate to={"/admin"} />
                : <HomePage />
            : <Navigate to="/login" />
          } />

          <Route path="/admin" element={
            isAuthenticated && user?.isVerified && user?.role === "admin" 
            ? <AdminPage />
            : <Navigate to={"/"} />
          } />

          <Route path="/signup" element={!isAuthenticated ? <SignUpPage /> : <Navigate to="/" />} />
          <Route path="/login" element={!isAuthenticated ? <LoginPage /> : <Navigate to="/" />} />
          <Route path="/verify-email" element={<EmailVerificationPage />} />
          <Route path="/forget-password" element={<ForgetPasswordPage />} />
          <Route path="/reset-password/:token" element={<ResetPasswordPage />} />
          
          <Route path="*" element={<Navigate to={'/'} replace/>} />
        </Routes>
      </div>
    </div>
  )
}

export default App;