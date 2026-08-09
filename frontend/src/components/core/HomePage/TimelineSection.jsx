import React from 'react';
import timelineImage from "../../../assets/Images/TimelineImage.png"
import logo1 from "../../../assets/TimeLineLogo/Logo1.svg"
import logo2 from "../../../assets/TimeLineLogo/Logo2.svg"
import logo3 from "../../../assets/TimeLineLogo/Logo3.svg"
import logo4 from "../../../assets/TimeLineLogo/Logo4.svg"

const TimelineSection = () => {
    console.log("inside the timeline ",logo1)
    const timeline=[
        {
            logo:logo1,
            heading:"Leadership",
            description:"Fully committed to the success company"
        },
        {
            logo:logo2,
            heading:"Responsibility",
            description:"Students will always be our top priority"
        },
        {
            logo:logo3,
            heading:"Flexibility",
            description:"The ability to switch is an important skills"
        },
        {
            logo:logo4,
            heading:"Solve the problem",
            description:"Code your way to a solution"
        },
    ]
  return (
    <div>
        <div className='flex flex-row gap-15 items-center'>
            <div className='w-[45%]  flex flex-col gap-5'>
                {
                    timeline.map((element,index)=>{
                       
                        return <div className='flex flex-row gap-6' key={index}>
                                    {/* Left Side */}
                                    <div className="flex flex-col items-center">
                                        {/* Icon */}
                                        <div className="w-14 h-14 rounded-full bg-white shadow-md flex items-center justify-center z-10">
                                        <img src={element.logo} alt={element.heading} />
                                        </div>

                                        {/* Vertical Dotted Line */}
                                        {index !== timeline.length - 1 && (
                                        <div className=" mt-2 w-px h-10 border-l-2 border-dotted border-pure-greys-200"></div>
                                        )}
                                    </div>
                                    
                                    {/* Right Side */}
                                    <div>
                                        <h2 className='font-semibold text-[18px]'>{element.heading}</h2>
                                        <p className='text-base  text-richblack-400'>{element.description}</p>
                                    </div>
                                </div>
                    })
                }

            </div>
           
            
        <div className='relative flex items-center justify-center'>

            {/* Blue gradient background */}
            <div className='absolute -inset-6 rounded-2xl bg-gradient-to-r from-[#9CECFB] via-[#65C7F7] to-[#0052D4] blur-2xl opacity-70'></div>

            {/* Image */}
            <div className='relative z-10'>
                <img
                    src={timelineImage}
                    alt="timelineImage"
                    className='w-full object-contain'
                />
            </div>

            {/* Green Card */}
            <div className="absolute z-20 -bottom-10 left-1/2 -translate-x-1/2 bg-caribbeangreen-700 w-[85%] py-8 px-10 flex justify-between items-center">

                {/* Left */}
                <div className="flex items-center gap-4">
                    <h1 className="text-4xl font-bold text-white">
                        10
                    </h1>

                    <div className="text-caribbeangreen-300 uppercase text-sm">
                        <p>Years</p>
                        <p>Experience</p>
                    </div>
                </div>

                {/* Divider */}
                <div className="h-12 border-l border-caribbeangreen-500"></div>

                {/* Right */}
                <div className="flex items-center gap-4">
                    <h1 className="text-4xl font-bold text-white">
                        250
                    </h1>

                    <div className="text-caribbeangreen-300 uppercase text-sm">
                        <p>Types of</p>
                        <p>Courses</p>
                    </div>
                </div>

            </div>

        </div>
        
    </div>
    </div>
  )
}

export default TimelineSection