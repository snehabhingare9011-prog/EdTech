import React from 'react'
import HighlightText from './HighlightText'
import CTAButton from "./Button"
import Plan_your_lessons from "../../../assets/Images/Plan_your_lessons.png";
import Know_your_progress from "../../../assets/Images/Know_your_progress.svg";
import Compare_with_others from "../../../assets/Images/Compare_with_others.png";


const LearningLanguageSection = () => {

  return (<div className='mt-[130px] mb-32'>
    <div className='flex flex-col gap-5  items-center'>

      {/* Heading */}
       <div className=' text-center font-semibold text-4xl items-center mx-auto '>
          Your swiss knife for
          <HighlightText text="learning any language"  textColor={"bg-gradient-to-r from-[#4FACFE] to-[#00F2FE] bg-clip-text text-transparent"}/>
       </div>

        {/* SubHeading */}
        <div className='font-semibold mx-auto text-center text-richblack-600 text-base w-[70%]'>
            Using spin making learning multiple languages easy. with 20+ languages realistic voice-over, progress tracking, custom schedule and more.    
        </div>

        {/* images */}
        <div className='flex flex-row items-center '>

          <img src={Know_your_progress} alt="Know_your_progress_img" className='object-contain -mr-32'/>
          <img src={Compare_with_others} alt="Compare_with_others_img" className='object-contain'/>
          <img src={Plan_your_lessons} alt="Plan_your_lessons_img" className='object-contain -ml-36'/>

        </div>

        {/* CTAButton */}
        <div className='w-fit '>
            <CTAButton active={true} linkto={"/signup"}>
              <div>
                  Learn More
              </div>
            </CTAButton>
        </div>
    </div>
  </div>)
}

export default LearningLanguageSection