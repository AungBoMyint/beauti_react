import AppUser from "@/entity/AppUser";
import authStore from "@/hooks/authStore";
import { useCurrentUser } from "@/hooks/useAuth";
import { useEffect } from "react";
import { Navigate, Outlet, useLocation } from "react-router-dom";

const ProtectedRoute = () => {
  var localUser: AppUser | undefined = JSON.parse(
    localStorage.getItem("user") || "{}"
  );
  const { data } = useCurrentUser(localUser?.id ?? "");
  const location = useLocation();
  const currentUser = authStore.getState().currentUser;
  useEffect(() => {
    const user = data?.data() as AppUser;
    const userClaimed = user?.claimed ?? [];
    const currentClaimed = currentUser?.claimed ?? [];
    authStore.getState().setUser!({
      ...user,
      claimed: [...userClaimed, ...currentClaimed],
    } as AppUser);
  }, [data?.exists()]);
  /*  if (isLoading) {
    return <AccountLoading />;
  } */
  return data?.exists() || localUser?.id ? (
    <Outlet />
  ) : (
    <Navigate to={"/login"} state={{ from: location }} />
  );
};

export default ProtectedRoute;
