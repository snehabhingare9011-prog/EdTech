import {setLoading, setToken} from "../../redux/slices/authSlice";
import {toast} from "react-hot-toast"
import { apiConnector } from "../apiConnector";
import { endpoints } from "../apis";
import { setUser } from "../../redux/slices/profileSlice";

const {LOGIN_API} =endpoints;

export function login(email,password,navigate){
    console.log("inside the login",email,password)

    return async (dispatch)=>{
        const toastId = toast.loading("Loading...");
        dispatch(setLoading(true));
        try{
            
            const response=await apiConnector("POST",LOGIN_API,{
                email,password
            });

            // login successfull think about what to do after login 
            // 1) save token and user in react redux state
            // 2) save in local storage also token and user 
            // 3) return true

            console.log("response",response);

            if (!response.data.success) {
                throw new Error(response?.data?.message);
            }

            dispatch(setToken(response?.data?.token));
            localStorage.setItem("token",response?.data?.token);

            dispatch(setUser(response?.data?.user));
            localStorage.setItem("user",JSON.stringify(response?.data?.user));
            

            return true;

        } catch(error){

            console.log("LOGIN API ERROR....", error);
            return error?.response?.data?.message || "Could Not Login";

        } finally {
            toast.dismiss(toastId);
            dispatch(setLoading(false));
        }


    }

}


export function logout(){
    return async(dispatch)=>{

        dispatch(setUser(null));
        dispatch(setToken(null));
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        toast.success("Logged Out");
        
    }
}