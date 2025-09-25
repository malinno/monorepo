import { useNavigate, useLocation } from "react-router-dom";
import { useCallback } from "react";

export const useNavigation = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const goTo = useCallback(
    (path: string, options?: { replace?: boolean; state?: any }) => {
      navigate(path, options);
    },
    [navigate]
  );

  const goBack = useCallback(() => {
    navigate(-1);
  }, [navigate]);

  const goForward = useCallback(() => {
    navigate(1);
  }, [navigate]);

  const replace = useCallback(
    (path: string, state?: any) => {
      navigate(path, { replace: true, state });
    },
    [navigate]
  );

  const isCurrentPath = useCallback(
    (path: string) => {
      return location.pathname === path;
    },
    [location.pathname]
  );

  const getCurrentPath = useCallback(() => {
    return location.pathname;
  }, [location.pathname]);

  const getLocationState = useCallback(() => {
    return location.state;
  }, [location.state]);

  return {
    goTo,
    goBack,
    goForward,
    replace,
    isCurrentPath,
    getCurrentPath,
    getLocationState,
    location,
  };
};

export default useNavigation;
