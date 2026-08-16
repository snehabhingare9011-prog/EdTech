import React, { useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { GoTriangleDown } from "react-icons/go";
import { VscDashboard, VscSignOut } from "react-icons/vsc";
import { useNavigate } from "react-router-dom";
import useOnClickOutside from "../../../hooks/useOnClickOutside";
import { logout } from "../../../services/operations/authAPI";

const ProfileDropdown = () => {
  console.log("inside the profile dropdown ");

  const { user } = useSelector((state) => state.profile);
  const [open, setOpen] = useState(false);
  const dropdownRef = useRef(null);
  console.log("dropdown",dropdownRef)
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Close dropdown when user clicks outside
  useOnClickOutside(dropdownRef, () => {
    setOpen(false);
  });


  const handleLogout = async () => {

    setOpen(false);
    await dispatch(logout());
    navigate("/login");
  };

  return (
    <div ref={dropdownRef} className="relative flex items-center gap-2" >
      {/* Profile Image */}
      
      <img
        src={user.image}
        alt="Profile"
        className="h-9 w-9 rounded-full object-cover border border-richblack-600"
      />

      {/* Dropdown Arrow */}
      <button
        type="button"
        onClick={() => setOpen((prev) => !prev)}
        className="flex items-center justify-center rounded-md p-1 transition-all duration-200 hover:bg-richblack-700"
      >
        <GoTriangleDown
          size={20}
          className={`text-richblack-200 transition-transform duration-200 ${
            open ? "rotate-180" : ""
          }`}
        />
      </button>

      {/* Dropdown */}
      {open && (
        <div className=" absolute right-0 top-full z-50 mt-3 w-44 overflow-hidden rounded-lg border border-richblack-700 bg-richblack-800 shadow-lg ">
          {/* Dashboard */}
          <button
            type="button"
            onClick={() => {
              setOpen(false);
              navigate("/dashboard");
            }}
            className=" flex w-full items-center gap-3 px-4 py-3 text-left text-sm text-richblack-100 transition-colors duration-200 hover:bg-richblack-700 hover:text-white " >

            <VscDashboard className="text-lg" />
            <span>Dashboard</span>
          </button>

          {/* Divider */}
          <div className="h-px bg-richblack-700" />

          {/* Logout */}
          <button
            type="button"
            onClick={handleLogout}
            className=" flex w-full items-center gap-3 px-4 py-3 text-left text-sm text-richblack-100 transition-colors duration-200 hover:bg-richblack-700 hover:text-red-400 " >

            <VscSignOut className="text-lg" />
            <span>Logout</span>
          </button>
        </div>
      )}
    </div>
  );
};

export default ProfileDropdown;