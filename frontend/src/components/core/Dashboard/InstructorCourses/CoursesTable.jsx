import React from 'react'
import { useState } from 'react';
import ConfirmationModal from '../../../common/ConfirmationModal';
import { Table, Thead, Tbody, Tr, Th, Td, } from "react-super-responsive-table"
import { COURSE_STATUS } from '../../../../utils/constants';
import { deleteCourse } from '../../../../services/operations/courseDetailsAPI';
import { useSelector } from 'react-redux';
import { getInstructorCourses } from '../../../../services/operations/courseDetailsAPI';
import { useNavigate } from 'react-router-dom';

const CoursesTable = ({courses,setCourses}) => {

     const [confirmationModal, setConfirmationModal] = useState(null);
    console.log("courses inside the courseTable",courses);
    const {token}=useSelector(state=>state.auth);
    const [loading,setLoading]=useState(false);
    const navigate=useNavigate();

    async function handleDeleteCourse(courseId){
        setLoading(true);

       await deleteCourse(courseId,token);
       const result=await getInstructorCourses(token);
        if(result){
            setCourses(result);
        }

        setConfirmationModal(null);
        setLoading(false);

    }

  return (
    <div className='text-white'>
       <Table>
         <Thead>
            <Tr>
                <Th>Courses</Th>
                <Th>Duration</Th>
                <Th>Price</Th>
                <Th>Actions</Th>
            </Tr>
         </Thead>
         <Tbody>
            {
                courses.length===0 ? (
                    <Tr>
                        <Td>No Courses Found</Td>
                        
                    </Tr>
                )
                : courses.map((course)=>{
                    return <Tr key={course._id} className='flex'>
                        <Td>
                            <img src={course.thumbnail}/>
                            <div className='flex flex-col'>
                                <p>{course.courseName}</p>
                                <p>{course.courseDescription}</p>
                                <p>Created:</p>
                                <p>{
                                    course.status ===COURSE_STATUS.DRAFT ? <p>Draft</p>:<p>published</p>}</p>
                            </div>

                        </Td>
                        <Td> 2 hr 30 min</Td>
                        <Td> {course.price}</Td>
                        <Td>
                            <button onClick={()=>navigate(`/dashboard/edit-course/${course._id}`)}>Edit</button>
                            <button onClick={()=> setConfirmationModal({
                                text1: "Do you want to delete this course?",
                                text2: "All the data related to this course will be deleted",
                                btn1Text: "Delete",
                                btn2Text: "Cancel",
                
                                btn1Handler:()=>handleDeleteCourse(course._id)  ,
                
                                btn2Handler: () => {
                                setConfirmationModal(null);
                                },
                            })}>delete</button>
                        </Td>

                    </Tr>
                })
            }
         </Tbody>
       </Table>

        {/* Confirmation Modal */} 
        { confirmationModal && ( <ConfirmationModal modalData={confirmationModal} /> )}
    </div>
  )
}

export default CoursesTable