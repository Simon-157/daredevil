// libraries
import { Navigate, Outlet, useLocation } from "react-router-dom";
import { AppFrame } from "@components/app_frame/AppFrame";
import useAuth from "@hooks/useAuth";
import { LOGIN } from "@utils/routes";

const Protected = () => {
  const {auth} = useAuth()
  const location = useLocation();
  return auth?.user.id ? (
    <AppFrame>
      <Outlet />
    </AppFrame>
  ) : (
    <Navigate to={`/${LOGIN}`} state={{ from: location }} replace />
  );
};

export default Protected;
