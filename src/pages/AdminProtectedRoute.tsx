import { Text } from "@chakra-ui/react";
import { Outlet } from "react-router-dom";

const AdminProtectedRoute = () => {
  const isAdmin = true;
  return isAdmin ? <Outlet /> : <Text>You are not allowed!</Text>;
};

export default AdminProtectedRoute;
