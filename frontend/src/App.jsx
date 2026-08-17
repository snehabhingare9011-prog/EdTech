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
import { ResetPass2 } from "./pages/ResetPass";


const App = () => {
  console.log("inside the app");

  return (
    <div className="w-full min-h-screen bg-richblack-900 flex flex-col font-inter">

      <Navbar />

      <div className="flex-1 w-full flex justify-center">
        <Routes>

          <Route path="/" element={<Home />} />

          <Route path="/login" element={ <OpenRoute> <Login /> </OpenRoute> } />

          <Route path="/signup" element={<OpenRoute><Signup /></OpenRoute>} />

          <Route path="/about" element={<About />} />

          <Route path="/dashboard" element={ <PrivateRoute> <Dashboard /> </PrivateRoute> } />

          <Route path="/verify-email" element={ <OpenRoute> <VerifyEmail /> </OpenRoute> } />
          <Route path="/forgot-password" element={<ForgotPassword/>}></Route>
          <Route path="/update-password/:token" element={<UpdatePassword/>}></Route>
          <Route path="/reset-password-success" element={<ResetPass2/>}/>

          {/* 404 Page */}
          <Route path="*" element={<Error/>}/>


        </Routes>
      </div>

    </div>
  );
};

export default App;