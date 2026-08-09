import {Routes,Route} from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Signup from "./pages/Signup";

const App =()=>{
  return <div className='w-full min-h-screen bg-richblack-900 flex flex-col font-inter items-center'>

    <Routes>
      <Route path="/" element={<Home/>}></Route>
      <Route path="/login" element={<Login/>}></Route>
      <Route path="/signup" element={<Signup/>}></Route>
    </Routes>
    
  </div>


}

export default App;