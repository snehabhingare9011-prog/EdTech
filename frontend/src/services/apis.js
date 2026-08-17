
const BASE_URL=import.meta.env.VITE_BASE_URL;

// AUTH ENDPOINTS
export const endpoints = {
  SENDOTP_API: BASE_URL + "/auth/sendOTP",
  SIGNUP_API: BASE_URL + "/auth/signup",
  LOGIN_API: BASE_URL + "/auth/login",
  RESETPASSTOKEN_API: BASE_URL + "/profile/resetPasswordToken",
  RESETPASSWORD_API: BASE_URL + "/profile/resetPassword",
}

// CATAGORIES API
export const categories={
    CATEGORIES_API:BASE_URL+'/course/showallCategories'

}
