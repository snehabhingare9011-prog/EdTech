import React from "react";
import { useNavigate } from "react-router-dom";
import { BiArrowBack } from "react-icons/bi";

export const ResetPasswordSucceess = () => {
  const navigate = useNavigate();

  const email = sessionStorage.getItem("email");

  const maskEmail = (email) => {
    if (!email) return "your email";

    const [name, domain] = email.split("@");

    if (!domain) return email;

    if (name.length <= 2) {
      return `${name[0]}***@${domain}`;
    }

    return `${name.slice(0, 2)}***@${domain}`;
  };

  return (
    <div className="w-full flex-1 flex items-center justify-center px-4">

      <div className="w-full max-w-[400px]">

        <h1 className="text-3xl font-semibold text-richblack-5">
          Reset complete!
        </h1>

        <p className="mt-3 text-base leading-6 text-richblack-100">
          All done! We have sent an email to{" "}
          <span className="break-all text-richblack-5">
            {maskEmail(email)}
          </span>{" "}
          to confirm your password reset.
        </p>

        <button onClick={() => navigate("/login")} className=" mt-5 w-full rounded-lg bg-yellow-50 px-4 py-3 font-medium text-richblack-900 transition-all duration-200 hover:scale-[0.98] " >
          Return to login
        </button>

        <button onClick={() => navigate("/login")} className=" mt-5 flex items-center gap-x-2 text-sm text-richblack-5 transition-colors hover:text-yellow-50 " >
          <BiArrowBack />
          Back to login
        </button>

      </div>

    </div>
  );
};