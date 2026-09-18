import React from 'react'
import { useState } from 'react';
import ConfirmationModal from '../../../common/ConfirmationModal';
import { Table, Thead, Tbody, Tr, Th, Td } from "react-super-responsive-table"
import { COURSE_STATUS } from '../../../../utils/constants';
import { deleteCourse } from '../../../../services/operations/courseDetailsAPI';
import { useSelector } from 'react-redux';
import { getInstructorCourses } from '../../../../services/operations/courseDetailsAPI';
import { useNavigate } from 'react-router-dom';
import "react-super-responsive-table/dist/SuperResponsiveTableStyle.css";
import { FiEdit2 } from "react-icons/fi";
import { RiDeleteBin6Line } from "react-icons/ri";
import { HiClock } from "react-icons/hi";
import { FaCheck } from "react-icons/fa";
import { formatDate } from '../../../../services/formateDate';

const CoursesTable = ({ courses, setCourses }) => {

    const [confirmationModal, setConfirmationModal] = useState(null);
    console.log("courses inside the courseTable", courses);
    const { token } = useSelector(state => state.auth);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    async function handleDeleteCourse(courseId) {
        setLoading(true);

        await deleteCourse(courseId, token);
        const result = await getInstructorCourses(token);

        if (result) {
            setCourses(result);
        }

        setConfirmationModal(null);
        setLoading(false);
    }

    return (
        <div className="w-full text-white">

            <div className="overflow-hidden rounded-xl border border-richblack-800 bg-richblack-900">

                <Table className="w-full">

                    <Thead>
                       <Tr className="border-b border-richblack-800 bg-richblack-800">
                            <Th className="px-6 py-4 text-left text-sm font-medium uppercase text-richblack-200">
                                Courses
                            </Th>

                            <Th className="px-6 py-4 text-left text-sm font-medium uppercase text-richblack-200">
                                Duration
                            </Th>

                            <Th className="px-6 py-4 text-left text-sm font-medium uppercase text-richblack-200">
                                Price
                            </Th>

                            <Th className="px-6 py-4 text-left text-sm font-medium uppercase text-richblack-200">
                                Actions
                            </Th>
                        </Tr>
                    </Thead>

                    <Tbody>

                        {
                            courses.length === 0 ? (
                                <Tr>
                                    <Td
                                        colSpan="4"
                                        className="px-6 py-10 text-center text-lg text-richblack-200"
                                    >
                                        No Courses Found
                                    </Td>
                                </Tr>
                            )
                            :
                            courses.map((course) => {

                                return (
                                    <Tr
                                        key={course._id}
                                        className="border-b border-richblack-800 last:border-b-0"
                                    >

                                        {/* Course */}
                                        <Td className="px-6 py-6">
                                            <div className="flex items-center gap-4">

                                                <img
                                                    src={course.thumbnail}
                                                    alt={course.courseName}
                                                    className="h-40 w-60 rounded-lg object-cover"
                                                />

                                                <div className="flex min-w-0 flex-col">

                                                    <p className="text-lg font-semibold text-richblack-5">
                                                        {course.courseName}
                                                    </p>

                                                    <p className=" text-sm text-richblack-300">
                                                        {course.courseDescription}
                                                    </p>

                                                    <p className="mt-10 text-xs text-richblack-400">
                                                        Created: {formatDate(course.createdAt)}
                                                    </p>

                                                    {
                                                        course.status === COURSE_STATUS.DRAFT
                                                        ?
                                                        <span className="mt-1 flex w-fit items-center gap-1 rounded-full bg-richblack-700 px-3 py-1 text-xs text-pink-200">
                                                            <HiClock />
                                                            Drafted
                                                        </span>
                                                        :
                                                        <span className="mt-1 flex w-fit items-center gap-2 rounded-full bg-richblack-700 px-3 py-1 text-xs text-yellow-50">
                                                            <span className="flex h-3 w-3 items-center justify-center rounded-full bg-yellow-50 text-richblack-700">
                                                                <FaCheck size={8} />
                                                            </span>
                                                            Published
                                                        </span>
                                                    }

                                                </div>

                                            </div>
                                        </Td>

                                        {/* Duration */}
                                        <Td className="px-6 py-6 text-sm text-richblack-200">
                                            2hr 30min
                                        </Td>

                                        {/* Price */}
                                        <Td className="px-6 py-6 text-sm text-richblack-100">
                                            ₹{course.price}
                                        </Td>

                                        {/* Actions */}
                                        <Td className="px-6 py-6">
                                            <div className="flex items-center gap-5">

                                                <button
                                                    disabled={loading}
                                                    onClick={() =>
                                                        navigate(`/dashboard/edit-course/${course._id}`)
                                                    }
                                                    className="cursor-pointer text-richblack-300 transition-all duration-200 hover:text-richblack-5"
                                                >
                                                    <FiEdit2 size={20} />
                                                </button>

                                                <button
                                                    disabled={loading}
                                                    onClick={() =>
                                                        setConfirmationModal({
                                                            text1: "Do you want to delete this course?",
                                                            text2: "All the data related to this course will be deleted",
                                                            btn1Text: "Delete",
                                                            btn2Text: "Cancel",

                                                            btn1Handler: () =>
                                                                handleDeleteCourse(course._id),

                                                            btn2Handler: () => {
                                                                setConfirmationModal(null);
                                                            },
                                                        })
                                                    }
                                                    className="cursor-pointer text-richblack-300 transition-all duration-200 hover:text-pink-200"
                                                >
                                                    <RiDeleteBin6Line size={20} />
                                                </button>

                                            </div>
                                        </Td>

                                    </Tr>
                                )
                            })
                        }

                    </Tbody>

                </Table>

            </div>

            {
                confirmationModal && (
                    <ConfirmationModal modalData={confirmationModal} />
                )
            }

        </div>
    )
}

export default CoursesTable