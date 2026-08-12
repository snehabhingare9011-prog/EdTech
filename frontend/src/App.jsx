import {Routes,Route} from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Navbar from "./components/common/Navbar";
import About from "./pages/About";

const App =()=>{
  console.log("inside the app")
  return <div className='w-full min-h-screen bg-richblack-900 flex flex-col font-inter items-center'>

    <Navbar/>

    <Routes>
      <Route path="/" element={<Home/>}></Route>
      <Route path="/login" element={<Login/>}></Route>
      <Route path="/signup" element={<Signup/>}></Route>
      <Route path="/about" element={<About/>}></Route>

    </Routes>
    
  </div>


}

export default App;