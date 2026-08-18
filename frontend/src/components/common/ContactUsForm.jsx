import React, {useState} from "react";
import countryCodes from "../../data/countrycode.json";
import { useForm } from "react-hook-form";

const ContactUsForm = () => {

  const { register, handleSubmit, reset, formState: { errors }, } = useForm();
  const [loading, setLoading] = useState(false);


  const submitContactForm = async (data) => {
    
    console.log("form data:", data);

      // TODO: API call
      // await contactUsAPI(data);

      reset();
   
  };

  return (
    <div className="w-full ">

      <form onSubmit={handleSubmit(submitContactForm)} className="flex flex-col gap-4" >

        {/* First Name + Last Name */}
        <div className="w-full flex flex-col sm:flex-row gap-5">

          {/* First Name */}
          <div className="flex-1 flex flex-col gap-2">

            <label htmlFor="firstName" className="text-sm font-medium text-richblack-5" > First Name </label>

            <input
              type="text"
              id="firstName"
              placeholder="Enter first name"
              className={`w-full rounded-lg border bg-richblack-800 px-4 py-3 text-richblack-5 placeholder:text-richblack-400 outline-none transition-all duration-200 ${
                errors.firstName
                  ? "border-yellow-100"
                  : "border-richblack-700 focus:border-yellow-50 focus:ring-1 focus:ring-yellow-50"
              }`}
              {...register("firstName", {
                required: "Please enter your first name.",
              })}
            />

            {errors.firstName && (
              <span className="text-xs text-yellow-100">
                {errors.firstName.message}
              </span>
            )}

          </div>


          {/* Last Name */}
          <div className="flex-1 flex flex-col gap-2">

            <label htmlFor="lastName" className="text-sm font-medium text-richblack-5" > Last Name </label>

            <input
              type="text"
              id="lastName"
              placeholder="Enter last name"
              className={`w-full rounded-lg border bg-richblack-800 px-4 py-3 text-richblack-5 placeholder:text-richblack-400 outline-none transition-all duration-200 ${
                errors.lastName
                  ? "border-yellow-100"
                  : "border-richblack-700 focus:border-yellow-50 focus:ring-1 focus:ring-yellow-50"
              }`}
              {...register("lastName", {
                required: "Please enter your last name.",
              })}
            />

            {errors.lastName && (
              <span className="text-xs text-yellow-100">
                {errors.lastName.message}
              </span>
            )}

          </div>

        </div>


        {/* Email */}
        <div className="flex flex-col gap-2">

          <label htmlFor="email" className="text-sm font-medium text-richblack-5" > Email Address </label>

          <input
            type="email"
            id="email"
            placeholder="Enter email address"
            className={`w-full rounded-lg border bg-richblack-800 px-4 py-3 text-richblack-5 placeholder:text-richblack-400 outline-none transition-all duration-200 ${
              errors.email
                ? "border-yellow-100"
                : "border-richblack-700 focus:border-yellow-50 focus:ring-1 focus:ring-yellow-50"
            }`}
            {...register("email", {
              required: "Please enter your email address.",
              pattern: {
                value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                message: "Please enter a valid email address.",
              },
            })}
          />

          {errors.email && (
            <span className="text-xs text-yellow-100">
              {errors.email.message}
            </span>
          )}

        </div>


        {/* Phone Number */}
        <div className="flex flex-col gap-2">

          <label htmlFor="phoneNo" className="text-sm font-medium text-richblack-5" > Phone Number </label>

          <div className="flex w-full gap-3">

            {/* Country Code */}
            <select
              id="countryCode"
              className={`w-[150px] cursor-pointer rounded-lg border bg-richblack-800 px-3 py-3 text-richblack-5 outline-none transition-all duration-200 ${
                errors.countryCode
                  ? "border-yellow-100"
                  : "border-richblack-700 focus:border-yellow-50 focus:ring-1 focus:ring-yellow-50"
              }`}
              {...register("countryCode", {
                required: "Please select a country code.",
              })}
            >
              <option value="">
                Select Country
              </option>

              {countryCodes.map((country, index) => (
                <option key={index} value={country.code} > {country.country} ({country.code}) </option>
              ))}
            </select>


            {/* Phone Number */}
            <input
              type="tel"
              id="phoneNo"
              placeholder="1234567890"
              className={`flex-1 rounded-lg border bg-richblack-800 px-4 py-3 text-richblack-5 placeholder:text-richblack-400 outline-none transition-all duration-200 ${
                errors.phoneNo
                  ? "border-yellow-100"
                  : "border-richblack-700 focus:border-yellow-50 focus:ring-1 focus:ring-yellow-50"
              }`}
              {...register("phoneNo", {
                required: {
                  value: true,
                  message: "Please enter your phone number.",
                },

                pattern: {
                  value: /^[0-9]{10}$/,
                  message: "Phone number must contain exactly 10 digits.",
                },
              })}
            />

          </div>


          {/* Country Code Error */}
          {errors.countryCode && (
            <span className="text-xs text-yellow-100">
              {errors.countryCode.message}
            </span>
          )}


          {/* Phone Error */}
          {errors.phoneNo && (
            <span className="text-xs text-yellow-100">
              {errors.phoneNo.message}
            </span>
          )}

        </div>


        {/* Message */}
        <div className="flex flex-col gap-2">

          <label htmlFor="message" className="text-sm font-medium text-richblack-5" > Message </label>

          <textarea
            id="message"
            placeholder="Enter your message..."
            className={`h-40 w-full resize-none rounded-lg border bg-richblack-800 px-4 py-3 text-richblack-5 placeholder:text-richblack-400 outline-none transition-all duration-200 ${
              errors.message
                ? "border-yellow-100"
                : "border-richblack-700 focus:border-yellow-50 focus:ring-1 focus:ring-yellow-50"
            }`}
            {...register("message", {
              required: "Please enter your message.",
              minLength: {
                value: 10,
                message: "Message must contain at least 10 characters.",
              },
            })}
          />

          {errors.message && (
            <span className="text-xs text-yellow-100">
              {errors.message.message}
            </span>
          )}

        </div>


        {/* Submit Button */}
        <button type="submit" disabled={loading} className="mt-2 flex w-full items-center justify-center gap-2 rounded-lg bg-yellow-50 px-6 py-3 text-center text-[14px] font-bold text-richblack-900 shadow-[2px_2px_0px_0px_rgba(255,255,255,0.18)] transition-all duration-200 hover:bg-yellow-100 active:translate-y-[1px] disabled:cursor-not-allowed disabled:opacity-70 sm:text-[16px]" >
          { loading ? (
              <>
                <span className="h-5 w-5 animate-spin rounded-full border-2 border-richblack-900 border-t-transparent"></span>
                Sending...
              </> ) : ("Send Message" )
          }
        </button>

      </form>

    </div>
  );
};

export default ContactUsForm;

// disabled={loading} means the button remains visible with its text, but when loading is true, the button's click/submit action cannot be triggered.