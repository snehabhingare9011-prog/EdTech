import React, { useState } from "react";
import { sidebarLinks } from "../../../data/dashboard-links";
import { useDispatch, useSelector } from "react-redux";
import SidebarLink from "./SidebarLink";
import ConfirmationModal from "../../common/ConfirmationModal"
import { logout } from "../../../services/operations/authAPI";
import { useNavigate } from "react-router-dom";
import { VscSettingsGear, VscSignOut } from "react-icons/vsc";
import Loader from "../../common/Loader";

const Sidebar = () => {

  const { user, loading: profileLoading } = useSelector( (state) => state.profile );

  const { loading: authLoading } = useSelector( (state) => state.auth );

  const [confirmationModal, setConfirmationModal] = useState(null);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  console.log("user", user);

  if (profileLoading || authLoading) {
    return (
        <Loader/>
    );
  }

  return (
    <div className="w-full h-full min-w-[220px] bg-richblack-800 flex flex-col border-r border-richblack-700 font-semibold text-md pt-4">

      {/* Sidebar Links */}

      <div className="flex flex-col">

        {sidebarLinks.map((link) => {

          if (link?.type && link.type !== user?.accountType) {
            return null;
          }

          return (
            <SidebarLink key={link.id} link={link} iconName={link.icon} />
          );

        })}

      </div>


      {/* Divider */}

      <div className="px-2 py-5 w-full">
        <div className="w-full border border-richblack-600"></div>
      </div>


      {/* Settings + Logout */}

      <div className="flex flex-col">

        {/* Settings */}

        <SidebarLink
          link={{
            name: "Settings",
            path: "/dashboard/settings",
            icon: "VscSettingsGear",
          }}
          iconName="VscSettingsGear"
        />


        {/* Logout */}

        <button
          type="button"
          onClick={() =>
            setConfirmationModal({
              text1: "Are You Sure?",
              text2: "You Will be logged out of your Account",
              btn1Text: "Logout",
              btn2Text: "Cancel",

              btn1Handler: () => {
                dispatch(logout());
                navigate("/login");
              },

              btn2Handler: () => {
                setConfirmationModal(null);
              },
            })
          }
          className="w-full flex gap-3 text-md text-richblack-300 items-center px-4 py-3 cursor-pointer transition-all duration-200 hover:bg-richblack-700 hover:text-richblack-5 text-left"
        >
          <VscSignOut className="text-lg" />
          <span>Logout</span>
        </button>

      </div>


      {/* Confirmation Modal */}

      { confirmationModal && ( <ConfirmationModal modalData={confirmationModal} /> )}

    </div>
  );
};

export default Sidebar;