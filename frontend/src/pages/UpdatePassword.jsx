import React, { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { BiArrowBack } from "react-icons/bi";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams, useNavigate } from "react-router-dom";

import Loader from "../components/common/Loader";
import { resetPassword } from "../services/operations/authAPI";

const UpdatePassword = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { token } = useParams();

  const { loading } = useSelector((state) => state.auth);

  const [formData, setFormData] = useState({
    password: "",
    confirmPassword: "",
  });

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    dispatch( resetPassword( formData.password, formData.confirmPassword, token, navigate ) );
  };

  return (
    <div className="w-full flex-1 flex items-center justify-center px-4 py-8 text-white">

      {loading ? (
        <div className="flex min-h-[70vh] w-full items-center justify-center">
          <Loader />
        </div>
      ) : (
        <div className="w-full max-w-[450px] rounded-xl bg-richblack-800 p-6 shadow-[0_10px_40px_rgba(0,0,0,0.25)] sm:p-8">

          {/* Heading */}
          <div className="mb-7">
            <h1 className="text-3xl font-semibold text-richblack-5">
              Choose new password
            </h1>

            <p className="mt-3 text-base leading-6 text-richblack-200">
              Almost done. Enter your new password and you're all set.
            </p>
          </div>

          <form onSubmit={handleSubmit}>

            {/* New Password */}
            <div className="mb-5">

              <label
                htmlFor="password"
                className="mb-2 block text-sm font-medium text-richblack-5"
              >
                New Password
                <sup className="ml-1 text-pink-200">*</sup>
              </label>

              <div className="relative">

                <input id="password" name="password" type={showPassword ? "text" : "password"} value={formData.password} onChange={handleChange} placeholder="Enter new password" required className="w-full rounded-lg border border-richblack-600 bg-richblack-700 px-4 py-3 pr-12 text-richblack-5 placeholder:text-richblack-400 outline-none transition-all duration-200 focus:border-yellow-50 focus:ring-1 focus:ring-yellow-50" />

                <button
                  type="button"
                  onClick={() =>
                    setShowPassword((prev) => !prev)
                  }
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-richblack-300 transition-colors hover:text-richblack-5"
                  aria-label={
                    showPassword
                      ? "Hide password"
                      : "Show password"
                  }
                >
                  {showPassword ?  (<FaEye size={18} /> ): <FaEyeSlash size={18} /> }
                </button>

              </div>
            </div>

            {/* Confirm Password */}
            <div className="mb-6">

              <label
                htmlFor="confirmPassword"
                className="mb-2 block text-sm font-medium text-richblack-5"
              >
                Confirm New Password
                <sup className="ml-1 text-pink-200">*</sup>
              </label>

              <div className="relative">

                <input
                  id="confirmPassword"
                  name="confirmPassword"
                  type={
                    showConfirmPassword
                      ? "text"
                      : "password"
                  }
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  placeholder="Confirm new password"
                  required
                  className="w-full rounded-lg border border-richblack-600 bg-richblack-700 px-4 py-3 pr-12 text-richblack-5 placeholder:text-richblack-400 outline-none transition-all duration-200 focus:border-yellow-50 focus:ring-1 focus:ring-yellow-50"
                />

                <button
                  type="button"
                  onClick={() =>
                    setShowConfirmPassword(
                      (prev) => !prev
                    )
                  }
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-richblack-300 transition-colors hover:text-richblack-5"
                  aria-label={
                    showConfirmPassword
                      ? "Hide confirm password"
                      : "Show confirm password"
                  }
                >
                  {showConfirmPassword ? (
                     <FaEye size={18} />
                  ) : (
                   
                    <FaEyeSlash size={18} />
                  )}
                </button>

              </div>
            </div>

            {/* Reset Password */}
            <button
              type="submit"
              className="w-full rounded-lg bg-yellow-50 px-4 py-3 font-semibold text-richblack-900 transition-all duration-200 hover:scale-[0.98] hover:bg-yellow-100 active:scale-[0.96]"
            >
              Reset Password
            </button>

          </form>

          {/* Back To Login */}
          <Link
            to="/login"
            className="mt-6 flex w-fit items-center gap-2 text-sm text-richblack-100 transition-colors hover:text-yellow-50"
          >
            <BiArrowBack />
            Back To Login
          </Link>

        </div>
      )}

    </div>
  );
};

export default UpdatePassword;