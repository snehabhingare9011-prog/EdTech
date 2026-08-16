import React, { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";

const SignupForm = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
    accountType: "Student",
  });

  const [showCreatePass, setShowCreatePass] = useState(false);
  const [showConfirmPass, setShowConfirmPass] = useState(false);

  function changeHandler(event) {
    const { name, value } = event.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  }

  const changeRoleHandler = (accountType) => {
    setFormData((prev) => ({
      ...prev,
      accountType,
    }));
  };

  function submitHandler(event) {
    event.preventDefault();

    console.log("formData", formData);
  }

  return (
    <form
      onSubmit={submitHandler} className="flex w-full flex-col gap-5">

      {/* Student / Instructor */}
      <div className="flex w-fit rounded-full bg-richblack-800 p-1">

        <button type="button" onClick={() => changeRoleHandler("Student")} className={`rounded-full px-5 py-2 text-sm font-medium transition-all duration-200 
        ${
            formData.accountType === "Student"
            ? "bg-richblack-900 text-richblack-5"
            : "text-richblack-300 hover:text-richblack-5"
        }`}>
          Student
        </button>

        <button type="button" onClick={() => changeRoleHandler("Instructor")} className={`rounded-full px-5 py-2 text-sm font-medium transition-all duration-200
        ${
            formData.accountType === "Instructor"
            ? "bg-richblack-900 text-richblack-5"
            : "text-richblack-300 hover:text-richblack-5"
        }`}>
          Instructor
        </button>

      </div>


      {/* First Name + Last Name */}
      <div className="flex w-full gap-4">

        {/* First Name */}
        <label className="w-1/2">
          <p className="mb-2 text-sm text-richblack-5">
            First Name
            <sup className="ml-1 text-pink-200">*</sup>
          </p>

          <input
            type="text"
            placeholder="Enter First Name"
            value={formData.firstName}
            name="firstName"
            onChange={changeHandler}
            required
            className="
              w-full
              rounded-lg
              border
              border-richblack-700
              bg-richblack-800
              px-4
              py-3
              text-richblack-5
              placeholder:text-richblack-400
              outline-none
              transition-all
              duration-200
              focus:border-yellow-50
            "
          />
        </label>


        {/* Last Name */}
        <label className="w-1/2">
          <p className="mb-2 text-sm text-richblack-5">
            Last Name
            <sup className="ml-1 text-pink-200">*</sup>
          </p>

          <input
            type="text"
            placeholder="Enter Last Name"
            value={formData.lastName}
            name="lastName"
            onChange={changeHandler}
            required
            className="
              w-full
              rounded-lg
              border
              border-richblack-700
              bg-richblack-800
              px-4
              py-3
              text-richblack-5
              placeholder:text-richblack-400
              outline-none
              transition-all
              duration-200
              focus:border-yellow-50
            "
          />
        </label>

      </div>


      {/* Email */}
      <label className="w-full">

        <p className="mb-2 text-sm text-richblack-5">
          Email Address
          <sup className="ml-1 text-pink-200">*</sup>
        </p>

        <input
          type="email"
          placeholder="Enter Email Address"
          value={formData.email}
          name="email"
          onChange={changeHandler}
          required
          className="
            w-full
            rounded-lg
            border
            border-richblack-700
            bg-richblack-800
            px-4
            py-3
            text-richblack-5
            placeholder:text-richblack-400
            outline-none
            transition-all
            duration-200
            focus:border-yellow-50
          "
        />

      </label>


      {/* Create Password + Confirm Password */}
      <div className="flex w-full gap-4 items-center">

        {/* Create Password */}
        <label className="w-1/2">

          <p className="mb-2 text-sm text-richblack-5">
              Create Password
              <sup className="ml-1 text-pink-200">*</sup>
          </p>

          <div className="relative">

              <input type={showCreatePass ? "text" : "password"} placeholder="Enter Password" value={formData.password} name="password" onChange={changeHandler} required className=" w-full rounded-lg border border-richblack-700 bg-richblack-800 px-4 py-3 pr-12 text-richblack-5 placeholder:text-richblack-400 outline-none transition-all duration-200 focus:border-yellow-50 " />

              <button type="button" onClick={() => setShowCreatePass((prev) => !prev)} className=" absolute right-4 top-1/2 -translate-y-1/2 flex items-center justify-center text-richblack-300 hover:text-richblack-5 " >
                  {showCreatePass ? <FaEyeSlash /> : <FaEye />}
              </button>

          </div>

        </label>


        {/* Confirm Password */}
      <label className="w-1/2">

        <p className="mb-2 text-sm text-richblack-5">
            Confirm Password
            <sup className="ml-1 text-pink-200">*</sup>
        </p>

        <div className="relative">

            <input type={showConfirmPass ? "text" : "password"} placeholder="Confirm Password" value={formData.confirmPassword} name="confirmPassword" onChange={changeHandler} required 
            className=" w-full rounded-lg border border-richblack-700 bg-richblack-800 px-4 py-3 pr-12 text-richblack-5 placeholder:text-richblack-400 outline-none transition-all duration-200 focus:border-yellow-50 " />

            <button type="button" onClick={() => setShowConfirmPass((prev) => !prev)}
             className=" absolute right-4 top-1/2 -translate-y-1/2 flex items-center justify-center text-richblack-300 hover:text-richblack-5 " >
                {showConfirmPass ? <FaEyeSlash /> : <FaEye />}
            </button>

        </div>

      </label>

      </div>


      {/* Create Account */}
      <button
        type="submit"
        className="
          mt-2
          flex
          w-full
          items-center
          justify-center
          rounded-lg
          bg-yellow-50
          px-6
          py-3
          font-semibold
          text-richblack-900
          transition-all
          duration-200
          hover:scale-[0.98]
        "
      >
        Create Account
      </button>

    </form>
  );
};

export default SignupForm;