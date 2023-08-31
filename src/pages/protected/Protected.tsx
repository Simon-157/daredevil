import { useLocation, Outlet, Navigate } from "react-router-dom";
import { AppFrame } from "../../components/app_frame/AppFrame";
import useAuth from "../../hooks/useAuth";
import { LOGIN } from "../../utils/routes";
import { useQuery } from "react-query"; 
import CustomLoader from "../../components/loader/loader";
import { fetchData } from "../../utils/functions";

const Protected = () => {
  const { auth } = useAuth();
  const location = useLocation();

  // Use the useQuery hook to fetch data with loading state handling
  const { isLoading } = useQuery("fetchData", fetchData);

  if (isLoading) {
    return <div><CustomLoader size={60} /></div>;
  }

  return auth?.user.id ? (
    <AppFrame>
      <Outlet />
    </AppFrame>
  ) : (
    <Navigate to={`/${LOGIN}`} state={{ from: location }} replace />
  );
};

export default Protected;
