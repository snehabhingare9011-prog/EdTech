import React from "react";
import { IoMdPeople } from "react-icons/io";
import { TbBinaryTree2Filled } from "react-icons/tb";

const CourseCard = ({
  course,
  index,
  currentCard,
  setCurrentCard,
}) => {
  const isSelected = currentCard === index;

  return (
    <article
      onClick={() => setCurrentCard(index)}
      className={`
        group
        relative
        flex
        h-[280px]
        w-full
        cursor-pointer
        select-none
        flex-col
        justify-between
        overflow-hidden
        rounded-sm
        transition-all
        duration-300

        ${
          isSelected
            ? `
              bg-white
              text-richblack-900
              shadow-[12px_12px_0px_#FFD60A]
            `
            : `
              bg-richblack-800
              text-white
              hover:-translate-y-1
              hover:bg-richblack-700
            `
        }
      `}
    >

      {/* ================= CARD CONTENT ================= */}
      <div className="flex flex-col gap-3 px-6 pt-6">

        <h3
          className={`
            text-xl
            font-semibold
            ${
              isSelected
                ? "text-richblack-900"
                : "text-white"
            }
          `}
        >
          {course.heading}
        </h3>

        <p
          className={`
            text-sm
            leading-6
            ${
              isSelected
                ? "text-richblack-600"
                : "text-richblack-300"
            }
          `}
        >
          {course.description}
        </p>

      </div>


      {/* ================= BOTTOM SECTION ================= */}
      <div
        className={`
          text-sm
          ${
            isSelected
              ? "text-richblack-600"
              : "text-richblack-300"
          }
        `}
      >

        {/* Dashed divider */}
        <div
          className={`
            h-[2px]
            w-full
            ${
              isSelected
                ? "bg-[repeating-linear-gradient(to_right,#9E9E9E_0px,#9E9E9E_5px,transparent_5px,transparent_10px)]"
                : "bg-[repeating-linear-gradient(to_right,#6E727F_0px,#6E727F_5px,transparent_5px,transparent_10px)]"
            }
          `}
        />

        {/* Card information */}
        <div className="flex items-center justify-between px-6 py-4">

          <p className="flex items-center gap-2">
            <IoMdPeople />
            {course.level}
          </p>

          <p className="flex items-center gap-2">
            <TbBinaryTree2Filled />
            {course.lessonNumber} Lessons
          </p>

        </div>

      </div>

    </article>
  );
};

export default CourseCard;