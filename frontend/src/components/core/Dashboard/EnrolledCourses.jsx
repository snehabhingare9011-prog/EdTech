import { useSelector } from "react-redux";
import Loader from "../../common/Loader";
import { useEffect, useState } from "react";
import getUserEnrolledCourses from "../../../services/operations/profileAPI";
import { useNavigate } from "react-router-dom";
import {formatDuration} from "../../../utils/formatDuration"

const EnrolledCourses = () => {
    console.log("inside the Enrolled Courses");

    const { token } = useSelector((state) => state.auth);
    const navigate = useNavigate();

    const [enrolledCourses, setEnrolledCourses] = useState(null);

    const getEnrolledCoursesHandler = async () => {
        try {
            const response = await getUserEnrolledCourses(token);

            console.log( "response inside the enrolled courses", response );

            setEnrolledCourses(response);

        } catch (error) {
            console.log(
                "Could not fetch enrolled courses.",
                error
            );
        }
    };

    useEffect(() => {
        getEnrolledCoursesHandler();
    }, []);

    return (
        <div className="mx-auto w-full max-w-6xl px-6 py-8">

            {/* Heading */}
            <div className="text-3xl font-semibold text-richblack-5">
                Enrolled Courses
            </div>

            {/* Loading */}
            {!enrolledCourses ? (
                <div className="grid min-h-[40vh] place-items-center">
                    <Loader />
                </div>

            ) : !enrolledCourses.length ? (

                /* No Courses */
                <div className="mt-5 flex min-h-[40vh] flex-col items-center justify-center gap-3 rounded-lg border border-richblack-700 bg-richblack-800 p-8">

                    <h2 className="text-xl font-semibold text-richblack-5">
                        No Courses Enrolled
                    </h2>

                    <p className="text-center text-sm text-richblack-300">
                        You haven't enrolled in any courses yet.
                    </p>

                    <p className="text-center text-xs text-richblack-400">
                        Explore our catalog and start your learning
                        journey today.
                    </p>

                </div>

            ) : (

                /* Courses */
                <div className="my-8 overflow-hidden rounded-lg border border-richblack-700 text-richblack-5">

                    {/* Headings */}
                    <div className="flex border-b border-richblack-700 bg-richblack-500">

                        <p className="w-[45%] px-5 py-4 text-sm font-medium text-richblack-5">
                            Course Name
                        </p>

                        <p className="w-1/4 px-2 py-4 text-sm font-medium text-richblack-5">
                            Duration
                        </p>

                        <p className="flex-1 px-2 py-4 text-sm font-medium text-richblack-5">
                            Progress
                        </p>

                    </div>

                    {/* Course List */}
                    {enrolledCourses.map((course, index, arr) => {

                        const progress = Number.isFinite(
                            course?.progressPercentage
                        )
                            ? course.progressPercentage
                            : 0;

                        const duration = Number.isFinite(
                            course?.totalDuration
                        )
                            ? course.totalDuration
                            : 0;

                        return (
                            <div
                                key={course?._id || index}
                                className={`flex items-center bg-richblack-900 transition-colors duration-200 hover:bg-richblack-800 ${
                                    index === arr.length - 1
                                        ? "rounded-b-lg"
                                        : "border-b border-richblack-700"
                                }`}
                            >

                                {/* Course Name */}
                                <div
                                    className="flex w-[45%] cursor-pointer items-center gap-4 px-5 py-4"
                                    onClick={() => {
                                        navigate(
                                            `/view-course/${course?._id}/section/${course?.courseContent?.[0]?._id}/sub-section/${course?.courseContent?.[0]?.subSection?.[0]?._id}`
                                        );
                                    }}
                                >

                                    <img
                                        src={course?.thumbnail}
                                        alt="course_img"
                                        className="h-14 w-20 rounded-md border border-richblack-700 object-cover"
                                    />

                                    <div className="flex max-w-xs flex-col gap-1">

                                        <p className="font-semibold text-richblack-5">
                                            {course?.courseName}
                                        </p>

                                        <p className="text-xs leading-5 text-richblack-400">
                                            {course?.courseDescription?.length > 50
                                                ? `${course.courseDescription.slice(
                                                      0,
                                                      50
                                                  )}...`
                                                : course?.courseDescription}
                                        </p>

                                    </div>

                                </div>

                                {/* Duration */}
                                <div className="w-1/4 px-2 py-4 text-sm text-richblack-5">
                                    {formatDuration(duration)}
                                </div>

                                {/* Progress */}
                                <div className="flex w-1/5 flex-col gap-2 px-2 py-4">

                                    <p className="text-sm text-richblack-5">
                                        Progress: <span className="text-richblack-5">{progress}%</span>
                                    </p>

                                    {/* ProgressBar */}

                                    <div className="h-1.5 w-full rounded-full bg-richblack-700">
                                        <div
                                            className="h-1.5 rounded-full bg-yellow-50 transition-all duration-300"
                                            style={{ width: `${progress}%` }}
                                        ></div>
                                    </div>

                                </div>

                            </div>
                        );
                    })}

                </div>
            )}
        </div>
    );
};

export default EnrolledCourses;