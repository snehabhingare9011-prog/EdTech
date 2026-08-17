import React from "react";
import { useNavigate } from "react-router-dom";
import { BiArrowBack } from "react-icons/bi";
import error_img from "../assets/Images/404-computer.svg";

const Error = () => {
  const navigate = useNavigate();

  return (
    <div className="w-full flex-1 flex flex-col items-center justify-center px-4 py-4 overflow-hidden">

      {/* Illustration */}
      <img src={error_img} alt="404 error" className=" w-full max-w-[300px] sm:max-w-[340px] lg:max-w-[380px] object-contain animate-[float_4s_ease-in-out_infinite] " />

      {/* Content */}
      <div className="flex flex-col items-center text-center">

        <p className="mt-1 text-lg sm:text-xl font-semibold text-blue-100">
          404 • Page Not Found
        </p>

        <h1 className="mt-2 text-2xl sm:text-3xl font-semibold text-richblack-5">
          Looks like you’re lost!
        </h1>

        <p className="mt-2 max-w-[480px] text-sm sm:text-base text-richblack-100">
          The page you’re looking for doesn’t exist or may have been moved.
        </p>

        <button onClick={() => navigate("/")} className=" mt-4 flex items-center gap-x-2 rounded-lg bg-yellow-50 px-5 py-2 text-sm font-semibold text-richblack-900 transition-all duration-200 hover:-translate-y-1 hover:shadow-lg active:translate-y-0 " >
          <BiArrowBack className="text-base" />
          Back to Home
        </button>

      </div>

      {/* Image Animation */}
      <style>
        {`
          @keyframes float {
            0%, 100% {
              transform: translateY(0px);
            }

            50% {
              transform: translateY(-12px);
            }
          }
        `}
      </style>

    </div>
  );
};

export default Error;