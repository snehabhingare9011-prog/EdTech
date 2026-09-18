import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useParams } from "react-router-dom"
import RenderSteps from "../AddCourse/RenderSteps";
import Loader from "../../../common/Loader";
import { setEditCourse,setCourse } from "../../../../redux/slices/courseSlice";
import { getFullDetailsOfCourse } from "../../../../services/operations/courseDetailsAPI";

export default function EditCourse() {

  const dispatch = useDispatch()
  const { courseId } = useParams();
  const { course } = useSelector((state) => state.course)
  const { token } = useSelector((state) => state.auth)


  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchCourse = async () => {
      setLoading(true)

      const result = await getFullDetailsOfCourse(courseId, token);
      console.log("result of course",result);

      if (result?.data) {

        dispatch(setEditCourse(true));
        dispatch(setCourse(result.data));
      }

      setLoading(false)
    }

    fetchCourse()

  }, [])

  if (loading) {
    return (
      <div className="flex h-full w-full items-center justify-center">
        <Loader />
      </div>
    )
  }

  return (
    <div>
      <h1 className="mb-14 text-3xl font-medium text-richblack-5">
        Edit Course
      </h1>

      <div className="mx-auto max-w-150">
        {course ? (
          <RenderSteps />
        ) : (
          <p className="mt-14 text-center text-3xl font-semibold text-richblack-100">
            Course not found
          </p>
        )}
      </div>
    </div>
  )
}