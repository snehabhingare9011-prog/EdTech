import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { HiOutlineCurrencyRupee } from "react-icons/hi"
import { fetchCourseCategories } from "../../../../../services/operations/courseDetailsAPI";
import ChipInput from "./ChipInput";
import Upload from "./Upload";
import RequirementsField from "./RequirementsField";

const CourseInformation = () => {
  const { register, handleSubmit, setValue, getValues, formState: { errors }, } = useForm();
  const [loading, setLoading] = useState(false);
  const [courseCategories, setCourseCategories] = useState([]);

  const getCategories = async () => {
    try {
      setLoading(true);

      const categories = await fetchCourseCategories();
      setCourseCategories(categories);

    } catch (error) {
      console.log("error during fetch course category", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getCategories();
  }, []);

  return (
    <div className="text-white mt-9">
      <form className="space-y-8 rounded-md border border-richblack-700 bg-richblack-800 p-6">

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

            {!loading &&
              courseCategories?.map((category, indx) => (
                <option key={indx} value={category?.name}>
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
          getValues={getValues}
        />

      </form>
    </div>
  );
};

export default CourseInformation;