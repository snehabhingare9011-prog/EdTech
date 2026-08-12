import React from 'react'
import InstructorImg from "../../../assets/Images/Instructor.png"
import HighlightText from './HighlightText'
import CTAButton from "../../common/Button"
import { FaArrowRight } from "react-icons/fa";

const InstructorSection = () => {
  return (
    <div className='w-full flex flex-col md:flex-row items-center justify-evenly py-15 gap-10 md:gap-0 lg:py-20 lg:px-10'>

      {/* Left Side - Instructor Image */}
      <div className='max-w-120 md:w-[50%] shadow-[-5px_-5px_0px_rgba(255,255,255,1)] sm:shadow-[-10px_-10px_0px_rgba(255,255,255,1)] md:shadow-[-20px_-20px_0px_rgba(255,255,255,1)]'>
        <img
          className='w-full'
          src={InstructorImg}
          alt="Instructor"
        />
      </div>

      {/* Right Side - Content */}
      <div className='flex flex-col md:w-[45%] items-center'>

        <div className='w-[85%] lg:w-[70%] flex flex-col gap-10 md:gap-15'>

          {/* Heading + Description */}
          <div className='flex flex-col gap-2'>

            <div className='text-white font-semibold text-3xl lg:text-4xl w-[60%]'>
              Become an{" "}
              <HighlightText
                text="instructor"
                textColor="bg-gradient-to-r from-[#4FACFE] to-[#00F2FE] bg-clip-text text-transparent"
              />
            </div>

            <p className='text-richblack-300'>
              With our online coding courses, you can learn at your own pace, from anywhere in the world, and get access to a wealth of resources, including hands-on projects, quizzes, and personalized feedback from instructors.
            </p>

          </div>

          {/* CTA */}
          <CTAButton active={true} linkto={"/signup"}>
            <div className="flex flex-row gap-2 items-center">
              <span>Start Teaching Today</span>
              <FaArrowRight />
            </div>
          </CTAButton>

        </div>

      </div>

    </div>
  )
}

export default InstructorSection