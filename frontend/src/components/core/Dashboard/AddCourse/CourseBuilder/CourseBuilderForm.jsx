import React from 'react'
import { useDispatch } from 'react-redux'
import { setEditCourse, setStep } from '../../../../../redux/slices/courseSlice';

const CourseBuilderForm = () => {
    const dispatch=useDispatch();


  return (
    <div className='text-white'>
        <button onClick={()=>{

            dispatch(setStep(1));
            dispatch(setEditCourse(true));

        }}>back</button>
    </div>
  )
}

export default CourseBuilderForm