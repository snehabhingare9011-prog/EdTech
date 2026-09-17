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
  <div className="space-y-8 rounded-md border border-richblack-700 bg-richblack-800 p-6 mt-4">

    <p className="text-2xl font-semibold text-richblack-5">
      Course Builder
    </p>

    <form
      onSubmit={handleSubmit(onSubmit)}
      className="space-y-4"
    >
      <div className="flex flex-col space-y-2">

        <label
          className="text-sm text-richblack-5"
          htmlFor="sectionName"
        >
          Section Name <sup className="text-pink-200">*</sup>
        </label>

        <input
          id="sectionName"
          disabled={loading}
          placeholder="Add a section to build your course"
          {...register("sectionName", {
            required: true
          })}
          className="form-style w-full"
        />

        {errors.sectionName && (
          <span className="ml-2 text-xs tracking-wide text-pink-200">
            Section name is required
          </span>
        )}

      </div>

      <div className="flex items-end gap-x-4">

        <button
          type="submit"
          disabled={loading}
          className="flex cursor-pointer items-center gap-x-2 rounded-md border border-richblack-600 bg-richblack-700 px-5 py-2 font-semibold text-yellow-50"
        >
          {editSectionName ? "Edit Section Name" : "Create Section"}
          <GoPlusCircle />
        </button>

        {editSectionName && (
          <button
            type="button"
            onClick={cancelEdit}
            className="text-sm text-richblack-300 underline"
          >
            Cancel Edit
          </button>
        )}

      </div>
    </form>

    {course.courseContent.length > 0 && (
      <NestedView
        handleChangeEditSectionName={handleChangeEditSectionName}
      />
    )}

    {/* Next Prev Button */}
    <div className="flex justify-end gap-x-3">

      <button
        onClick={goBack}
        className="flex cursor-pointer items-center gap-x-2 rounded-md bg-richblack-300 px-5 py-2 font-semibold text-richblack-900"
      >
        Back
      </button>

      <button
        onClick={goToNext}
        className="flex cursor-pointer items-center gap-x-2 rounded-md bg-yellow-50 px-5 py-2 font-semibold text-richblack-900"
      >
        Next
        <MdNavigateNext className="text-xl" />
      </button>

    </div>

  </div>
)
}

export default CourseBuilderForm