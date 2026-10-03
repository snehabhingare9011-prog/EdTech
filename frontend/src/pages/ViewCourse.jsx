import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Outlet, useParams } from "react-router-dom";
import CourseReviewModal from "../components/core/viewCourse/CourseReviewModal";
import VideoDetailsSidebar from "../components/core/viewCourse/VideoDetailsSidebar"
import { getFullDetailsOfCourse } from "../services/operations/courseDetailsAPI";

import {
  setCompletedLectures,
  setCourseSectionData,
  setEntireCourseData,
  setTotalNoOfLectures,
} from "../redux/slices/viewCourseSlice";

export default function ViewCourse() {
  const { courseId } = useParams();
  const { token } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const [reviewModal, setReviewModal] = useState(false);

  useEffect(() => {
     
    (async () => {
      const courseData = await getFullDetailsOfCourse( courseId, token );

      dispatch( setCourseSectionData( courseData?.courseDetails?.courseContent || [] ) );
      dispatch( setEntireCourseData( courseData?.courseDetails || null ) );
      dispatch( setCompletedLectures( courseData?.completedVideos || [] ) );
      dispatch( setTotalNoOfLectures( courseData?.courseDetails?.totalNoOfLectures || 0 ) );

    })();
  }, [courseId, dispatch, token]);

  return (
    <>
      <div className="relative flex min-h-[calc(100vh-66px)] w-full overflow-hidden">

        <VideoDetailsSidebar setReviewModal={setReviewModal} />

        <div className="h-[calc(100vh-66px)] flex-1 overflow-auto">
          <div className="mx-6">
            <Outlet />
          </div>
        </div>
      </div>

      {reviewModal && (
        <CourseReviewModal
          setReviewModal={setReviewModal}
        />
      )}
    </>
  );
}