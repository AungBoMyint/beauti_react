import authStore from "@/hooks/authStore";
import { Text } from "@chakra-ui/react";
import { Outlet } from "react-router-dom";

const UserProtectedRoute = () => {
  const user = authStore((state) => state.currentUser);
  return user ? <Outlet /> : <Text>You are not allowed!</Text>;
};

export default UserProtectedRoute;
