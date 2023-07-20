import { useState, useEffect } from "react";
import { PATHS, PUBLIC_PATHS } from "../lib/constants";
import { useNavigate, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "../store";

const useRedirect = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const { userInfo } = useSelector((state: RootState) => state.auth);
  const [isLoading, setIsLoading] = useState(true);

  // If the authentication check is an asynchronous operation (i.e. Firebase or other), this might result in a flickering loading state. If that's the case, I must adjust the logic to account for async operations.

  useEffect(() => {
    if (!userInfo && !PUBLIC_PATHS.includes(location.pathname)) {
      navigate(PATHS.login);
    }

    if (userInfo && PUBLIC_PATHS.includes(location.pathname)) {
      navigate(PATHS.home);
    }

    setIsLoading(false);
  }, [userInfo, location, navigate]);

  return isLoading;
};

export default useRedirect;
