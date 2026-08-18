import { Routes, Route } from "react-router-dom";

import Home from "./pages/Home";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Navbar from "./components/common/Navbar";
import About from "./pages/About";

import OpenRoute from "./components/core/Authentication/OpenRoute";
import Dashboard from "./pages/Dashboard";
import PrivateRoute from "./components/core/Authentication/PrivateRoute";

import VerifyEmail from "./pages/VerifyEmail";
import Error from "./pages/Error";
import { ForgotPassword } from "./pages/ForgotPassword";
import UpdatePassword from "./pages/UpdatePassword";
import {ResetPasswordSucceess } from "./pages/ResetPasswordSucceess";
import InteractiveBackground from "./pages/InteractiveBackground"
import Contact from "./pages/Contact";

const App = () => {
  console.log("inside the app");

  return (
    <div className="relative w-full min-h-screen bg-richblack-900 font-inter">

      {/* Global Interactive Background */}
      <InteractiveBackground />

      {/* Actual Application */}
      <div className="relative z-10 flex min-h-screen w-full flex-col">

        {/* Navbar */}
        <Navbar />

        {/* Pages */}
        <div className="flex-1 w-full flex justify-center">

          <Routes>

            {/* Home */}
            <Route path="/" element={<Home />} />

            {/* Authentication */}
            <Route path="/login" element={ <OpenRoute> <Login /> </OpenRoute> } />

            <Route path="/signup" element={ <OpenRoute> <Signup /> </OpenRoute> } />

            <Route path="/verify-email" element={ <OpenRoute> <VerifyEmail /> </OpenRoute> } />

            <Route path="/forgot-password" element={<ForgotPassword />} />

            <Route path="/update-password/:token" element={<UpdatePassword />} />

            <Route path="/reset-password-success" element={<ResetPasswordSucceess />} />

            {/* Other Pages */}
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />

            {/* Protected Route */} 
            <Route path="/dashboard" element={ <PrivateRoute> <Dashboard /> </PrivateRoute> } />

            {/* 404 */}
            <Route path="*" element={<Error />} />

          </Routes>

        </div>
      </div>

    </div>
  );
};

export default App;