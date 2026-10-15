
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import { logout } from "../../services/operations/authAPI";

const AuthInitializer = () => {
  const token = useSelector((state) => state.auth.token);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (!token) return;

    let timer;

    try {
      const { exp } = jwtDecode(token);
      console.log("exp",exp);

      if (!exp) {
        dispatch(logout());
        navigate("/login", { replace: true });
        return;
      }

      const remainingTime = exp * 1000 - Date.now();

      console.log("remaning time",remainingTime)

      if (remainingTime <= 0) {
        dispatch(logout());
        navigate("/login", { replace: true });
        return;
      }

      timer = setTimeout(() => {
        dispatch(logout());
        navigate("/login", { replace: true });
      }, remainingTime);

    } catch (error) {
      dispatch(logout());
      navigate("/login", { replace: true });
    }

    return () => clearTimeout(timer);
  }, [token, dispatch, navigate]);

  return null;
};

export default AuthInitializer;
