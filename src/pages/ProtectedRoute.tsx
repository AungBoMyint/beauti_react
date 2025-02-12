import AppUser from "@/entity/AppUser";
import authStore from "@/hooks/authStore";
import { useCurrentUser } from "@/hooks/useAuth";
import { Text } from "@chakra-ui/react";
import { useEffect } from "react";
import { Navigate, Outlet, useLocation } from "react-router-dom";

const ProtectedRoute = () => {
  var localUser: AppUser | undefined = JSON.parse(
    localStorage.getItem("user") || "{}"
  );
  const { isLoading, data } = useCurrentUser(localUser?.id ?? "");
  const location = useLocation();
  useEffect(() => {
    authStore.getState().setUser!(data?.data() as AppUser);
  }, [data?.exists()]);
  if (isLoading) {
    return <Text>Loading....</Text>;
  }
  return data?.exists() ? (
    <Outlet />
  ) : (
    <Navigate to={"/login"} state={{ from: location }} />
  );
};

export default ProtectedRoute;
