import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-hot-toast";
import { updateDisplayPicture } from "../../../../services/operations/settingAPI";
import { FiUpload } from "react-icons/fi"

const ChangeProfilePicture = () => {

  const { user } = useSelector((state) => state.profile);
  const { token } = useSelector((state) => state.auth);

  const [selectedFile, setSelectedFile] = useState(null);
  const [loading, setLoading] = useState(false);

  const dispatch = useDispatch();

  const handleFileChange = (event) => {
    const file = event.target.files[0];

    if (!file) {
      return;
    }

    setSelectedFile(file);
  };

  const handleUpload = async () => {

    if (!selectedFile) {
      toast.error("Please select an image");
      return;
      
    }

    setLoading(true);

    const result = await dispatch(
      updateDisplayPicture(token, selectedFile)
    );

    setLoading(false);

    if (result) {
      setSelectedFile(null);
    }
    
  };

  return (
    <div className="flex w-full items-center justify-between rounded-md border border-richblack-700 bg-richblack-800 px-12 py-8 text-richblack-5">

      <div className="flex items-center gap-x-4">

        {/* Profile Image */}
        <div>
          <img
            src={user?.image}
            alt="Profile"
            className="aspect-square w-[78px] rounded-full object-cover"
          />
        </div>

        <div className="space-y-2">

          <p className="text-richblack-5">
            Change Profile Picture
          </p>

          <div className="flex flex-row gap-3">

            {/* Select File */}
            <label
              htmlFor="profilePicture"
              className={`cursor-pointer rounded-md bg-richblack-700 px-5 py-2 font-semibold text-richblack-50 ${
                loading
                  ? "pointer-events-none opacity-50"
                  : ""
              }`}
            >
              Select
            </label>

            <input
              id="profilePicture"
              type="file"
              accept="image/*"
              className="hidden"
              onChange={handleFileChange}
              disabled={loading}
            />

            {/* Upload */}
           <button
            type="button"
            onClick={handleUpload}
            disabled={loading}
            className="flex items-center gap-2 rounded-md bg-yellow-50 px-5 py-2 font-semibold text-richblack-900"
            >
            {!loading && <FiUpload className="text-lg" />}
            {loading ? "Uploading..." : "Upload"}
            </button>

          </div>

          {selectedFile && (
            <p className="max-w-[250px] truncate text-xs text-richblack-300">
              {selectedFile.name}
            </p>
          )}

        </div>

      </div>

    </div>
  );
};

export default ChangeProfilePicture;