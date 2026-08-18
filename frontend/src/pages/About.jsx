import React from 'react'
import HighlightText from "../components/common/HighlightText"
import About1 from "../assets/Images/aboutus1.webp"
import About2 from "../assets/Images/aboutus2.webp"
import About3 from "../assets/Images/aboutus3.webp"
import { FaQuoteLeft, FaQuoteRight } from "react-icons/fa";
import FoundingStory from "../assets/Images/FoundingStory.png"
import LearningGrid from '../components/core/AboutUsPage/LearningGrid'
import ContactFormSection from '../components/core/AboutUsPage/ContactFormSection'
import Footer from "../components/common/Footer"

const About = () => {
  return (
  <div className='w-full bg-richblack-900'>
     {/* first section */}
     <div>
      {/* Top Section */}
      <div className='relative bg-richblack-800 flex flex-col items-center'>
          <div className='w-[90%] lg:w-[70%] p-4 flex flex-col items-center mt-5 mb-2 md:mt-10 md:mb-7 max-w-maxContent'>
            <h1 className='text-3xl md:text-4xl text-center font-bold text-white mb-5 lg:my-2'>Driving Innovation in Online Education for a <HighlightText>Brighter Future</HighlightText></h1>
            <p className='font-inter text-center text-richblack-300'>Studynotion is at the forefront of driving innovation in online education. We're passionate about creating a brighter future by offering cutting-edge courses, leveraging emerging technologies, and nurturing a vibrant learning community.</p>
          </div>
          <div className='relative w-full lg:h-60 flex justify-center'>
            {/* glow effect */}
            <div className='inset-0 absolute  lg:top-5 z-0'>
              <div className='w-[20%] md:w-[50%] h-[10%] lg:w-[25%] lg:h-[25%] bg-orange-400 opacity-90 blur-3xl rounded-full mx-auto'></div>
            </div>
            <div className='z-10 lg:absolute grid md:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-7 lg:left-1/2 lg:-translate-x-1/2 lg:w-[80%] mb-5 lg:mb-0 mx-4 max-w-maxContent'>
              <img className='md:max-w-85 lg:max-w-full w-full' src={About1} alt='about1'></img>
              <img className='md:max-w-85 lg:max-w-full w-full' src={About2} alt='about2'></img>
              <img className='md:max-w-85 lg:max-w-full w-full col-span-1 md:col-span-2 md:justify-self-center lg:col-span-1' src={About3} alt='about3'></img>
            </div>
          </div>
      </div>

      {/* Bottom Section */}
        <div className='bg-richblack-900 py-12 min-[1350px]:pt-25 md:w-[80%] mx-4 md:mx-auto max-w-maxContent'>
          <h2 className=" font-semibold font-inter text-richblack-100 text-2xl md:text-3xl lg:text-4xl leading-normal text-center"><FaQuoteLeft className='text-richblack-600 inline text-xl md:text-2xl mr-2 mb-6' />We are passionate about revolutionizing the way we learn. Our innovative platform <span className='bg-linear-to-r from-[#1FA2FF] via-[#12D8FA] to-[#A6FFCB] text-transparent bg-clip-text'>combines technology</span>, <span className='bg-linear-to-r from-[#FF512F] to-[#F09819] text-transparent bg-clip-text'>expertise</span>, and community to create an <span className='bg-linear-to-r from-[#E65C00] to-[#F9D423] text-transparent bg-clip-text'>unparalleled educational experience.</span><FaQuoteRight className='inline text-xl md:text-2xl mr-2 mb-6 text-richblack-600' /></h2>
        </div>
     </div>

     {/* Second Section */}
    <div className="bg-richblack-900">

      {/*second section part 1 := Founding Story Section */}
      <div className="lg:w-[80%] max-w-maxContent flex flex-col lg:flex-row items-center mx-auto justify-between py-5 md:py-10 px-4">

        {/* Founding Story Content 1 */}
        <div className="max-w-125 lg:max-w-none lg:w-[45%] flex flex-col gap-4 font-inter">

      
          <h2 className="font-inter font-semibold text-2xl md:text-3xl lg:text-4xl bg-linear-to-r from-[#833AB4] via-[#FD1D1D] to-[#FCB045] bg-clip-text text-transparent">
            Our Founding Story
          </h2>

         
          <p className="text-richblack-300">
            Our e-learning platform was born out of a shared vision and passion
            for transforming education. It all began with a group of educators,
            technologists, and lifelong learners who recognized the need for
            accessible, flexible, and high-quality learning opportunities in a
            rapidly evolving digital world.
          </p>

          <p className="text-richblack-300">
            As experienced educators ourselves, we witnessed firsthand the
            limitations and challenges of traditional education systems. We
            believed that education should not be confined to the walls of a
            classroom or restricted by geographical boundaries. We envisioned
            a platform that could bridge these gaps and empower individuals
            from all walks of life to unlock their full potential.
          </p>
        </div>

        {/* Founding Story Image 2 */}
        <div className="lg:w-[50%] relative mt-6 lg:mt-0 md:px-2 md:py-4 flex justify-center">

          <div className="relative max-w-120">

            {/* Image Glow Effect */}
            <div className="inset-0 absolute z-0">
              <div className="w-full h-full bg-orange-400 opacity-90 blur-md rounded-sm mx-auto"></div>
            </div>

            {/* Founding Story Image */}
            <img
              className="w-full relative z-50"
              src={FoundingStory}
              alt="aboutus"
            />
          </div>
        </div>
      </div>

      {/*second section part 2 := Vision and Mission Section */}
      <div className="sm:w-[90%] md:w-[80%] max-w-maxContent px-4 py-10 lg:py-20 flex flex-col gap-6 md:gap-0 md:flex-row justify-between mx-auto font-inter">

        {/* Vision  1*/}
        <div className="md:w-[45%] flex flex-col gap-4">

          <h2 className="font-inter font-semibold text-2xl md:text-3xl lg:text-4xl bg-linear-to-r from-[#E65C00] to-[#F9D423] bg-clip-text text-transparent">
            Our Vision
          </h2>

          <p className="text-richblack-300">
            With this vision in mind, we set out on a journey to create an
            e-learning platform that would revolutionize the way people learn.
            Our team of dedicated experts worked tirelessly to develop a robust
            and intuitive platform that combines cutting-edge technology with
            engaging content, fostering a dynamic and interactive learning experience.
          </p>
        </div>

        {/* Mission 2 */}
        <div className="md:w-[45%] flex flex-col gap-4">

          <h2 className="font-inter font-semibold text-2xl md:text-3xl lg:text-4xl bg-linear-to-r from-[#1FA2FF] via-[#12D8FA] to-[#A6FFCB] bg-clip-text text-transparent">
            Our Mission
          </h2>

          <p className="text-richblack-300">
            Our mission goes beyond just delivering courses online. We wanted
            to create a vibrant community of learners, where individuals can
            connect, collaborate, and learn from one another. We believe that
            knowledge thrives in an environment of sharing and dialogue, and we
            foster this spirit of collaboration through forums, live sessions,
            and networking opportunities.
          </p>
        </div>

      </div>

    </div>

    {/* Third Section  */}
    <div className='bg-richblack-800 flex justify-center gap-3 md:gap-5 lg:gap-10 py-15 flex-wrap'>
      <div className='flex flex-col gap-2 w-50 items-center'>
        <div className='text-white font-semibold font-inter text-2xl'>5K</div>
        <div className='text-richblack-500'>Active Students</div>
      </div>
      <div className='flex flex-col gap-2 w-50 items-center'>
        <div className='text-white font-semibold font-inter text-2xl'>10+</div>
        <div className='text-richblack-500'>Mentors</div>
      </div>
      <div className='flex flex-col gap-2 w-50 items-center'>
        <div className='text-white font-semibold font-inter text-2xl'>200+</div>
        <div className='text-richblack-500'>Courses</div>
      </div>
      <div className='flex flex-col gap-2 w-50 items-center'>
        <div className='text-white font-semibold font-inter text-2xl'>50+</div>
        <div className='text-richblack-500'>Awards</div>
      </div>
    </div>

    {/* Fourth Section */}
    <div className='bg-richblack-900 font-inter py-15 px-4'>
      <LearningGrid />
    </div>

     {/* fifth section := contact us section */} 
    <div className='bg-richblack-900 font-inter py-15 px-4'> 
      <div className='w-[90%] sm:w-[80%] md:w-[60%] lg:w-[45%] max-w-175 mx-auto'>
        <ContactFormSection />
      </div>
    </div>

    {/* TODO := sixth section review & rating */}

    {/* seventh section:= footer  */}
     <Footer/>


  </div>
  )
}

export default About