import { Toaster } from "@/components/ui/toaster";
import authStore from "@/hooks/authStore";
import { Text } from "@chakra-ui/react";
import { Outlet } from "react-router-dom";

const AdminProtectedRoute = () => {
  const user = authStore((state) => state.currentUser);
  const isAdmin = user?.status ?? 0 > 0;
  return (
    <>
      <Toaster />
      {isAdmin ? <Outlet /> : <Text>You are not allowed!</Text>}
    </>
  );
};

export default AdminProtectedRoute;
