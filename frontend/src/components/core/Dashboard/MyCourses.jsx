import React, { useEffect, useState } from 'react'
import { getInstructorCourses } from '../../../services/operations/courseDetailsAPI';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import CoursesTable from './InstructorCourses/CoursesTable';

const MyCourses = () => {

    const [courses, setCourses] = useState(null);
    const { token } = useSelector(state => state.auth);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchCourses = async () => {
            const result = await getInstructorCourses(token);
            if (result) {
                setCourses(result);
            }
        }

        fetchCourses();
    }, []);

    return (
         <div className="w-full max-w-5xl mx-auto text-white mb-10">

            {/* Header */}
            <div className="mb-14 flex items-center justify-between">

                <h1 className="text-3xl font-medium text-richblack-5">
                    My Courses
                </h1>

                <button
                    type="button"
                    onClick={() => navigate("/dashboard/add-course")}
                    className="flex cursor-pointer items-center gap-x-2 rounded-md bg-yellow-50 px-5 py-2 font-semibold text-richblack-900 transition-all duration-200 hover:scale-95"
                >
                    Add Course
                    <span className="text-xl">+</span>
                </button>

            </div>

            {/* Courses */}
            {
                courses && (
                    <CoursesTable
                        courses={courses}
                        setCourses={setCourses}
                    />
                )
            }

        </div>
    )
}

export default MyCourses