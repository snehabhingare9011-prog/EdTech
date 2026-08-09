import React from "react";
import CourseCard from "./CourseCard";

const CourseGrid = ({
  courses,
  currentCard,
  setCurrentCard,
}) => {
  return (
    <div
      className="
        mx-auto
        mt-12
        grid
        w-11/12
        max-w-maxContent
        grid-cols-1
        gap-6
        sm:grid-cols-2
        lg:grid-cols-3
      "
    >
      {courses.map((course, index) => (
        <CourseCard
          key={course.heading}
          course={course}
          index={index}
          currentCard={currentCard}
          setCurrentCard={setCurrentCard}
        />
      ))}
    </div>
  );
};

export default CourseGrid;