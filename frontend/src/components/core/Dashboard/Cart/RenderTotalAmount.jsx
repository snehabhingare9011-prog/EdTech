import { useDispatch, useSelector } from "react-redux";
import { BuyCourse } from "../../../../services/operations/studentFeaturesAPI";
import { useNavigate } from "react-router-dom";

const RenderTotalAmount = () => {

    const { total, cart ,purchaseType } = useSelector( (state) => state.cart );
    const {token}=useSelector(state=>state.auth);
    const {user}=useSelector(state=>state.profile);
    const dispatch=useDispatch();
    const navigate=useNavigate();

    async function handleBuyCourse() {

        const courses = cart.map( (course) => course._id );
        const result=await BuyCourse(token,courses,user,navigate,dispatch,purchaseType );
        
    }

    return (

       <div className="w-full rounded-md border border-richblack-700 bg-richblack-800 p-6 lg:sticky lg:top-20 lg:w-[30%] lg:min-w-[280px]">

            {/* Total */}
            <p className="mb-2 text-base font-medium text-richblack-300">
                Total:
            </p>

            {/* Total Amount */}
            <p className="mb-7 text-[28px] font-semibold text-yellow-100">
                ₹ {total}
            </p>

            {/* Buy Now */}
            <button
                onClick={handleBuyCourse}
                className="w-full rounded-md bg-yellow-50 px-6 py-3.5 text-base font-semibold text-richblack-900 transition-all duration-200 hover:scale-[0.98] hover:bg-yellow-100">
                Buy Now
            </button>

        </div>
    );
};

export default RenderTotalAmount;