import React from 'react'
import LoginForm from "./LoginForm";
import SignupForm from './SignupForm';
import { FcGoogle } from "react-icons/fc";

const Template = ({heading,description1,description2,type,img,frame}) => {

  return (
   <div className="template-container text-white flex flex-col-reverse md:flex-row md:items-center p-6 gap-7 md:gap-16 w-full select-none">
        {/* left */}

       <div className="template-left md:w-1/2 flex justify-center">
            <div className='max-w-lg p-2 lg:p-8 flex flex-col gap-6'>
                <h2 className='text-3xl font-semibold'>{heading}</h2>
                <div>
                    <p className="desc1 text-xl text-richblack-200">{description1}</p>
                    <p className="desc2 text-lg text-blue-100 italic">{description2}</p>
                </div>
                {
                    type == 'signup' ?  <SignupForm /> : <LoginForm />
                }
                <div className='flex justify-between gap-2 items-center text-richblack-700'>
                    <div className='border flex-1'></div>
                    <div>OR</div>
                    <div className='flex-1 border'></div>
                </div>
                <div className='w-full flex items-center justify-center gap-2 border rounded-lg px-4 py-2 border-richblack-700 text-richblack-200 cursor-pointer'><FcGoogle />Sign Up with Google</div>
            </div>
        </div>
        {/* right */}

        <div className="template-right md:w-1/2 flex justify-center">
            <div className='relative'>
                <img className='max-w-sm md:max-w-md w-full relative z-10' src={img} alt="img" />
                <img className='max-w-sm md:max-w-md w-full absolute top-4 left-4 z-0' src={frame} alt="frame" />
            </div>
        </div>
    </div>
  )
}

export default Template