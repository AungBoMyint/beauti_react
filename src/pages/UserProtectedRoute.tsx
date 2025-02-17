import { Toaster } from "@/components/ui/toaster";
import authStore from "@/hooks/authStore";
import { Text } from "@chakra-ui/react";
import { Outlet } from "react-router-dom";

const UserProtectedRoute = () => {
  const user = authStore((state) => state.currentUser);
  return (
    <>
      <Toaster />
      {user ? (
        <Outlet />
      ) : (
        <Text bg={"red"} color={"white"} px={4} fontWeight={"bold"}>
          Login to access!
        </Text>
      )}
    </>
  );
};

export default UserProtectedRoute;
