import React from "react";

const CourseCard = ({ course, index ,currentCard,setCurrentCard}) => {
  console.log("courseCard")
 

  return (
    <article
      className={`
        relative
        h-[260px]
        w-full
        overflow-hidden
        rounded-md
        border
        border-richblack-700
        transition-all
        duration-200
        hover:-translate-y-1
        ${
          currentCard===index
            ? "bg-white text-richblack-900"
            : "bg-richblack-800 text-white"
        }
      `}
      onClick={()=>setCurrentCard(index)}
    >

      {/* Course Content */}
      <div className="p-6">

        <h3 className="text-xl font-semibold">
          {course.heading}
        </h3>

        <p
          className={`
            mt-3
            text-sm
            leading-6
            ${
              currentCard===index
                ? "text-richblack-600"
                : "text-richblack-200"
            }
          `}
        >
          {course.description}
        </p>

      </div>

      {/* Bottom Section */}
      <div
        className={`
          absolute
          bottom-0
          left-0
          flex
          w-full
          justify-between
          border-t
          border-dashed
          px-6
          py-4
          text-sm
          ${
            currentCard===index
              ? "border-richblack-300 text-richblack-600"
              : "border-richblack-500 text-richblack-200"
          }
        `}
      >
        <span>
          {course.level}
        </span>

        <span>
          {course.lessonNumber} Lessons
        </span>
      </div>

    </article>
  );
};

export default CourseCard;