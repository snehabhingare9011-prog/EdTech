import React from 'react'
import InstructorImg from "../../../assets/Images/Instructor.png"
import HighlightText from './HighlightText'
import CTAButton from "./Button"
import { FaArrowRight } from "react-icons/fa";

const InstructorSection = () => {
  return (
    <div className='mt-16'>
        <div className='flex flex-row gap-20 items-center'>
            {/* left side */}
            <div className='w-[50%]'>
                <img src={InstructorImg} alt="InstructorImg" className='shadow-white'></img>

            </div>

            {/* right side */}

            <div className=' w-[50%] flex flex-col gap-10'> 

            <div className=' font-semibold text-4xl w-[50%] '>
                Become an
                <HighlightText text="instructor"  textColor={"bg-gradient-to-r from-[#4FACFE] to-[#00F2FE] bg-clip-text text-transparent"}/>

            </div>

            <p className='w-[80%] font-medium text-[16px] text-richblack-300'>
              With our online coding courses, you can learn at your own pace, from anywhere in the world, and get access to a wealth of resources, including hands-on projects, quizzes, and personalized feedback from instructors.
            </p>

            <div className='w-fit'>
                
            <CTAButton active={true} lintto={"/signup"}>
                <div className="flex flex-row gap-2 items-center">
                  <span>Start Teaching Today</span>
                  <FaArrowRight />
                </div>     
            </CTAButton>

            </div>


        </div>
    </div>
    </div>
  )
}

export default InstructorSection