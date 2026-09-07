import { FiShoppingCart, FiArrowRight } from "react-icons/fi";
import { useNavigate } from "react-router-dom";

const EmptyCart = () => {
    const navigate = useNavigate();

    return (
        <div className="flex min-h-[75vh] items-center justify-center mx-auto">

            <div className="w-full max-w-4xl rounded-lg border border-richblack-700 bg-richblack-800 px-8 py-12">

                <div className="flex flex-col items-center text-center">

                    {/* Cart Icon */}
                    <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-full border border-richblack-600 bg-richblack-700">
                        <FiShoppingCart
                            size={28}
                            className="text-yellow-50"
                        />
                    </div>

                    {/* Heading */}
                    <h2 className="text-2xl font-semibold text-richblack-5">
                        Your Cart is Empty
                    </h2>

                    {/* Description */}
                    <p className="mt-3 max-w-lg text-sm leading-6 text-richblack-300">
                        You haven't added any courses to your cart yet.
                        Explore our courses and start your learning journey
                        today.
                    </p>

                    {/* Explore Button */}
                    <button
                        onClick={() => navigate("/catalog")}
                        className="mt-6 flex items-center gap-2 rounded-md bg-yellow-50 px-6 py-3 text-sm font-semibold text-richblack-900 transition-all duration-200 hover:scale-95 hover:bg-yellow-100"
                    >
                        Explore Courses
                        <FiArrowRight size={18} />
                    </button>

                </div>

            </div>

        </div>
    );
};

export default EmptyCart;