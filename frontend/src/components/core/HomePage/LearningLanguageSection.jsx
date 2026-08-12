import React from 'react'
import HighlightText from './HighlightText'
import CTAButton from "../../common/Button"
import Plan_your_lessons from "../../../assets/Images/Plan_your_lessons.png";
import Know_your_progress from "../../../assets/Images/Know_your_progress.svg";
import Compare_with_others from "../../../assets/Images/Compare_with_others.png";

const LearningLanguageSection = () => {

  return (
    <div className='mt-[80px] mb-32'>

      {/* Heading */}
      <div className='text-center font-semibold text-4xl items-center mx-auto'>
        Your swiss knife for{" "}
        <HighlightText>
          learning any language
        </HighlightText>
      </div>

      {/* SubHeading */}
      <div className='font-semibold mx-auto text-center text-richblack-500 text-base w-[70%] mt-5'>
        Using spin making learning multiple languages easy. with 20+ languages realistic voice-over, progress tracking, custom schedule and more.
      </div>

      {/* Images */}
      <div className='flex flex-row items-center justify-center mt-10'>

        <img
          src={Know_your_progress}
          alt="Know_your_progress_img"
          className='z-10 object-contain -mr-32'
        />

        <img
          src={Compare_with_others}
          alt="Compare_with_others_img"
          className='z-20 object-contain'
        />

        <img
          src={Plan_your_lessons}
          alt="Plan_your_lessons_img"
          className='z-30 object-contain -ml-36'
        />

      </div>

      {/* CTAButton */}
      <div className='mt-5 w-fit mx-auto'>
        <CTAButton active={true} linkto={"/signup"}>
          <div>
            Learn More
          </div>
        </CTAButton>
      </div>

    </div>
  )
}

export default LearningLanguageSection