import React from 'react'
import { useForm } from 'react-hook-form'
import { useState } from 'react';
import { GoPlusCircle } from "react-icons/go";
import { useDispatch, useSelector } from 'react-redux';
import NestedView from './NestedView';
import { MdNavigateNext } from "react-icons/md";
import toast from "react-hot-toast"
import { setStep , setEditCourse, setCourse} from '../../../../../redux/slices/courseSlice';
import { createSection,updateSection } from '../../../../../services/operations/courseDetailsAPI';

const CourseBuilderForm = () => {
  console.log("inside the courseBuilder")

  const {register,handleSubmit, formState:{errors}, setValue, getValues }=useForm();
  const [editSectionName,setEditSectionName]=useState(null);
  const {course}=useSelector(state=>state.course);
  const [loading,setLoading]=useState(false);
  const {token} =useSelector(state=>state.auth);
  const dispatch=useDispatch();

  function cancelEdit(){
    setEditSectionName(null);
    setValue("sectionName","");

  }

  function goBack(){

    dispatch(setStep(1));
    dispatch(setEditCourse(true));

    

  }

  function goToNext(){

    if(course.courseContent.length===0){
      toast.error("Please add atleast one Section");
      return;
    }

    if(course.courseContent.some((section)=>section.subSection.length===0)){
       toast.error("Please add atleast one lecture in each section");
       return 
    }

    dispatch(setStep(3));

  }

  const handleChangeEditSectionName=(sectionId,sectionName)=>{
    console.log("aa bhi rhe ho ya nahi ",sectionId,sectionName)
    if(editSectionName===sectionId){
      cancelEdit();
      return;
    }
    setValue("sectionName", sectionName);
    setEditSectionName(sectionId);
  }

 async function onSubmit(data){
  console.log("insie the onSubmit");

    setLoading(true);
    let result;

    if(editSectionName){

      result=await updateSection({
        sectionName:data.sectionName,
        sectionId:editSectionName,
        courseId:course._id
      },token); 

    }else{

      result=await createSection({
        sectionName:data.sectionName,
        courseId:course._id
      },token);
      
    }
    if(result){
      setEditSectionName(null);
      dispatch(setCourse(result));
      setValue("sectionName","");

      console.log("result",result);
      
    }
   
    setLoading(false);

  }

  return (
    <div className='text-white'>

      <p>Course Builder</p>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div>
          <label htmlFor='sectionName'>Section name<sup>*</sup></label>
          <input
            id="sectionName"
            disabled={loading}
            placeholder="Add section name"
            {...register("sectionName", {
              required: true
            })}
            className="w-full border-2"
          />

          {errors.sectionName && <p>Section name is Required</p>}

        </div>

        <div className='mt-10 flex gap-3  '>
          <button
            type="submit"
            disabled={loading}
            className="border p-2 flex gap-1 items-center text-amber-300">
            {editSectionName ? "edit section Name" : "create Section"}
            <GoPlusCircle />
          </button>

          {editSectionName && <button type="button" onClick={cancelEdit} className='text-sm text-richblack-300 underline' >
            Cancel edit</button>}
        </div>
  

      </form>

      { course.courseContent.length>0 && <NestedView handleChangeEditSectionName={handleChangeEditSectionName}/> }

      <div className='flex justify-end gap-x-3 mt-10 '>

        <button onClick={goBack} className='rounded-md cursor-pointer flex item-center border p-3 bg-amber-600'>Back</button>
        <button onClick={goToNext} className='flex rounded-md border p-3 bg-amber-600'>Next <MdNavigateNext className="text-xl " /></button>

      </div>
       
    </div>
  )
}

export default CourseBuilderForm