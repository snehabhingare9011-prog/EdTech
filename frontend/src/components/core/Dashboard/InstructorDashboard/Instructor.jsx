import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

import { getInstructorCourses } from "../../../../services/operations/courseDetailsAPI";
import { getInstructorData } from "../../../../services/operations/profileAPI";
import Loader from "../../../common/Loader";
import InstructorChart from "./InstructorChart";

const Instructor = () => {
  const [loading, setLoading] = useState(false);

  const { token } = useSelector((state) => state.auth);
  const { user } = useSelector((state) => state.profile);

  const [courses, setCourses] = useState([]);
  const [instructorData, setInstructorData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);

      try {
        const instructorData = await getInstructorData(token);

        console.log("instructor data", instructorData);

        setInstructorData(instructorData || []);

        const result = await getInstructorCourses(token);

        console.log(
          "result inside the instructor dashboard",
          result
        );

        setCourses(result || []);
      } catch (error) {
        console.log(
          "Error fetching instructor dashboard data:",
          error
        );
      }

      setLoading(false);
    };

    fetchData();
  }, [token]);

  // Calculate total students
  const totalStudents = instructorData.reduce(
    (total, course) =>
      total + (course.totalStudentsEnrolled || 0),
    0
  );

  // Calculate total income
  const totalAmount = instructorData.reduce(
    (total, course) =>
      total + (course.totalAmountGenerated || 0),
    0
  );

  return (
    <div className="mx-auto w-[90%] max-w-[1400px] py-8 text-richblack-5">

      {/* ================= HEADER ================= */}
      <div className="mb-8">

        <h1 className="text-3xl font-bold text-richblack-5">
          Hi {user?.firstName} 👋
        </h1>

        <p className="mt-2 text-sm text-richblack-300">
          Let's start something new today.
        </p>

      </div>

      {/* ================= LOADING ================= */}
      {loading ? (

        <div className="flex min-h-[400px] items-center justify-center">
          <Loader />
        </div>

      ) : courses.length > 0 ? (

        <div className="space-y-6">

          {/* ================= TOP SECTION ================= */}
          <div className="grid grid-cols-1 gap-6 xl:grid-cols-[1fr_280px]">

            {/* ================= CHART ================= */}
            <div className="min-h-[390px] rounded-xl border border-richblack-700 bg-richblack-800 p-6 shadow-md">

              {totalAmount > 0 || totalStudents > 0 ? (

                <InstructorChart
                  courses={instructorData}
                />

              ) : (

                <div className="flex h-[330px] flex-col items-center justify-center text-center">

                  <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-richblack-700">
                    📊
                  </div>

                  <p className="text-xl font-semibold text-richblack-5">
                    Not Enough Data
                  </p>

                  <p className="mt-2 max-w-sm text-sm text-richblack-300">
                    Once students enroll in your courses,
                    you'll see your course performance here.
                  </p>

                </div>

              )}

            </div>

            {/* ================= STATISTICS ================= */}
            <div className="rounded-xl border border-richblack-700 bg-richblack-800 p-6 shadow-md">

              <div className="mb-6">

                <p className="text-lg font-semibold text-richblack-5">
                  Statistics
                </p>

                <p className="mt-1 text-xs text-richblack-300">
                  Overview of your courses
                </p>

              </div>

              <div className="space-y-4">

                {/* Total Courses */}
                <div className="rounded-lg bg-richblack-700 p-4 transition-all duration-200 hover:bg-richblack-600">

                  <p className="text-sm text-richblack-300">
                    Total Courses
                  </p>

                  <p className="mt-1 text-2xl font-bold text-richblack-5">
                    {courses.length}
                  </p>

                </div>

                {/* Total Students */}
                <div className="rounded-lg bg-richblack-700 p-4 transition-all duration-200 hover:bg-richblack-600">

                  <p className="text-sm text-richblack-300">
                    Total Students
                  </p>

                  <p className="mt-1 text-2xl font-bold text-richblack-5">
                    {totalStudents}
                  </p>

                </div>

                {/* Total Income */}
                <div className="rounded-lg bg-richblack-700 p-4 transition-all duration-200 hover:bg-richblack-600">

                  <p className="text-sm text-richblack-300">
                    Total Income
                  </p>

                  <p className="mt-1 text-2xl font-bold text-yellow-50">
                    ₹{totalAmount}
                  </p>

                </div>

              </div>

            </div>

          </div>

          {/* ================= YOUR COURSES ================= */}
          <div className="rounded-xl border border-richblack-700 bg-richblack-800 p-6 shadow-md">

            {/* Header */}
            <div className="flex items-center justify-between">

              <div>

                <p className="text-xl font-semibold text-richblack-5">
                  Your Courses
                </p>

                <p className="mt-1 text-xs text-richblack-300">
                  Recently created courses
                </p>

              </div>

              <Link
                to="/dashboard/my-courses"
                className="rounded-md px-3 py-2 text-sm font-semibold text-yellow-50 transition-all duration-200 hover:bg-richblack-700"
              >
                View All →
              </Link>

            </div>

            {/* Course Cards */}
            <div className="mt-6 grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">

              {courses.slice(0, 3).map((course) => (

                <div
                  key={course._id}
                  className="group overflow-hidden rounded-xl border border-richblack-700 bg-richblack-700 transition-all duration-300 hover:-translate-y-1 hover:border-richblack-500 hover:shadow-lg"
                >

                  {/* Thumbnail */}
                  <div className="relative overflow-hidden">

                    <img
                      src={course.thumbnail}
                      alt={course.courseName}
                      className="h-[180px] w-full object-cover transition-transform duration-300 group-hover:scale-105"
                    />

                  </div>

                  {/* Course Information */}
                  <div className="p-4">

                    <p className="line-clamp-1 text-base font-semibold text-richblack-5">
                      {course.courseName}
                    </p>

                    <div className="mt-3 flex items-center justify-between">

                      <div>
                        <p className="text-xs text-richblack-300">
                          Students
                        </p>

                        <p className="mt-1 text-sm font-semibold text-richblack-5">
                          {course.studentsEnrolled?.length || 0}
                        </p>
                      </div>

                      <div className="text-right">

                        <p className="text-xs text-richblack-300">
                          Price
                        </p>

                        <p className="mt-1 text-sm font-semibold text-yellow-50">
                          ₹{course.price}
                        </p>

                      </div>

                    </div>

                  </div>

                </div>

              ))}

            </div>

          </div>

        </div>

      ) : (

        /* ================= NO COURSES ================= */
        <div className="mt-16 rounded-xl border border-richblack-700 bg-richblack-800 px-6 py-20 text-center shadow-md">

          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-richblack-700 text-2xl">
            📚
          </div>

          <p className="mt-5 text-2xl font-bold text-richblack-5">
            You have not created any courses yet
          </p>

          <p className="mx-auto mt-2 max-w-md text-sm text-richblack-300">
            Start creating your first course and begin
            sharing your knowledge with students.
          </p>

          <Link
            to="/dashboard/add-course"
            className="mt-6 inline-block rounded-lg bg-yellow-50 px-5 py-3 text-sm font-semibold text-richblack-900 transition-all duration-200 hover:scale-95"
          >
            Create a Course
          </Link>

        </div>

      )}

    </div>
  );
};

export default Instructor;