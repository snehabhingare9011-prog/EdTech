import React from 'react'
import HighlightText from '../../common/HighlightText'
import CTAButton from '../../common/Button'
const LearningGrid = () => {
  return (
        <div className='max-w-80 md:max-w-maxContent md:w-[80%] lg:w-[90%] grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 lg:grid-row-2 mx-auto'>

            <div className='md:col-span-2 px-4 pt-2 pb-6 flex flex-col justify-between gap-4'>
              <div className='flex flex-col gap-3'>
                <div className='text-2xl md:text-3xl font-semibold lg:text-4xl text-white'>World-Class Learning for <HighlightText>Anyone, Anywhere</HighlightText></div>
                <p className='text-richblack-300'>Studynotion partners with more than 275+ leading universities and companies to bring flexible, affordable, job-relevant online learning to individuals and organizations worldwide.</p>
              </div>
              <CTAButton active={true} linkto={"#"}>Learn More</CTAButton>
            </div>
            
            <div className='flex flex-col h-75 px-8 py-10 gap-6 bg-richblack-700'>
              <h3 className='text-white text-xl font-semibold'>Curriculum Based on Industry Needs</h3>
              <p className='text-richblack-100'>Save time and money! The Belajar curriculum is made to be easier to understand and in line with industry needs.</p>
            </div>
            <div className='flex flex-col h-75 px-8 py-10 gap-6 bg-richblack-800'>
              <h3 className='text-white text-xl font-semibold'>Our Learning Methods</h3>
              <p className='text-richblack-100'>The learning process uses the namely online and offline.</p>
            </div>
            <div className='hidden lg:block'></div>
            <div className='flex md:hidden lg:flex flex-col h-75 px-8 py-10 gap-6 bg-richblack-700'>
              <h3 className='text-white text-xl font-semibold'>Certification</h3>
              <p className='text-richblack-100'>You will get a certificate that can be used as a certification during job hunting.</p>
            </div>
            <div className='flex flex-col h-75 px-8 py-10 gap-6 bg-richblack-800'>
              <h3 className='text-white text-xl font-semibold'>Rating "Auto-grading"</h3>
              <p className='text-richblack-100'>You will immediately get feedback during the learning process without having to wait for an answer or response from the mentor.</p>
            </div>
            <div className='flex flex-col h-75 px-8 py-10 gap-6 bg-richblack-700'>
              <h3 className='text-white text-xl font-semibold'>Ready to Work</h3>
              <p className='text-richblack-100'>Connected with over 150+ hiring partners, you will have the opportunity to find a job after graduating from our program.</p>
            </div>
        </div>
  )
}

export default LearningGrid