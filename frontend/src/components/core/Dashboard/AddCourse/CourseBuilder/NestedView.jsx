import React, { useState } from 'react'
import { useDispatch ,useSelector} from 'react-redux';
import { RxDropdownMenu } from "react-icons/rx";
import { MdEdit } from "react-icons/md";
import { RiDeleteBin6Line } from "react-icons/ri";
import { deleteSection ,deleteSubSection} from "../../../../../services/operations/courseDetailsAPI";
import { setCourse } from '../../../../../redux/slices/courseSlice';
import { BiSolidDownArrow, BiTrash } from "react-icons/bi";
import ConfirmationModal from '../../../../common/ConfirmationModal';
import { AiOutlinePlus } from "react-icons/ai";
import SubSectionModal from './SubSectionModal';

const NestedView = ({handleChangeEditSectionName}) => {

  const {course}=useSelector(state=>state.course);
  const {token}=useSelector(state=>state.auth);
  const dispatch=useDispatch();
  const [addSubSection,setAddSubSection]=useState(null);
  const [viewSubSection,setViewSubSection]=useState(null);
  const [editSubSection,setEditSubSection]=useState(null);
  const [confirmationModal,setConfirmationModal]=useState(null);

 

  const handleDeleteSubSection=async(subSectionId,sectionId)=>{

    const result=await deleteSubSection({subSectionId:subSectionId,sectionId:sectionId},token);
      if (result) {

      console.log("result",result);
      console.log("course before",course);

      const updatedCourseContent = course.courseContent.map((section) =>
        section._id === sectionId ? result : section
      )
      const updatedCourse = { ...course, courseContent: updatedCourseContent }
      dispatch(setCourse(updatedCourse))

      console.log("course after",updatedCourse)
    }
    setConfirmationModal(null);

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

            <div>
              {
                section.subSection.map((data)=>(
                  <div key={data._id} onClick={()=>setViewSubSection(data)} className='flex items-center justify-between gap-x-3 border-b-2'>
                    <div className="flex items-center gap-x-2" >
                      <RxDropdownMenu/>
                      <p>{data.title}</p>

                    </div>
                    <div className="flex items-center gap-x-2">
                      <button onClick={(e)=>{e.stopPropagation(); setEditSubSection({...data,sectionId:section._id})}}>
                        <MdEdit/>

                      </button>
                      <button onClick={(e) =>{
                        e.stopPropagation()
                        setConfirmationModal({
                          text1: "Delete this Sub-Section?",
                          text2: "This lecture will be deleted",
                          btn1Text: "Delete",
                          btn2Text: "Cancel",
            
                          btn1Handler:()=>handleDeleteSubSection(data._id,section._id),
            
                          btn2Handler: () => {
                            setConfirmationModal(null);
                          },
                        })}
                      }>
                        <RiDeleteBin6Line/>
                      </button>

                    </div>


                  </div>

                ))
              }

              <button className='flex items-center mt-4 gap-x-2 text-yellow-50' onClick={()=>setAddSubSection(section._id)}>
                <AiOutlinePlus></AiOutlinePlus>
                <p> Add Lecture</p>
              </button>

            </div>

            {
              addSubSection?
              (<SubSectionModal 
                modalData={addSubSection}
                setModalData={setAddSubSection}
                add={true}
              />)
              :viewSubSection?
              (<SubSectionModal
                modalData={viewSubSection}
                setModalData={setViewSubSection}
                view={true}
              />)
              :editSubSection?
              (<SubSectionModal
                modalData={editSubSection}
                setModalData={setEditSubSection}
                edit={true}
              />)
              :<div></div>
            }

           

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