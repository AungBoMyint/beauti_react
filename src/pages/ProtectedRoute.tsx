import AppUser from "@/entity/AppUser";
import authStore from "@/hooks/authStore";
import { Navigate, Outlet, useLocation } from "react-router-dom";

const ProtectedRoute = () => {
  const localUser: AppUser = JSON.parse(localStorage.getItem("user") || "{}");
  const remoteUser = authStore((state) => state.currentUser);
  const user = remoteUser ?? localUser;
  const location = useLocation();
  return user ? (
    <Outlet />
  ) : (
    <Navigate to={"/login"} state={{ from: location }} />
  );
};

export default ProtectedRoute;
