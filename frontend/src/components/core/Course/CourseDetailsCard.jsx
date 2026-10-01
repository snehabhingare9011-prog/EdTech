import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import {ACCOUNT_TYPE} from "../../../utils/constants";
import { addToCart } from "../../../redux/slices/cartSlice";
import copy from "copy-to-clipboard"
import { BsFillCaretRightFill } from "react-icons/bs"
import { FaShareSquare } from "react-icons/fa";
import toast from "react-hot-toast";

function CourseDetailsCard({ course, setConfirmationModal, handleBuyCourse, }) {
  const { user } = useSelector((state) => state.profile);
  const { token } = useSelector((state) => state.auth);
  const {cart}=useSelector(state=>state.cart);


  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleShare = () => {
    copy(window.location.href);
    toast.success("Link copied to clipboard");
  };

  const handleAddToCart = () => {
    if ( user && user?.accountType === ACCOUNT_TYPE.INSTRUCTOR ) {
      toast.error("You are an Instructor. You can't buy a course.");
      return;
    }

    if (token) {

      console.log("cart",cart);
      console.log("course",course);
      
      dispatch(addToCart(course));
      return;
    }

    setConfirmationModal({
      text1: "You are not logged in!",
      text2: "Please login to add To Cart",
      btn1Text: "Login",
      btn2Text: "Cancel",
      btn1Handler: () => navigate("/login"),
      btn2Handler: () => setConfirmationModal(null),
    });
  };



  return (
    <>
     
    <div className="flex flex-col gap-2 rounded-md bg-richblack-700 p-3 text-richblack-5">
      
        {/* Course Image */}
        <img
          src={course?.thumbnail}
          alt={course?.courseName}
          className="max-h-60 min-h-35 w-100 overflow-hidden rounded-2xl object-cover md:max-w-full"
        />

        <div className="px-3">
          <div className="space-x-3 p-3 text-3xl font-semibold">
            Rs. {course?.price}
          </div>

          <div className="flex flex-col gap-4">
            <button
              className="yellowButton"
              onClick={
               (user && course?.studentsEnrolled.includes(user?._id)) ? () => navigate("/dashboard/enrolled-courses") : handleBuyCourse
              }
            >
             {( user && course?.studentsEnrolled.includes(user?._id) ) ? "Go To Course" : "Buy Now"}
            </button>

            {(!user ||!course?.studentsEnrolled?.includes(user?._id)) && (
              <button
                onClick={handleAddToCart}
                className="blackButton"
              >
                Add to Cart
              </button>
            )}
          </div>

          <div>
            <p className="pb-3 pt-6 text-center text-sm text-richblack-25">
              30-Day Money-Back Guarantee
            </p>
          </div>

          <div>
            <p className="my-2 text-xl font-semibold">
              This Course Includes :
            </p>

            <div className="flex flex-col gap-3 text-sm text-caribbeangreen-100">
              {course?.instructions?.map((item, i) => {
                return (
                  <p className="flex gap-2" key={i}>
                    <BsFillCaretRightFill />
                    <span>{item}</span>
                  </p>
                );
              })}
            </div>
          </div>

          <div className="text-center">
            <button
              className="mx-auto flex items-center gap-2 py-6 text-yellow-100"
              onClick={handleShare}
            >
              <FaShareSquare size={15} /> Share
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export default CourseDetailsCard;