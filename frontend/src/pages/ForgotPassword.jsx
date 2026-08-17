import React, { useState } from "react";
import { HiBellSnooze } from "react-icons/hi2";
import { useDispatch, useSelector } from "react-redux";
import { FaArrowLeft } from "react-icons/fa";
import { Link } from "react-router-dom";
import Loader from "../components/common/Loader";
import { sendPasswordResetEmail } from "../services/operations/authAPI";

export const ForgotPassword = () => {

    const [emailSent, setEmailSent] = useState(false);
    const [email, setEmail] = useState("");

    const dispatch = useDispatch();
    const { loading } = useSelector((state) => state.auth);

    function changeHandler(event) {
        setEmail(event.target.value);
    }

    function submitHandler(event) {
        event?.preventDefault();

        dispatch(sendPasswordResetEmail(email, setEmailSent));
    }

    return (
        <div className="flex flex-1 items-center justify-center px-4">

            {loading ? (
                <div className="w-screen">
                    <Loader />
                </div>
            ) : (
                <div className="w-full max-w-sm md:max-w-md">

                    <div className="flex flex-col gap-2 text-richblack-100">

                        {/* Icon */}
                        <div className="mb-2 flex h-12 w-12 items-center justify-center rounded-full bg-yellow-50 text-richblack-900">
                            <HiBellSnooze className="text-2xl" />
                        </div>

                        {/* Heading */}
                        <h2 className="text-3xl font-semibold text-richblack-5">
                            {emailSent
                                ? "Check Your Email"
                                : "Reset Your Password"}
                        </h2>

                        {/* Description */}
                        <p className="text-base leading-6">
                            {emailSent
                                ? `We have sent the reset email to ${email}`
                                : "Have no fear. We'll email you instructions to reset your password. If you don't have access to your email, we can try account recovery."}
                        </p>

                        {/* Email Input */}
                        {!emailSent && (
                            <form onSubmit={submitHandler} className="mt-4 flex flex-col gap-1" >

                                <label htmlFor="email" className="text-sm text-richblack-5" >
                                    Email
                                    <span className="text-red-400">*</span>
                                </label>
                                <input required name="email" value={email} onChange={changeHandler} type="email" id="email" placeholder="Enter email address" className="w-full rounded-lg bg-richblack-800 p-3 text-richblack-5 outline-none placeholder:text-richblack-400 focus:ring-1 focus:ring-yellow-50" />

                                <button type="submit" className="mt-4 w-full rounded-lg bg-yellow-50 px-4 py-3 font-medium text-richblack-900 transition-all duration-200 hover:scale-[0.98] hover:bg-yellow-100" >
                                    Submit
                                </button>

                            </form>
                        )}

                        {/* Resend Email */}
                        {emailSent && (
                            <button type="button" onClick={submitHandler} className="mt-4 w-full rounded-lg bg-yellow-50 px-4 py-3 font-medium text-richblack-900 transition-all duration-200 hover:scale-[0.98] hover:bg-yellow-100" >
                                Resend Email
                            </button>
                        )}

                        {/* Back To Login */}
                        <Link
                            to="/login"
                            className="mt-4 flex items-center gap-2 text-sm text-richblack-5 transition-colors hover:text-yellow-50"
                        >
                            <FaArrowLeft />
                            Back To Login
                        </Link>

                    </div>
                </div>
            )}
        </div>
    );
};

