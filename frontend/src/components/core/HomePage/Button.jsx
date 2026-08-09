import React from "react";
import { Link } from "react-router-dom";

const Button = ({ children, active, linkto }) => {
  const baseStyles =
    "rounded-sm w-fit px-6 py-3 font-bold transition-all duration-150 cursor-pointer hover:scale-[0.98]";

  const styles = active
    ? "text-richblack-900 bg-yellow-50 border-r-2 border-b-2 border-yellow-500"
    : "text-white bg-richblack-800 border-r-2 border-b-2 border-pure-greys-500";

  return (
    <Link
      to={linkto}
      className={`${baseStyles} ${styles} flex items-center justify-center gap-2`}
    >
      {children}
    </Link>
  );
};

export default Button;