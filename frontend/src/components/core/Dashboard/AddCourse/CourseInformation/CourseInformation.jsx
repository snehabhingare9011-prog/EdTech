import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { HiOutlineCurrencyRupee } from "react-icons/hi"
import { fetchCourseCategories } from "../../../../../services/operations/courseDetailsAPI";
import ChipInput from "./ChipInput";
import Upload from "./Upload";
import RequirementsField from "./RequirementsField";
import { useDispatch, useSelector } from "react-redux";
import { setStep } from "../../../../../redux/slices/courseSlice";
import { MdNavigateNext } from "react-icons/md";
import { addCourseDetails } from "../../../../../services/operations/courseDetailsAPI";
import { COURSE_STATUS } from "../../../../../utils/constants";
import toast from "react-hot-toast";
import { setCourse } from "../../../../../redux/slices/courseSlice";
import { editCourseDetails } from "../../../../../services/operations/courseDetailsAPI";


const CourseInformation = () => {
  const dispatch=useDispatch();
  const { register, handleSubmit, setValue, getValues, formState: { errors }, } = useForm();
  const [loading, setLoading] = useState(false);
  const [courseCategories, setCourseCategories] = useState([]);
  const {course,editCourse}=useSelector(state=>state.course);
  const {token}=useSelector(state=>state.auth)

  const getCategories = async () => {
    try {
      setLoading(true);
      const categories = await fetchCourseCategories();
      setCourseCategories(categories);

      //  // if form is in edit mode
      if (editCourse) {

        console.log("inside the editCourse");
        
        setValue("courseName", course.courseName)
        setValue("courseDescription", course.courseDescription)
        setValue("coursePrice", course.price)
        setValue("tag", course.tag)
        setValue("courseBenefits", course.whatYouWillLearn)
        setValue("category", course.category)
        setValue("courseRequirements", course.instructions)
        setValue("courseImage", course.thumbnail)
      }

    } catch (error) {
      console.log("error during fetch course category", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getCategories();
  }, []);

  const isFormUpdated=()=>{
     
    let currentValues=getValues();
    console.log("currentValues",currentValues);
    console.log("course",course);

    if(currentValues.category!==course.category||
      currentValues.courseBenefits!==course.whatYouWillLearn||
      currentValues.courseDescription!==course.courseDescription||
      currentValues.courseImage!==course.thumbnail||
      currentValues.courseName!==course.courseName||
      currentValues.coursePrice!==course.price||
      JSON.stringify(currentValues.courseRequirements) !== JSON.stringify(course.instructions)||
      JSON.stringify(currentValues.tag) !== JSON.stringify(course.tag)
    ){
      return true;
    }
    else{
      return false;
    }

  }

  const onSubmit = async (data) => {
    console.log("data1",data)

    if (editCourse) {
      
      if (isFormUpdated()) {

      const currentValues = getValues()
      console.log("true ho gya");
      const formData = new FormData();
      formData.append("courseId",course._id);

      if(currentValues.courseName!==course.courseName){
        formData.append("courseName", currentValues.courseName)
      }

      if( currentValues.courseDescription!==course.courseDescription){
        formData.append("courseDescription", currentValues.courseDescription)
      }

      if(currentValues.coursePrice!==course.price){
        formData.append("price", currentValues.coursePrice)
      }

      if( JSON.stringify(currentValues.tag) !== JSON.stringify(course.tag)){
        formData.append("tag", JSON.stringify(currentValues.tag))

      }

      if( currentValues.courseBenefits!==course.whatYouWillLearn){
        formData.append("whatYouWillLearn", currentValues.courseBenefits)

      }
      
      if(currentValues.category!==course.category){
        formData.append("category", currentValues.category)
      }

      if(JSON.stringify(currentValues.courseRequirements) !== JSON.stringify(course.instructions)){
          formData.append("instructions", JSON.stringify(currentValues.courseRequirements))
      }
      
      if(currentValues.courseImage!==course.thumbnail){
        formData.append("thumbnailImage", currentValues.courseImage)
      }
      
      for (const [key, value] of formData.entries()) {
        console.log("formData",key, value);
       }
      
      setLoading(true);
      const result=await editCourseDetails(formData, token);
      setLoading(false);
      if(result){
        console.log("after edit course",result)
        dispatch(setCourse(result));
        dispatch(setStep(2));
      }else{
         toast.error("No changes made to the form")
      }
      

        return ;

      }

    
    }

    const formData = new FormData()
    formData.append("courseName", data.courseName)
    formData.append("courseDescription", data.courseDescription)
    formData.append("price", data.coursePrice)
    formData.append("tag", JSON.stringify(data.tag))
    formData.append("whatYouWillLearn", data.courseBenefits)
    formData.append("category", data.category)
    formData.append("status", COURSE_STATUS.DRAFT)
    formData.append("instructions", JSON.stringify(data.courseRequirements))
    formData.append("thumbnailImage", data.courseImage)

  //   for (const [key, value] of formData.entries()) {
  //   console.log("formData",key, value);
  // }

    setLoading(true);
    const result = await addCourseDetails(formData, token)
    console.log("result",result);
    if (result) {
      console.log("after creation of course",result);
      dispatch(setStep(2));
      dispatch(setCourse(result));
    }
    setLoading(false);
  }

  return (
    <div className="text-white mt-9">
      <form className="space-y-8 rounded-md border border-richblack-700 bg-richblack-800 p-6"
       onSubmit={handleSubmit(onSubmit)}>

        {/* Course Title */}
        <div className="flex flex-col space-y-2">
          <label
            className="text-sm text-richblack-5"
            htmlFor="courseName"
          >
            Course Title{" "}
            <sup className="text-pink-200">*</sup>
          </label>

          <input
            type="text"
            id="courseName"
            placeholder="Enter Course Title"
            {...register("courseName", {
              required: {
                value: true,
                message: "Course title is required",
              },
            })}
            className="form-style w-full"
          />

          {errors.courseName && (
            <span className="ml-2 text-xs tracking-wide text-pink-200">
              {errors.courseName.message}
            </span>
          )}
        </div>

        {/* Course Short Description */}
        <div className="flex flex-col space-y-2">
          <label
            className="text-sm text-richblack-5"
            htmlFor="courseDescription"
          >
            Course Short Description{" "}
            <sup className="text-pink-200">*</sup>
          </label>

          <textarea
            id="courseDescription"
            placeholder="Enter Description"
            {...register("courseDescription", {
              required: {
                value: true,
                message: "Course Description is required",
              },
            })}
            className="form-style resize-x-none min-h-32.5 w-full"
          />

          {errors.courseDescription && (
            <span className="ml-2 text-xs tracking-wide text-pink-200">
              {errors.courseDescription.message}
            </span>
          )}
        </div>

        {/* Course Price */}
    
        <div className="flex flex-col space-y-2">
        <label className="text-sm text-richblack-5" htmlFor="coursePrice">
            Course Price <sup className="text-pink-200">*</sup>
        </label>

        <div className="relative">
            <input
            id="coursePrice"
            placeholder="Enter Course Price"
            {...register("coursePrice", {
                required: true,
                valueAsNumber: true,
                pattern: {
                value: /^(0|[1-9]\d*)(\.\d+)?$/,
                },
            })}
            className="form-style w-full pl-12!"
            />

            <HiOutlineCurrencyRupee
            className="absolute left-3 top-1/2 -translate-y-1/2 text-2xl text-richblack-400"
            />
        </div>

        {errors.coursePrice && (
            <span className="ml-2 text-xs tracking-wide text-pink-200">
            Course Price is required
            </span>
        )}
        </div>

        {/* Course Category */}
        <div className="flex flex-col space-y-2">
          <label className="text-sm text-richblack-5" htmlFor="category" > Course Category{" "} <sup className="text-pink-200">*</sup> </label>
          <select
            id="category"
            {...register("category", {
              required: "Category is required",
            })}
            defaultValue=""
            className="form-style w-full"
          >
            <option value="" disabled>
              Choose a Category
            </option>

            {!loading && courseCategories.length === 0 && (
              <option disabled>No categories available</option>
            )}

            {!loading &&
              courseCategories.map((category, indx) => (
                <option key={indx} value={category?._id}>
                  {category?.name}
                </option>
              ))}
          </select>

          {errors.category && (
            <span className="ml-2 text-xs tracking-wide text-pink-200">
              {errors.category.message}
            </span>
          )}
        </div>

        {/* Course Tags */}
        <ChipInput
          label="Tags"
          name="tag"
          placeholder="Enter Tags and press Enter"
          register={register}
          errors={errors}
          setValue={setValue}
          getValues={getValues}
        />

        {/* Course Thumbnail Image */}
        <Upload
          name="courseImage"
          label="Course Thumbnail"
          errors={errors}
          register={register}
          setValue={setValue}
        />

        {/* Benefits of the course */}
        <div className="flex flex-col space-y-2">
          <label
            className="text-sm text-richblack-5"
            htmlFor="courseBenefits"
          >
            Benefits of the course{" "}
            <sup className="text-pink-200">*</sup>
          </label>

          <textarea
            id="courseBenefits"
            placeholder="Enter benefits of the course"
            {...register("courseBenefits", { required: true })}
            className="form-style resize-x-none min-h-32.5 w-full"
          />

          {errors.courseBenefits && (
            <span className="ml-2 text-xs tracking-wide text-pink-200">
              Benefits of the course is required
            </span>
          )}
        </div>

        {/* Requirements/Instructions */}
        <RequirementsField
          name="courseRequirements"
          label="Requirements/Instructions"
          register={register}
          setValue={setValue}
          errors={errors}
        />


         {/* Next Button */}
      <div className="flex justify-end gap-x-2">
        {editCourse && (
          <button
            type="button"
            onClick={() => dispatch(setStep(2))}
            disabled={loading}
            className={`flex cursor-pointer items-center gap-x-2 rounded-md bg-richblack-300 py-2 px-5 font-semibold text-richblack-900`}
          >
            Continue Wihout Saving
          </button>
        )}
      
        <button
          type="submit"
          disabled={loading}
          className="flex items-center cursor-pointer gap-x-2 rounded-md bg-yellow-50 px-5 py-2 font-semibold text-richblack-900"
        >
          {editCourse? "Save Changes":"Next"}
          <MdNavigateNext className="text-xl" />
        </button>

      </div>


       



      </form>
    </div>
  );
};

export default CourseInformation;