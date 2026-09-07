import { useSelector } from "react-redux";
import EmptyCart from "./EmptyCart";
import RenderCartCourses from "./RenderCartCourses";
import RenderTotalAmount from "./RenderTotalAmount";

const Cart = () => {

    const {totalItems}=useSelector(state=>state.cart);
    

    return (
   
        <div className="mt-6 flex flex-col-reverse items-start gap-8 lg:flex-row lg:items-start">
       
            {totalItems > 0 ? (
                <div className="mx-auto w-full max-w-6xl">

                    {/* Heading */}
                    <h1 className="mb-8 text-3xl font-medium text-richblack-5">
                        Your Cart
                    </h1>

                    {/* Cart Count */}
                    <p className="border-b border-richblack-700 pb-4 text-base font-semibold text-richblack-400">
                        {totalItems}{" "}
                        {totalItems === 1 ? "Course" : "Courses"} in Cart
                    </p>

                    {/* Cart Content */}
                    <div className="mt-6 flex flex-col-reverse items-start gap-8 lg:flex-row">

                        <RenderCartCourses />
                        <RenderTotalAmount />

                    </div>

                </div>
            ) : (
                <EmptyCart />
            )}

        </div>
    );
};

export default Cart;