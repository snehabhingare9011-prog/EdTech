
import {  useSelector } from "react-redux";
import Loader from "../../common/Loader";
import { useEffect, useState } from "react";
import getUserEnrolledCourses from "../../../services/operations/profileAPI";
import ProgressBar from "@ramonak/react-progress-bar"

const EnrolledCourses=()=>{
    console.log("inside the Enrolled Courses");

    const {token}=useSelector(state=>state.auth);

    const [enrolledCourses,setEnrolledCourses]=useState(null);
   

    const getEnrolledCoursesHandler=async()=>{
        try{

            const response= await getUserEnrolledCourses(token);

            console.log("response inside the enrolled coursese",response);
            setEnrolledCourses(response);


        }catch(error){
             console.log("Could not fetch enrolled courses.",error);

        }
    }

    useEffect(()=>{

        getEnrolledCoursesHandler();

    },[]);

    return <div>
        <div className="text-3xl text-richblack-50">Enrolled Courses</div>
          
        {
            !enrolledCourses?<Loader/>
            : !enrolledCourses.length ? (
                <div className="mt-5 flex min-h-[40vh] flex-col items-center justify-center gap-3 rounded-lg border border-richblack-700 bg-richblack-800 p-8">
                    <h2 className="text-2xl font-semibold text-richblack-5">
                        No Courses Enrolled
                    </h2>
                    <p className="text-center text-richblack-300">
                        You haven't enrolled in any courses yet.
                    </p>
                    <p className="text-center text-sm text-richblack-400">
                        Explore our catalog and start your learning journey today.
                    </p>
                </div>
            ):(
                <div className="my-8 text-richblack-5">
                    {/* Headings */}
                    <div className="flex rounded-t-lg bg-richblack-500 ">
                        <p className="w-[45%] px-5 py-3">Course Name</p>
                        <p className="w-1/4 px-2 py-3">Duration</p>
                        <p className="flex-1 px-2 py-3">Progress</p>
                    </div>
                    {/* Courses Start Here */}
                     
                     {
                        enrolledCourses.map((course,index)=>(
                            <div>
                                {/* left  */}
                                <div>
                                    <img src={course.thumbnail}/>
                                    <div>
                                        <p>{course.courseName}</p>
                                        <p>{course.courseDescription}</p>
                                    </div>
                                </div>

                                {/* middle */}
                                <div>
                                    {course.totalDuration}
                                </div>

                                {/* right */}
                                <div>
                                    <p>Progress:{course.progressPercentage||0}%</p>
                                    <ProgressBar completed={course.progressPercentage||0} height="8px" isLabelVisible={false} />
                                </div>

                            </div>

                        ))
                     }
                </div>
            )
        }
    </div>

}

export default EnrolledCourses;