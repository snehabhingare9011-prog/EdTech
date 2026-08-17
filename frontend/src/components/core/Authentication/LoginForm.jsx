import React, { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import CTAButton from "../../common/Button"
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { login } from "../../../services/operations/authAPI";
import {toast} from "react-hot-toast";

const LoginForm = () => {
  const dispatch=useDispatch();
  const navigate=useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });



  const [showPassword, setShowPassword] = useState(false);

  function changeHandler(event) {
    const { name, value } = event.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  }

async  function submitHandler(event) {
    event.preventDefault();
    console.log("formData", formData);
    const result= await dispatch(login(formData.email,formData.password,navigate));

    if(result===true){

      setFormData(
        {
          email:"",
          password:""
        }
      )
       toast.success("Login Successfull")
       navigate('/dashboard');

    }else{
      toast.error(result);
    }
    
  }

  return (
    <form onSubmit={submitHandler} className="flex flex-col gap-5">

      {/* Email */}
      <label className="w-full">
        <p className="mb-1 text-[0.875rem] leading-[1.375rem] text-richblack-5">
          Email Address <sup className="text-pink-200">*</sup>
        </p>

        <input
          type="email"
          placeholder="Enter your email"
          value={formData.email}
          name="email"
          onChange={changeHandler}
          required
          className="w-full rounded-[0.5rem] bg-richblack-800 p-[12px] text-richblack-5 shadow-sm outline-none border-b border-richblack-600 focus:border-yellow-50"
        />
      </label>

      {/* Password */}
      <label className="relative w-full">
        <p className="mb-1 text-[0.875rem] leading-[1.375rem] text-richblack-5">
          Password <sup className="text-pink-200">*</sup>
        </p>

        <input
          type={showPassword ? "text" : "password"}
          placeholder="Enter Your Password"
          value={formData.password}
          name="password"
          onChange={changeHandler}
          id="password"
          required
          className="w-full rounded-[0.5rem] bg-richblack-800 p-[12px] pr-12 text-richblack-5 shadow-sm outline-none border-b border-richblack-600 focus:border-yellow-50"
        />

        {/* Eye button */}
        <button
          type="button"
          onClick={() => setShowPassword((prev) => !prev)}
          className="absolute right-3 top-[38px] text-richblack-300 hover:text-richblack-5"
        >
          {showPassword ? <FaEye />:<FaEyeSlash /> }
        </button>

        {/* Forgot Password */}
        <div className="mt-1 text-right">
          <button
            type="button"
            className="text-xs font-medium text-blue-100 hover:underline" onClick={()=>navigate("/forgot-password")}
          >
            Forgot Password
          </button>
        </div>
      </label>

      {/* sing in  Button */}
       <button
        type="submit"
        className="mt-4 flex w-full items-center justify-center rounded-[8px] bg-yellow-50 px-6 py-3 font-semibold text-richblack-900 transition-all duration-200 hover:scale-[0.98]" >
        Sign In
      </button>
      
      

    </form>
  );
};

export default LoginForm;