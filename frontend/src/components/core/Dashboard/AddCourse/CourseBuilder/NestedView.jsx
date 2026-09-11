import React, { useState } from 'react'
import { useDispatch ,useSelector} from 'react-redux';
import { RxDropdownMenu } from "react-icons/rx";
import { MdEdit } from "react-icons/md";
import { RiDeleteBin6Line } from "react-icons/ri";
import { deleteSection } from "../../../../../services/operations/courseDetailsAPI";
import { setCourse } from '../../../../../redux/slices/courseSlice';
import { BiSolidDownArrow } from "react-icons/bi";
import ConfirmationModal from '../../../../common/ConfirmationModal';

const NestedView = ({handleChangeEditSectionName}) => {

  const {course}=useSelector(state=>state.course);
  const {token}=useSelector(state=>state.auth);
  const dispatch=useDispatch();
  const [addSubSection,setAddSubSection]=useState(null);
  const [viewSubSection,setViewSubSection]=useState(null);
  const [editSubSection,setEditSubSection]=useState(null);

  const [confirmationModal,setConfirmationModal]=useState(null);

  const handleDeleteSection=async (sectionId)=>{

    const result=await deleteSection({sectionId:sectionId,courseId:course._id},token);
    if(result){
      console.log("course",course);
      console.log("result",result);
      dispatch(setCourse(result));
      setConfirmationModal(null);
    }


  }

  return (
    <>
    <div>

     <div className='mt-10 rounded-lg  bg-richblack-700 p-6 px-8'>
      {
        course?.courseContent?.map((section)=>(
          <details key={section._id} open>
            
            <summary className='flex item-center justify-between gap-x-3 border-b-2'>
              <div className="flex item-center gap-x-3">
                <RxDropdownMenu/>
                <p>{section.sectionName}</p>
              </div>
              <div className="flex item-center gap-x-3">
                <button onClick={()=>{
                  handleChangeEditSectionName( section._id,section.sectionName)
                }}><MdEdit/></button>

                <button onClick={() =>
                  setConfirmationModal({
                    text1: "Delete this Section?",
                    text2: "All the lectures in this section will be deleted",
                    btn1Text: "Delete",
                    btn2Text: "Cancel",
      
                    btn1Handler:()=>handleDeleteSection(section._id),
      
                    btn2Handler: () => {
                      setConfirmationModal(null);
                    },
                  })
                }><RiDeleteBin6Line/></button>
                <span>|</span>
                <BiSolidDownArrow  className={`text-xl text-richblack-300`}/>
  

              </div>
            </summary>

            <p>sneha</p>

          </details>

        ))
      }
     </div>

    </div>

    {confirmationModal && (
      <ConfirmationModal modalData={confirmationModal} />
    )}

    </>
  )
}

export default NestedView