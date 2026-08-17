import React from 'react'
import LoginForm from "./LoginForm";
import SignupForm from './SignupForm';
import { FcGoogle } from "react-icons/fc";

const Template = ({ heading, description1, description2, type, img, frame }) => {

  return (
    <div className="template-container text-white flex flex-col-reverse md:flex-row md:items-center px-6 py-3 lg:px-10 lg:py-2 gap-5 md:gap-12 lg:gap-16 w-full select-none mt-6">

      {/* Left */}
      <div className="template-left md:w-1/2 flex justify-center">
        <div className="w-full max-w-lg p-2 lg:p-4 flex flex-col gap-3 lg:gap-4">

          <h2 className="text-3xl font-semibold">
            {heading}
          </h2>

          <div>
            <p className="desc1 text-lg text-richblack-200">
              {description1}
            </p>

            <p className="desc2 text-base text-blue-100 italic">
              {description2}
            </p>
          </div>

          {
            type === 'signup'
              ? <SignupForm />
              : <LoginForm />
          }

          <div className="flex justify-between gap-2 items-center text-richblack-700">
            <div className="border flex-1"></div>

            <div className="text-sm">
              OR
            </div>

            <div className="flex-1 border"></div>
          </div>

          <div className="w-full flex items-center justify-center gap-2 border rounded-lg px-4 py-2 border-richblack-700 text-richblack-200 cursor-pointer">
            <FcGoogle />
            Sign Up with Google
          </div>

        </div>
      </div>


      {/* Right */}
      <div className="template-right md:w-1/2 flex justify-center">
        <div className="relative w-full max-w-md">

          <img
            className="w-full max-w-sm md:max-w-md relative z-10"
            src={img}
            alt="img"
          />

          <img
            className="w-full max-w-sm md:max-w-md absolute top-4 left-4 z-0"
            src={frame}
            alt="frame"
          />

        </div>
      </div>

    </div>
  )
}

export default Template;