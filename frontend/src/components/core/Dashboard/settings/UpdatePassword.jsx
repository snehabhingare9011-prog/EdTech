import { useForm } from "react-hook-form";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { changePassword } from "../../../../services/operations/settingAPI";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const UpdatePassword = () => {
  const { token } = useSelector((state) => state.auth);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [showOldPass, setOldPass] = useState(false);
  const [showNewPass, setNewPass] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  function SubmitHandler(data) {
    const result = dispatch(changePassword(token, data));
  }

  return (
    <div className="text-white">
      <form onSubmit={handleSubmit(SubmitHandler)}>

        {/* Password Card */}
        <div className="my-10 flex flex-col gap-y-6 rounded-md border border-richblack-700 bg-richblack-800 p-8 px-12">

          <h2 className="text-lg font-semibold text-richblack-5">
            Password
          </h2>

          <div className="flex flex-col gap-5 lg:flex-row">

            {/* Current Password */}
            <div className="flex flex-col gap-2 lg:w-[48%]">

              <label htmlFor="oldPassword" className="text-[14px] text-richblack-5" >
                Current Password
              </label>

              <div className="relative">
                <input
                  type={showOldPass ? "text" : "password"}
                  id="oldPassword"
                  placeholder="Enter Current Password"
                  {...register("oldPassword", {
                    required: {
                      value: true,
                      message: "Old password is required",
                    },
                  })}
                  className="h-[48px] w-full rounded-lg border border-richblack-600 bg-richblack-700 px-3 pr-12 text-richblack-5 outline-none placeholder:text-richblack-400 focus:border-yellow-50"
                />

                <button
                  type="button"
                  onClick={() => setOldPass((prev) => !prev) }
                  className="absolute right-3 top-1/2 flex -translate-y-1/2 items-center justify-center text-richblack-300" >
                  {showOldPass ? (
                     <FaEye size={20} />
                  ) : (
                    <FaEyeSlash size={20} />
                  )}
                </button>
              </div>

              {errors.oldPassword && (
                <span className="-mt-1 text-[12px] text-yellow-100">
                  {errors.oldPassword.message}
                </span>
              )}
            </div>

            {/* New Password */}
            <div className="flex flex-col gap-2 lg:w-[48%]">

              <label htmlFor="newPassword" className="text-[14px] text-richblack-5" >
                New Password
              </label>

              <div className="relative">
                <input
                  type={showNewPass ? "text" : "password"}
                  id="newPassword"
                  placeholder="Enter New Password"
                  {...register("newPassword", {
                    required: {
                      value: true,
                      message: "New password is required",
                    },
                  })}
                  className="h-[48px] w-full rounded-lg border border-richblack-600 bg-richblack-700 px-3 pr-12 text-richblack-5 outline-none placeholder:text-richblack-400 focus:border-yellow-50"
                />

                <button
                  type="button"
                  onClick={() =>
                    setNewPass((prev) => !prev)
                  }
                  className="absolute right-3 top-1/2 flex -translate-y-1/2 items-center justify-center text-richblack-300">
                  {showNewPass ? (
                    <FaEye size={20} /> 
                  ) : (
                    <FaEyeSlash size={20} />
                  )}
                </button>
              </div>

              {errors.newPassword && (
                <span className="-mt-1 text-[12px] text-yellow-100">
                  {errors.newPassword.message}
                </span>
              )}
            </div>

          </div>
        </div>

        {/* Buttons */}
        <div className="flex justify-end gap-2">

          <button
            type="button"
            onClick={() => {
              reset();
              toast.success("Change discarded");
              navigate("/dashboard/my-profile");
            }}
            className="cursor-pointer rounded-md bg-richblack-700 px-5 py-2 font-semibold text-richblack-50"
          >
            Cancel
          </button>

          <button type="submit" className="cursor-pointer rounded-md bg-yellow-50 px-5 py-2 font-semibold text-richblack-900" >
            Update
          </button>

        </div>

      </form>
    </div>
  );
};

export default UpdatePassword;