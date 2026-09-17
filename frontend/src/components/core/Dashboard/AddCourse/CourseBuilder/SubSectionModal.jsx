import React, { useEffect, useState } from "react"
import { useForm } from "react-hook-form"
import { RxCross2 } from "react-icons/rx"
import { useDispatch, useSelector } from "react-redux"
import toast from "react-hot-toast"
import Upload from "../Upload"
import { setCourse } from "../../../../../redux/slices/courseSlice"
import { createSubSection, updateSubSection, } from "../../../../../services/operations/courseDetailsAPI"

const SubSectionModal = ({ modalData, setModalData, view = false, add = false, edit = false, }) => {

  console.log("modalData",modalData);

  const [loading, setLoading] = useState(false)

  const { token } = useSelector((state) => state.auth)
  const { course } = useSelector((state) => state.course)

  const dispatch = useDispatch()

  const { register, handleSubmit, reset, setValue, formState: { errors }, getValues, } = useForm()

  useEffect(() => {
    if (view || edit) {
      setValue("lectureTitle", modalData.title)
      setValue("lectureVideo", modalData.videoUrl)
      setValue("lectureDesc", modalData.description)
    }
  }, [])

  const isFormUpdated = () => {
    const currentValues = getValues()

    if (
      currentValues.lectureTitle !== modalData.title ||
      currentValues.lectureVideo !== modalData.videoUrl ||
      currentValues.lectureDesc !== modalData.description
    ) {
      return true
    } else {
      return false
    }
  }

  // handle the editing of subsection
  const handleEditSubsection = async () => {

    const currentValues = getValues()
    const formData = new FormData();

    formData.append("sectionId", modalData.sectionId)
    formData.append("subSectionId", modalData._id)

    if (currentValues.lectureTitle !== modalData.title) {
      formData.append("title", currentValues.lectureTitle)
    }

    if (currentValues.lectureDesc !== modalData.description) {
      formData.append("description", currentValues.lectureDesc)
    }

    if (currentValues.lectureVideo !== modalData.videoUrl) {
      formData.append("video", currentValues.lectureVideo);
    }

    setLoading(true);

    const result = await updateSubSection(formData, token)

    if (result) {

      const updatedCourseContent = course.courseContent.map((section) =>
        section._id === modalData.sectionId ? result : section
      )

      const updatedCourse = {
        ...course,
        courseContent: updatedCourseContent,
      }

      dispatch(setCourse(updatedCourse));
    }

    setModalData(null)
    setLoading(false)
  }

  async function onSubmit(data) {

    console.log("inside the subsection submit form",data);

    if (view) {
      return
    }

    if (edit) {

      if (!isFormUpdated()) {
        toast.error("No changes made to the form")
      } else {
        handleEditSubsection()
      }

      return
    }

    const formData = new FormData()

    formData.append("sectionId", modalData);
    formData.append("title", data.lectureTitle)
    formData.append("description", data.lectureDesc)
    formData.append("video", data.lectureVideo)

    setLoading(true);

    for (const [key, value] of formData.entries()) {
      console.log("formData",key, value);
    }

    const result = await createSubSection(formData, token);

    if (result) {

      console.log("result",result);
      console.log("course before",course);

      const updatedCourseContent = course.courseContent.map((section) =>
        section._id === modalData ? result : section
      )

      console.log("updatedCourseContent",updatedCourseContent)

      const updatedCourse = {
        ...course,
        courseContent: updatedCourseContent,
      }

      dispatch(setCourse(updatedCourse));
      console.log("course after",updatedCourse);
    }

    setModalData(null);
    setLoading(false);
  }

  return (
    <div className="fixed inset-0 z-1000 grid h-screen w-screen place-items-center overflow-auto bg-richblack-900/50 backdrop-blur-sm">

      <div className="my-10 w-11/12 max-w-175 rounded-lg border border-richblack-400 bg-richblack-800">

        {/* Modal Header */}
        <div className="flex items-center justify-between rounded-t-lg bg-richblack-700 p-5">

          <p className="text-xl font-semibold text-richblack-5">
            {view && "Viewing"}{" "}
            {add && "Adding"}{" "}
            {edit && "Editing"} Lecture
          </p>

          <button
            type="button"
            onClick={() => (loading ? {} : setModalData(null))}
          >
            <RxCross2 className="cursor-pointer text-2xl text-richblack-5" />
          </button>

        </div>

        {/* Modal Form */}
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-8 px-8 py-10" >

          {/* Lecture Video Upload */}
          <Upload
            name="lectureVideo"
            label="Lecture Video"
            register={register}
            setValue={setValue}
            errors={errors}
            video={true}
            viewData={view ? modalData.videoUrl : null}
            editData={edit ? modalData.videoUrl : null}
          />

          {/* Lecture Title */}
          <div className="flex flex-col space-y-2">

            <label className="text-sm text-richblack-5" htmlFor="lectureTitle" >
              Lecture Title{" "}

              {!view && (
                <sup className="text-pink-200">*</sup>
              )}
            </label>

            <input
              disabled={view || loading}
              id="lectureTitle"
              placeholder="Enter Lecture Title"
              {...register("lectureTitle", {
                required: true,
              })}
              className="form-style w-full"
            />

            {errors.lectureTitle && (
              <span className="ml-2 text-xs tracking-wide text-pink-200">
                Lecture title is required
              </span>
            )}

          </div>

          {/* Lecture Description */}
          <div className="flex flex-col space-y-2">

            <label className="text-sm text-richblack-5" htmlFor="lectureDesc" >
              Lecture Description{" "}
              {!view && (
                <sup className="text-pink-200">*</sup>
              )}
            </label>

            <textarea
              disabled={view || loading}
              id="lectureDesc"
              placeholder="Enter Lecture Description"
              {...register("lectureDesc", {
                required: true,
              })}
              className="form-style min-h-32.5 w-full resize-x-none"
            />

            {errors.lectureDesc && (
              <span className="ml-2 text-xs tracking-wide text-pink-200">
                Lecture Description is required
              </span>
            )}

          </div>

          {/* Save Button */}
       
          {!view && (
            <div className="flex justify-end">
              <button
                type="submit"
                disabled={loading}
                className="cursor-pointer rounded-md bg-yellow-50 px-5 py-2 font-semibold text-richblack-900"
              >
                {loading
                  ? "Loading.."
                  : edit
                  ? "Save Changes"
                  : "Save"}
              </button>
            </div>
          )}

        </form>

      </div>

    </div>
  )
}

export default SubSectionModal