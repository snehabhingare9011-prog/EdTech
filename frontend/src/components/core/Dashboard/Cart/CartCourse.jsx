
import ReactStarsModule from "react-rating-stars-component";
import { FaStar, FaStarHalfAlt } from "react-icons/fa";
import { FiTrash2 } from "react-icons/fi";
const ReactStars = ReactStarsModule.default;
import { removeFromCart } from "../../../../redux/slices/cartSlice";

const CartCourse = ({ course }) => {
   
    // Calculate average rating without API call
    function getAverageRating(reviews){

            if (!reviews || reviews.length === 0) return 0;
            const total=reviews.reduce((sum,review)=> sum+review.rating,0)
            return total/reviews.length;
    }
    

    const rating=getAverageRating(course?.ratingAndReviews);


    return (
        <div className="flex min-h-[155px] w-full items-start border-b border-richblack-700 py-6">

            {/* IMAGE */}
            <img src={course?.thumbnail} alt={course?.courseName} className="h-[120px] w-[150px] shrink-0 rounded-md object-cover" />

            {/* COURSE DETAILS */}
            <div className="ml-5 flex min-w-0 flex-1 flex-col">

                {/* COURSE NAME */}
                <p className="max-w-[430px] text-[19px] font-medium leading-6 text-richblack-5">
                    {course?.courseName}
                </p>

                {/* CATEGORY */}
                <p className="mt-2 text-sm text-richblack-400">
                    {course?.category?.name}
                </p>

                {/* RATING */}
                
              <div className="mt-3 flex items-center gap-2 whitespace-nowrap">

                    <span className="relative top-[1px] text-sm font-semibold text-yellow-100">
                        {rating.toFixed(1)}
                    </span>

                    <ReactStars
                        count={5}
                        size={18}
                        value={Math.round(rating * 2) / 2}
                        edit={false}
                        isHalf={true}
                        color="gray"
                        activeColor="#ffd700"
                        emptyIcon={<FaStar className="mr-1" />}
                        filledIcon={<FaStar className="mr-1" />}
                        halfIcon={<FaStarHalfAlt className="mr-1" />}
                    />

                    <span className="relative top-[1px] text-sm text-richblack-500">
                        ({course?.ratingAndReviews?.length || 0})
                    </span>

                </div>

                {/* COURSE INFORMATION */}
                <p className="mt-3 text-sm text-richblack-400">
                    Total Courses • Lesson • Beginner
                </p>

            </div>

            {/* REMOVE + PRICE */}
            <div className="ml-5 flex w-[110px] shrink-0 flex-col items-end">

                {/* REMOVE BUTTON */}
                <button
                    onClick={() => dispatch(removeFromCart(course._id))}
                    className="flex items-center gap-2 rounded-md border border-richblack-700 bg-richblack-800 px-3 py-2.5 text-sm font-semibold text-pink-200 transition-all duration-200 hover:border-pink-500 hover:bg-richblack-700" >
                    <FiTrash2 size={17} strokeWidth={3} />
                    Remove
                </button>

                {/* PRICE */}
                <p className="mt-6 text-[21px] font-semibold text-yellow-100">
                    Rs. {course?.price}
                </p>

            </div>

        </div>
    );
};

export default CartCourse;