import {Routes,Route} from "react-router-dom";
import Home from "./pages/Home";

const App =()=>{
  return <div className='w-full min-h-screen bg-richblack-900 flex flex-col font-inter items-center'>

    <Routes>
      <Route path="/" element={<Home/>}></Route>
    </Routes>
    
  </div>


}

export default App;