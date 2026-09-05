import { FiTrash2 } from "react-icons/fi";
import { useDispatch, useSelector } from "react-redux";
import { deleteProfile } from "../../../../services/operations/settingAPI"
import {logout} from "../../../../services/operations/authAPI";

const DeleteAccount = () => {
  const { token } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

 const handleDeleteAccount = async () => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete your account?\n\nYour account will be permanently deleted after 3 days."
    );

    if (!confirmDelete) {
      return;
    }

    const success = await dispatch(deleteProfile(token));

    if (success) {
      // Actual logout
      dispatch(logout());

      // Go to login page
      navigate("/login");
    }
  };

  return (
    <div className="my-10 flex flex-row gap-x-5 rounded-md border border-pink-700 bg-pink-900 p-8 px-12">
      {/* Delete Icon */}
      <div className="flex aspect-square h-14 w-14 items-center justify-center rounded-full bg-pink-700">
        <FiTrash2 className="text-3xl text-pink-200" />
      </div>

      {/* Content */}
      <div className="flex flex-col space-y-2">
        <h2 className="text-lg font-semibold text-richblack-5">
          Delete Account
        </h2>

        <div className="w-3/5 text-pink-25">
          <p>Would you like to delete your account?</p>

          <p>
            Your account will be permanently deleted after 3 days. You can
            cancel the deletion during this period.
          </p>
        </div>

        <button
          type="button"
          onClick={handleDeleteAccount}
          className="w-fit cursor-pointer italic text-pink-300 hover:text-pink-200"
        >
          I want to delete my account.
        </button>
      </div>
    </div>
  );
};

export default DeleteAccount;