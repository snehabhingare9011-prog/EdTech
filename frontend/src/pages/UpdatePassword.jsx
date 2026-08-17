import React from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { useState } from 'react';
import {Link} from "react-router-dom"
import Loader from '../components/common/Loader';
import toast from "react-hot-toast"
import { resetPass } from '../services/operations/authAPI';
import { useDispatch, useSelector } from 'react-redux';

const UpdatePassword = () => {
    const dispatch=useDispatch()
    const navigate=useNavigate();
    const location=useLocation();
    const {loading}=useSelector(state=>state.auth);
    console.log("dekhte hai bahi kya hai location mein",location);
    let token=location.pathname.split("/").at(-1);

    const [formData,setFormData]=useState({
        pass:"",
        confirmPass:""
    })

    function changeHandler(event){
        setFormData((prev)=>{
            return {
                ...prev,
                [event.target.name]:event.target.value
            }
        })

    }

  async  function submitHandler(event){
        event.preventDefault();

        console.log("dono bhai",formData )

        const data={...formData,token};
        console.log("data",data)

       const result = await dispatch(resetPass(data));
        if(result?.success){
            toast.success("password reset successfully");
            sessionStorage.setItem("email",result.email);
            navigate("/reset-password-success");
            console.log("responce dekhna hai bhai",result);

            setFormData(()=>{
                return {
                    pass:"",
                    confirmPass:""
                }
            })
        }else{
            toast.error(result);
            console.log("result",result)
        }
    }
   
  return (
    <div className="w-full flex-1 flex items-center justify-center px-4 py-6 text-white">

       { loading ? (
          <div className="w-full min-h-[70vh] flex items-center justify-center">
            <Loader/>
          </div>
       ) : (
          <div className="w-full max-w-[450px] rounded-xl bg-richblack-800 p-6 sm:p-8 shadow-lg">

            <h2 className="text-3xl font-semibold text-richblack-5">
              Choose new password
            </h2>

            <p className="mt-3 text-base leading-6 text-richblack-100">
              Almost done. Enter your new password and you're all set.
            </p>

            <form onSubmit={submitHandler} className="mt-6">

              <div className="mb-5">
                <label
                  htmlFor="password"
                  className="mb-2 block text-sm font-medium text-richblack-5"
                >
                  New password
                </label>

                <input
                  type="password"
                  id="password"
                  className="w-full rounded-lg border border-richblack-600 bg-richblack-700 px-4 py-3 text-richblack-5 outline-none transition-all duration-200 focus:border-yellow-50 focus:ring-1 focus:ring-yellow-50"
                  value={formData.pass}
                  onChange={changeHandler}
                  name="pass"
                  placeholder="Enter new password"
                />
              </div>

              <div className="mb-5">
                <label
                  htmlFor="confirm-pass"
                  className="mb-2 block text-sm font-medium text-richblack-5"
                >
                  Confirm new password
                </label>

                <input
                  type="password"
                  id="confirm-pass"
                  value={formData.confirmPass}
                  onChange={changeHandler}
                  name="confirmPass"
                  className="w-full rounded-lg border border-richblack-600 bg-richblack-700 px-4 py-3 text-richblack-5 outline-none transition-all duration-200 focus:border-yellow-50 focus:ring-1 focus:ring-yellow-50"
                  placeholder="Confirm new password"
                />
              </div>

              <button
                type="submit"
                className="mt-2 w-full rounded-lg bg-yellow-50 px-4 py-3 font-medium text-richblack-900 transition-all duration-200 hover:scale-[0.98] hover:bg-yellow-100"
              >
                Reset password
              </button>

            </form>

            <Link
              to="/login"
              className="mt-6 flex items-center gap-x-2 text-sm text-richblack-5 transition-colors hover:text-yellow-50"
            >
              <span>←</span>
              Back to Login
            </Link>

          </div>
       )}

    </div>
  )
}

export default UpdatePassword