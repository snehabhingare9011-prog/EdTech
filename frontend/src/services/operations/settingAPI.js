
import { apiConnector } from "../apiConnector";
import { settingsEndpoints } from "../apis";
import {toast} from "react-hot-toast"
import { setUser } from "../../redux/slices/profileSlice";

const {
  UPDATE_DISPLAY_PICTURE_API,
  UPDATE_PROFILE_API,
  CHANGE_PASSWORD_API,
  DELETE_PROFILE_API,
} = settingsEndpoints;

export function updateDisplayPicture(token, selectedFile) {

  return async (dispatch) => {

    const toastId = toast.loading("Uploading...");

    try {

      const formData = new FormData();

      formData.append("displayPicture", selectedFile);

      const response = await apiConnector(
        "PUT",
        UPDATE_DISPLAY_PICTURE_API,
        formData,
        {
          Authorization: `Bearer ${token}`,
        }
        
      );

      console.log(
        "UPDATE_DISPLAY_PICTURE_API RESPONSE:",
        response
      );

      if (!response?.data?.success) {
        throw new Error(
          response?.data?.message ||
          "Could Not Update Display Picture"
        );
      }

      dispatch(setUser(response.data.data));
      
      localStorage.setItem("user",JSON.stringify(response.data.data));

      toast.success("Display Picture Updated Successfully");

      return true;

    } catch (error) {

      console.log(
        "UPDATE_DISPLAY_PICTURE_API ERROR:",
        error
      );

      toast.error(
        error?.response?.data?.message ||
        error?.message ||
        "Could Not Update Display Picture"
      );

      return false;

    } finally {

      toast.dismiss(toastId);

    }
  };
}


export function  updateProfile(token,data){
    console.log("token",token);
    return async (dispatch)=>{

       const toastId=toast.loading("Loading..........")

       try{

        const response=await apiConnector("PUT",UPDATE_PROFILE_API,data,
            { Authorization:`Bearer ${token}`} );

        console.log("UPDATE_PROFILE_API API RESPONSE............", response)

        if (!response.data.success) {
          throw new Error(response.data.message)
        }

        dispatch(setUser(response.data.user));

        localStorage.setItem("user",JSON.stringify(response.data.user));
        toast.success("Profile Updated Successfully")

      }catch(error){
        toast.error( error?.response?.data?.message || error?.message || "Could Not Update Profile" );
        console.log("UPDATE_PROFILE_API API ERROR............", error)
      }
      
      toast.dismiss(toastId)
  }
}
