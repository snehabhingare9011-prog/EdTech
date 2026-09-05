import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { updateProfile } from "../../../../services/operations/settingAPI";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast"

const EditProfile = () => {
  const navigate = useNavigate();
  const token = useSelector((state) => state.auth.token);
  const user = useSelector((state) => state.profile.user);

  const dispatch = useDispatch();

  const {
    register,
    reset,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const submitHandler = (data) => {
    console.log("Form Data:", data);
    console.log("Token:", token);

    dispatch(updateProfile(token, data));

  };

  return (
    <div className="bg-richblack-900 text-white mt-10  ">
      <div className="w-full ">
      <form onSubmit={handleSubmit(submitHandler)}>

        {/* ================= CARD ================= */}
        <div className="rounded-md border border-richblack-600 bg-richblack-800 px-6 py-8">

          {/* Heading */}
          <h1 className="mb-8 text-xl font-semibold text-richblack-5">
            Profile Information
          </h1>

          {/* ================= ROW 1 ================= */}
          <div className="mb-7 grid grid-cols-1 gap-5 md:grid-cols-2">

            {/* First Name */}
            <div>
              <label htmlFor="firstName" className="mb-2 block text-sm text-richblack-5" >
                First Name
              </label>

              <input
                type="text"
                id="firstName"
                placeholder="Enter first name"
                defaultValue={user?.firstName || ""}
                {...register("firstName", {
                  required: "First Name is required",
                })}
                className="h-[55px] w-full rounded-lg border border-richblack-600 bg-richblack-700 px-3 text-base text-white outline-none focus:border-yellow-50"
              />

              {errors.firstName && (
                <p className="mt-1 text-xs text-pink-400">
                  {errors.firstName.message}
                </p>
              )}
            </div>

            {/* Last Name */}
            <div>
              <label htmlFor="lastName" className="mb-2 block text-sm text-richblack-5" >
                Last Name
              </label>

              <input
                type="text"
                id="lastName"
                placeholder="Enter last name"
                defaultValue={user?.lastName || ""}
                {...register("lastName", {
                  required: "Last Name is required",
                })}
                className="h-[55px] w-full rounded-lg border border-richblack-600 bg-richblack-700 px-3 text-base text-white outline-none focus:border-yellow-50"
              />

              {errors.lastName && (
                <p className="mt-1 text-xs text-pink-400">
                  {errors.lastName.message}
                </p>
              )}
            </div>
          </div>

          {/* ================= ROW 2 ================= */}
          <div className="mb-7 grid grid-cols-1 gap-5 md:grid-cols-2">

            {/* Date Of Birth */}
            <div>
              <label htmlFor="dateOfBirth" className="mb-2 block text-sm text-richblack-5" >
                Date Of Birth
              </label>

              <input
                type="date"
                id="dateOfBirth"
                defaultValue={
                  user?.additionalDetails?.dateOfBirth
                    ?.split("T")[0] || ""
                }
                {...register("dateOfBirth", {
                  required: "Date Of Birth is required",

                  max: {
                    value: new Date()
                      .toISOString()
                      .split("T")[0],
                    message:
                      "Date of Birth cannot be in the future.",
                  },
                })}
                className="h-[55px] w-full rounded-lg border border-richblack-600 bg-richblack-700 px-3 text-base text-white outline-none focus:border-yellow-50"
              />

              {errors.dateOfBirth && (
                <p className="mt-1 text-xs text-pink-400">
                  {errors.dateOfBirth.message}
                </p>
              )}
            </div>

            {/* Gender */}
            <div>
              <label htmlFor="gender" className="mb-2 block text-sm text-richblack-5" >
                Gender
              </label>

              <select
                id="gender"
                defaultValue={
                  user?.additionalDetails?.gender || ""
                }
                {...register("gender", {
                  required: "Gender is required",
                })}
                className="h-[55px] w-full rounded-lg border border-richblack-600 bg-richblack-700 px-3 text-base text-white outline-none focus:border-yellow-50"
              >
                <option value="">Select Gender</option>
                <option value="male">Male</option>
                <option value="female">Female</option>
                <option value="other">Other</option>
              </select>

              {errors.gender && (
                <p className="mt-1 text-xs text-pink-400">
                  {errors.gender.message}
                </p>
              )}
            </div>
          </div>

          {/* ================= ROW 3 ================= */}
          <div className="grid grid-cols-1 gap-5 md:grid-cols-2">

            {/* Contact Number */}
            <div>
              <label htmlFor="contactNumber" className="mb-2 block text-sm text-richblack-5" >
                Contact Number
              </label>

              <input
                type="tel"
                id="contactNumber"
                placeholder="Enter Contact Number"
                defaultValue={
                  user?.additionalDetails?.contactNumber || ""
                }
                {...register("contactNumber", {
                  required: "Contact Number is required",

                  pattern: {
                    value: /^[6-9]\d{9}$/,
                    message:
                      "Please enter a valid 10-digit contact number.",
                  },
                })}
                className="h-[55px] w-full rounded-lg border border-richblack-600 bg-richblack-700 px-3 text-base text-white outline-none focus:border-yellow-50"
              />

              {errors.contactNumber && (
                <p className="mt-1 text-xs text-pink-400">
                  {errors.contactNumber.message}
                </p>
              )}
            </div>

            {/* About */}
            <div>
              <label htmlFor="about" className="mb-2 block text-sm text-richblack-5" >
                About
              </label>

              <textarea
                id="about"
                placeholder="Tell us about yourself..."
                rows="2"
                defaultValue={
                  user?.additionalDetails?.about || ""
                }
                {...register("about", {
                  required:
                    "Please enter something about yourself.",

                  minLength: {
                    value: 10,
                    message:
                      "About must be at least 10 characters.",
                  },

                  maxLength: {
                    value: 500,
                    message:
                      "About cannot exceed 500 characters.",
                  },
                })}
                className="h-[55px] w-full resize-none rounded-lg border border-richblack-600 bg-richblack-700 px-3 py-3 text-base text-white outline-none focus:border-yellow-50"
              />

              {errors.about && (
                <p className="mt-1 text-xs text-pink-400">
                  {errors.about.message}
                </p>
              )}
            </div>
          </div>
        </div>

        {/* ================= BUTTONS ================= */}
        <div className="mt-7 flex justify-end gap-3">

          <button
            type="button"
            onClick={() =>{
               reset({
                  firstName: user?.firstName || "",
                  lastName: user?.lastName || "",
                  dateOfBirth:
                     user?.additionalDetails?.dateOfBirth?.split("T")[0] || "",
                  gender: user?.additionalDetails?.gender || "",
                  contactNumber:
                     user?.additionalDetails?.contactNumber || "",
                  about: user?.additionalDetails?.about || "",
               })

              toast.success("Changes discarded");
              navigate("/dashboard/my-profile");
            }}
            className="rounded-lg bg-richblack-700 px-6 py-3 text-sm font-semibold text-richblack-100 hover:bg-richblack-600"
          >
            Cancel
          </button>

          <button
            type="submit"
            className="rounded-lg bg-yellow-50 px-6 py-3 text-sm font-semibold text-richblack-900 hover:bg-yellow-100"
          >
            Save
          </button>

        </div>
        </form>

      </div>
    </div>
  );
};

export default EditProfile;