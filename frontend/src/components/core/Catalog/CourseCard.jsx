import { useEffect, useState } from "react";
import RatingStars from "../../common/RatingStars";
import { Link } from "react-router-dom";
import GetAvgRating from "../../../utils/avgRating";

function CourseCard({ course, Height }) {
  const [avgReviewCount, setAvgReviewCount] = useState(0)

  useEffect(() => {
    const count = GetAvgRating(course.ratingAndReviews)
    setAvgReviewCount(count)
  }, [course])

  return (
    <Link to={`/courses/${course._id}`}>
      <div className="group overflow-hidden rounded-xl bg-richblack-800 transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_8px_30px_rgba(0,0,0,0.35)]">
        
        {/* Thumbnail */}
        <div className="overflow-hidden rounded-t-xl">
          <img
            src={course?.thumbnail}
            alt="Course Thumbnail"
            className={`${Height} w-full object-cover transition-transform duration-500 group-hover:scale-105`}
          />
        </div>

        {/* Content */}
        <div className="flex flex-col gap-3 p-4">
          {/* Course Name */}
          <h3 className="line-clamp-2 text-lg font-semibold text-richblack-5">
            {course?.courseName}
          </h3>

          {/* Instructor */}
          <p className="text-sm text-richblack-300">
            {course?.instructor?.firstName}{" "}
            {course?.instructor?.lastName}
          </p>

          {/* Rating */}
          <div className="flex items-center gap-2">
            <span className="font-semibold text-yellow-50">
              {avgReviewCount || 0}
            </span>

            <RatingStars Review_Count={avgReviewCount} />

            <span className="text-sm text-richblack-400">
              ({course?.ratingAndReviews?.length} Ratings)
            </span>
          </div>

          {/* Price */}
          <p className="mt-1 text-2xl font-bold text-yellow-50">
            ₹ {course?.price}
          </p>
        </div>
      </div>
    </Link>
  )
}

export default CourseCard