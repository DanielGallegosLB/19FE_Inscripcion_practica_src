import { useLocation, Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";

const RequireAuth = () => {
  const { auth } = useAuth();
  const location = useLocation();
  

  return (
    auth?.user
        ? <Outlet />
        : <Navigate to="/iniciar-sesion" state={{ from: location }} replace />
  );
};

export { RequireAuth };