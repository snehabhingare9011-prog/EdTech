import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { BuyCourse } from '../services/operations/studentFeaturesAPI';

const CourseDetails = () => {

  const {token} =useSelector(state=>state.auth);
  const {courseId}=useParams();
  const {user}=useSelector(state=>state.profile);
  const navigate=useNavigate();
  const dispatch=useDispatch();

  console.log("muze dekni hai courseID",courseId,user);

  function handleBuyCourse(){

    if(token){
      BuyCourse(token,[courseId],user,navigate,dispatch);
      return;
    }

  }

  return (
    <div>
        <button onClick={()=>handleBuyCourse()}
          className="text-black bg-yellow-50 font-bold p-3 border rounded-sm mt-10" >
            Buy Now
        </button>
    </div>
  )
}

export default CourseDetails