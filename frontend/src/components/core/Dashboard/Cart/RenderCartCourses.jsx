import { useSelector } from "react-redux";
import CartCourse from "./CartCourse";

const RenderCartCourses = () => {

    const { cart } = useSelector((state) => state.cart);

    return (
        <div className="w-full lg:w-[70%]">

            {cart.map((course) => (
                <CartCourse key={course._id} course={course} />
            ))}

        </div>
    );
};

export default RenderCartCourses;