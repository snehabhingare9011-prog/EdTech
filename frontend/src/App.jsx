import {Routes,Route} from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Navbar from "./components/common/Navbar";
import About from "./pages/About";
import OpenRoute from "./components/core/Authentication/OpenRoute";
import Dashboard from "./pages/Dashboard";
import PrivateRoute from "./components/core/Authentication/PrivateRoute";

const App =()=>{
  console.log("inside the app")
  return <div className='w-full min-h-screen bg-richblack-900 flex flex-col font-inter items-center'>

    <Navbar/>

    <Routes>
      <Route path="/" element={<Home/>}></Route>
      <Route path="/login" element={<OpenRoute><Login/></OpenRoute>}></Route>
      <Route path="/signup" element={<Signup/>}></Route>
      <Route path="/about" element={<About/>}></Route>
      <Route path="/dashboard" element={<PrivateRoute><Dashboard></Dashboard></PrivateRoute>}></Route>

      

    </Routes>
    
  </div>


}

export default App;