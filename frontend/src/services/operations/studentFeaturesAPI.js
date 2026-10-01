import toast from "react-hot-toast";
import { studentEndpoints } from "../apis";
import { apiConnector } from "../apiConnector";
import { removeFromCart, resetCart } from "../../redux/slices/cartSlice";
import { setPaymentLoading } from "../../redux/slices/courseSlice";

const {
  COURSE_PAYMENT_API,
  COURSE_VERIFY_API,
  SEND_PAYMENT_SUCCESS_EMAIL_API,
} = studentEndpoints;


// Load Razorpay Checkout SDK
function loadScript(src) {
  return new Promise((resolve) => {
    const script = document.createElement("script");

    script.src = src;

    script.onload = () => {
      resolve(true);
    };

    script.onerror = () => {
      resolve(false);
    };

    document.body.appendChild(script);
  });
}

// Buy Course
export async function BuyCourse( token, courses, user_details, navigate, dispatch,purchaseType="BuyNow" ) {
  const toastId = toast.loading("Processing payment...");

  try {

    // Load Razorpay Checkout SDK
    const isScriptLoaded = await loadScript( "https://checkout.razorpay.com/v1/checkout.js" );

    if (!isScriptLoaded) {
      toast.error( "Razorpay SDK failed to load. Please check your internet connection." );
      return;
    }


    // Create payment order in the backend
    const orderResponse = await apiConnector(
      "POST",
      COURSE_PAYMENT_API,
      {
        courses,
      },
      {
        Authorization: `Bearer ${token}`,
      }
    );


    if (!orderResponse.data.success) {
      throw new Error(orderResponse.data.message);
    }
    console.log( "PAYMENT ORDER RESPONSE FROM BACKEND:", orderResponse.data );

    // Configure Razorpay Checkout
    const options = {
      key: import.meta.env.VITE_RAZORPAY_KEY,
      currency: orderResponse.data.data.currency,
      amount: orderResponse.data.data.amount,
      order_id: orderResponse.data.data.id,
      name: "StudyNotion",
      description: "Thank you for purchasing the course.",
    // image: "/rzp_logo.png", TODO:=> check later why you comment this

      // Automatically fill customer details in Razorpay Checkout
      prefill: {
        name: `${user_details.firstName} ${user_details.lastName}`,
        email: user_details.email,
      },

      handler: function (response) {
        console.log("RAZORPAY PAYMENT RESPONSE:", response);
        sendPaymentSuccessEmail( response, orderResponse.data.data.amount, token );
        verifyPayment( { ...response, courses }, token, navigate, dispatch,purchaseType  );
      },

    };

    // Create Razorpay Checkout instance
    const paymentObject = new window.Razorpay(options);

    // Open Razorpay Checkout
    paymentObject.open();

    // Handle payment failure
    paymentObject.on("payment.failed", function (response) {
      toast.error("Oops! Payment Failed.");
      console.log(response.error);
    });

  } catch (error) {
    console.log("BUY COURSE ERROR:", error);
    toast.error( error?.response?.data?.message || error?.message || "Could not initiate payment." );

  } finally {
    toast.dismiss(toastId);
  }
}

// Verify the Payment
export async function verifyPayment( bodyData, token, navigate, dispatch ,purchaseType ) {
  const toastId = toast.loading("Verifying Payment...");
  dispatch(setPaymentLoading(true));
  const {courses}=bodyData;
  console.log("courses dekhungi mein",courses);

  try {
    const response = await apiConnector(
      "POST",
      COURSE_VERIFY_API,
      bodyData,
      {
        Authorization: `Bearer ${token}`,
      }
    );

    console.log( "VERIFY PAYMENT RESPONSE FROM BACKEND:", response );

    if (!response.data.success) {
      throw new Error(response.data.message);
    }

    toast.success( "Payment Successful. You are enrolled in the course." );

    navigate("/dashboard/enrolled-courses");
    if(purchaseType==='cart'){
      dispatch(resetCart());

    }
    if(purchaseType==="BuyNow"){
      dispatch(removeFromCart(courses[0]));
    }

   

  } catch (error) {
    console.log( "PAYMENT VERIFY ERROR:", error );
    toast.error( error?.response?.data?.message || error?.message || "Could not verify payment." );

  } finally {
    toast.dismiss(toastId);
    dispatch(setPaymentLoading(false));
  }
}


// Send payment success email
export async function sendPaymentSuccessEmail( response, amount, token ) {
  try {
    console.log("pehle o mein response dekhungi",response);
    const { razorpay_order_id, razorpay_payment_id } = response;

    const emailResponse = await apiConnector(
      "POST",
      SEND_PAYMENT_SUCCESS_EMAIL_API,
      {
        orderId: razorpay_order_id,
        paymentId: razorpay_payment_id,
        amount,
      },
      {
        Authorization: `Bearer ${token}`,
      }
    );

    if (!emailResponse.data.success) {
      throw new Error(emailResponse.data.message);
    }

    console.log( "PAYMENT SUCCESS EMAIL RESPONSE:", emailResponse.data );

  } catch (error) {
    console.log("SEND PAYMENT SUCCESS EMAIL ERROR:", error);
    toast.error( error?.response?.data?.message || error?.message || "Could not send payment success email." );
  }
}