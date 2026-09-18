import React, { useEffect,useState } from 'react'
import { getInstructorCourses } from '../../../../services/operations/courseDetailsAPI';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import CoursesTable from '../InstructorCourses/CoursesTable';

const MyCourses = () => {

    const [courses,setCourses]=useState(null);
    const {token}=useSelector(state=>state.auth);
    const navigate=useNavigate();

    useEffect(()=>{
        const fetchCourses=async()=>{
            const result=await getInstructorCourses(token);
            if(result){
                setCourses(result);
            }      
        }

        fetchCourses();
    },[]);

  return (
    <div className='text-white'>
        <div className='flex gap-3'>
            <h1>My Courses</h1>
            <button type="button" onClick={()=>navigate("/dashboard/add-course")}>Add Courses +</button>
        </div>
        {
            courses && <CoursesTable courses={courses} setCourses={setCourses}/>
        }
    </div>
  )
}

export default MyCourses