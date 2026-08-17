import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import Loader from '../components/common/Loader';
import {Link} from "react-router-dom"
import { sendEmail } from '../services/operations/authAPI';
import {toast} from "react-hot-toast"
 
export const ForgotPassword = () => {
    console.log("inside the forgot password");
    const [mailSend,setMailSend]=useState(false);
    const {loading}=useSelector(state=>state.auth);
    const dispatch=useDispatch();

    const [email,setEmail]=useState("");

    

   async function submitHanlder(event){
        event.preventDefault();
        console.log("email",email);

       const result= await dispatch(sendEmail(email));

       if(result===true){
        toast.success("mail send successFully");
        setMailSend(true);

       }else{

        toast.error(result);

       }

        

    }
  return (
    <div className="w-full flex-1 flex items-center justify-center px-4 py-6 text-white">

        {
            loading ? (
                <div className="w-full min-h-[70vh] flex items-center justify-center">
                    <Loader/>
                </div>
            ) : (
                <div className="w-full max-w-[450px] rounded-xl bg-richblack-800 p-6 sm:p-8 shadow-lg">

                    {mailSend ? (
                        <div>

                            <h1 className="text-3xl font-semibold text-richblack-5">
                                Check email
                            </h1>

                            <p className="mt-3 text-base leading-6 text-richblack-100">
                                We have sent the reset email to{" "}
                                <span className="text-richblack-5 break-all">
                                    {email}
                                </span>
                            </p>

                            <button
                                onClick={submitHanlder}
                                className="
                                    mt-6
                                    w-full
                                    rounded-lg
                                    bg-yellow-50
                                    px-4
                                    py-3
                                    font-medium
                                    text-richblack-900
                                    transition-all
                                    duration-200
                                    hover:scale-[0.98]
                                    hover:bg-yellow-100
                                "
                            >
                                Resend Email
                            </button>

                            <Link
                                to="/login"
                                className="
                                    mt-5
                                    flex
                                    items-center
                                    justify-center
                                    text-sm
                                    text-richblack-5
                                    transition-colors
                                    hover:text-yellow-50
                                "
                            >
                                Back To Login
                            </Link>

                        </div>
                    ) : (
                        <div>

                            <h2 className="text-3xl font-semibold text-richblack-5">
                                Reset your password
                            </h2>

                            <p className="mt-3 text-base leading-6 text-richblack-100">
                                Have no fear. We’ll email you instructions to reset
                                your password. If you dont have access to your email
                                we can try account recovery.
                            </p>

                            <form
                                onSubmit={submitHanlder}
                                className="mt-6"
                            >

                                <label
                                    htmlFor="email"
                                    className="mb-2 block text-sm font-medium text-richblack-5"
                                >
                                    Email Address
                                </label>

                                <input
                                    id="email"
                                    type="email"
                                    placeholder="Enter your Email"
                                    onChange={(event)=>setEmail(event.target.value)}
                                    value={email}
                                    className="
                                        w-full
                                        rounded-lg
                                        border
                                        border-richblack-600
                                        bg-richblack-700
                                        px-4
                                        py-3
                                        text-richblack-5
                                        outline-none
                                        transition-all
                                        duration-200
                                        placeholder:text-richblack-400
                                        focus:border-yellow-50
                                        focus:ring-1
                                        focus:ring-yellow-50
                                    "
                                />

                                <button
                                    type="submit"
                                    className="
                                        mt-5
                                        w-full
                                        rounded-lg
                                        bg-yellow-50
                                        px-4
                                        py-3
                                        font-medium
                                        text-richblack-900
                                        transition-all
                                        duration-200
                                        hover:scale-[0.98]
                                        hover:bg-yellow-100
                                    "
                                >
                                    Reset Password
                                </button>

                            </form>

                            <Link
                                to="/login"
                                className="
                                    mt-5
                                    flex
                                    items-center
                                    justify-center
                                    text-sm
                                    text-richblack-5
                                    transition-colors
                                    hover:text-yellow-50
                                "
                            >
                                Back To Login
                            </Link>

                        </div>
                    )}

                </div>
            )
        }

    </div>
  )
}