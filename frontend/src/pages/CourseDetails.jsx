import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { BuyCourse } from "../services/operations/studentFeaturesAPI";
import { getFullDetailsOfCourse } from "../services/operations/courseDetailsAPI";
import { useEffect, useState } from "react";
import GetAvgRating from "../utils/avgRating";
import ConfirmationModal from "../components/common/ConfirmationModal";
import Loader from "../components/common/Loader";
import { HiOutlineGlobeAlt } from "react-icons/hi"
import RatingStars from "../components/common/RatingStars"
import { BiInfoCircle } from "react-icons/bi"
import CourseDetailsCard from "../components/core/Course/CourseDetailsCard";
import { ACCOUNT_TYPE } from "../utils/constants";
import toast from "react-hot-toast"
import { formatDuration } from "../utils/formatDuration";
import { formatDate } from "../utils/formateDate";
import CourseAccordionBar from "../components/core/Course/CourseAccordionBar";
import Footer from "../components/common/Footer";


const CourseDetails = () => {
  const { token } = useSelector((state) => state.auth);
  const { courseId } = useParams();
  const { user } = useSelector((state) => state.profile);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [courseData, setCourseData] = useState(null);
  const [avgReviewCount, setAvgReviewCount] = useState(0);
  const [totalNoOfLectures, setTotalNoOfLectures] = useState(0);
  const [confirmationModal, setConfirmationModal] = useState(null);
  const { paymentLoading } = useSelector((state) => state.course);
  const { loading } = useSelector((state) => state.profile);
  const [isActive, setIsActive] = useState([]);

  const handleActive = (id) => {
    setIsActive( !isActive.includes(id) ? isActive.concat([id]) : isActive.filter((e) => e !== id) )
  }


  // Get course details
  useEffect(() => {
    (async () => {
      try {
        const result = await getFullDetailsOfCourse(courseId, token);

        setCourseData(result.data);

        console.log("result", result.data);
      } catch (error) {
        console.log("Could not fetch Course Details");
      }
    })();
  }, [courseId, token]);

  // Calculate average rating
  useEffect(() => {
    console.log("course rating", courseData?.data?.ratingAndReviews);

    const count = GetAvgRating(courseData?.data?.ratingAndReviews);

    console.log("rating", count);

    setAvgReviewCount(count);
  }, [courseData]);

  // Calculate total number of lectures
  useEffect(() => {
    let totalLectures = 0;

    courseData?.data?.courseContent?.forEach((section) => {
      totalLectures += section?.subSection?.length ?? 0;
    });

    console.log("totalLec", totalLectures);

    setTotalNoOfLectures(totalLectures);
  }, [courseData]);

  // Show loader while data is loading
  if (loading || !courseData) {
    return (
      <div className="grid min-h-[calc(100vh-66px)] place-items-center">
        <Loader />
      </div>
    );
  }

  function handleBuyCourse() {

    if ( user && user?.accountType === ACCOUNT_TYPE.INSTRUCTOR ) {
          toast.error("You are an Instructor. You can't buy a course.");
          return;
    }

    if (token) {
      BuyCourse( token, [courseId], user, navigate, dispatch );

      return;
    }

    setConfirmationModal({
      text1: "You are not logged in!",
      text2: "Please login to Purchase Course.",
      btn1Text: "Login",
      btn2Text: "Cancel",
      btn1Handler: () => navigate("/login"),
      btn2Handler: () => setConfirmationModal(null),
    });
  }
  

  // Show loader while payment is being processed
  if (paymentLoading) {
    return (
      <div className="grid min-h-[calc(100vh-66px)] place-items-center">
        <Loader />
      </div>
    );
  }

  return (
    <div className="w-full bg-richblack-900">

      <div className={`relative w-full bg-richblack-800`}>

        {/* Hero Section */}
        <div className="mx-auto box-content px-4 lg:w-315 2xl:relative ">
          <div className="mx-auto grid min-h-112.5 max-w-maxContentTab justify-items-center py-8 lg:mx-0 lg:justify-items-start lg:py-0 xl:max-w-202.5">
            <div className="relative block max-h-120 lg:hidden">
              <div className="absolute bottom-0 left-0 h-full w-full shadow-[#161D29_0px_-64px_36px_-28px_inset]"></div>
              <img src={courseData.data.thumbnail} alt="course thumbnail" className="aspect-auto w-full" />
            </div>
            <div className={`z-30 my-5 flex flex-col justify-center gap-4 py-5 text-lg text-richblack-5`} >
              <div>
                <p className="text-4xl font-bold text-richblack-5 sm:text-[42px]">
                  {courseData.data.courseName}
                </p>
              </div>
              <p className={`text-richblack-200`}>{courseData.data.courseDescription}</p>
              <div className="text-md flex flex-wrap items-center gap-2">
                <span className="text-yellow-25">{avgReviewCount}</span>
                <RatingStars Review_Count={avgReviewCount} Star_Size={24} />
                <span>{`(${courseData.data.ratingAndReviews.length} reviews)`}</span>
                <span>{`${courseData.data.studentsEnrolled.length} students enrolled`}</span>
              </div>
              <div>
                <p className="">
                  Created By {`${courseData.data.instructor.firstName} ${courseData.data.instructor.lastName}`}
                </p>
              </div>
              <div className="flex flex-wrap gap-5 text-lg">
                <p className="flex items-center gap-2">
                  {" "}
                  <BiInfoCircle /> Created at {formatDate(courseData.data.createdAt)}
                </p>
                <p className="flex items-center gap-2">
                  {" "}
                  <HiOutlineGlobeAlt /> English
                </p>
              </div>
            </div>
            <div className="flex w-full flex-col gap-4 border-y border-y-richblack-500 py-4 lg:hidden">
              <p className="space-x-3 pb-4 text-3xl font-semibold text-richblack-5">
                Rs. {courseData.data.price}
              </p>
              <button className="yellowButton" onClick={handleBuyCourse}>
                Buy Now
              </button>
              <button className="blackButton bg-richblack-900!">Add to Cart</button>
            </div>
          </div>
          {/* Courses Card */}
          <div className="right-4 top-15 mx-auto hidden min-h-150 w-1/3 max-w-102.5 translate-y-24 md:translate-y-0 lg:absolute  lg:block">
           <CourseDetailsCard
              course={courseData.data}
              setConfirmationModal={setConfirmationModal}
              handleBuyCourse={handleBuyCourse}
            />
          </div>
        </div>

      </div>

      <div className="mx-auto box-content px-4 text-start text-richblack-5 lg:w-315">
        <div className="mx-auto max-w-maxContentTab lg:mx-0 xl:max-w-202.5">
          
          {/* What will you learn section */}
          <div className="my-8 border border-richblack-600 p-8">
            <p className="text-3xl font-semibold">What you'll learn</p>
            <div className="mt-5">
              <div>{courseData.data.whatYouWillLearn}</div>
            </div>
          </div>

          {/* Course Content Section */}
          <div className="max-w-207.5 ">
            <div className="flex flex-col gap-3">
              <p className="text-[28px] font-semibold">Course Content</p>
              <div className="flex flex-wrap justify-between gap-2">
                <div className="flex gap-2">
                  <span>
                    {courseData.data.courseContent.length} {`section(s)`}
                  </span>
                  <span>
                    {totalNoOfLectures} {`lecture(s)`}
                  </span>
                  <span>{formatDuration(courseData.totalDuration)} total length</span>
                </div>
                <div>
                  <button className="text-yellow-25" onClick={() => setIsActive([])} >
                    Collapse all sections
                  </button>
                </div>
              </div>
            </div>

            {/* Course Accordion ==> the complete expand/collapse system. */}
            <div className="py-4">
              {courseData.data.courseContent?.map((section, index) => (
                // Accordion Item / Accordion Bar → one individual section inside the accordion that can be expanded or collapsed.
                <CourseAccordionBar
                  section={section}
                  key={index}
                  isActive={isActive}
                  handleActive={handleActive}
                />
              ))}
            </div>

            {/* Author Details */}
            <div className="mb-12 py-4">
              <p className="text-[28px] font-semibold">Author</p>
              <div className="flex items-center gap-4 py-4">
                <img
                  src={
                    courseData.data.instructor.image
                      ? courseData.data.instructor.image
                      : `https://api.dicebear.com/5.x/initials/svg?seed=${courseData.data.instructor.firstName} ${courseData.data.instructor.lastName}`
                  }
                  alt="Author"
                  className="h-14 w-14 rounded-full object-cover"
                />
                <p className="text-lg">{`${courseData.data.instructor.firstName} ${courseData.data.instructor.lastName}`}</p>
              </div>
             
            </div>

          </div>

          
        </div>
      </div>
      
      {/* Footer */}
      <Footer/>
      
      {confirmationModal && (
        <ConfirmationModal modalData={confirmationModal} />
      )}
      

    </div>
  );
};

export default CourseDetails;