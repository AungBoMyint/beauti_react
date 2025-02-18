import authStore from "@/hooks/authStore";
import { checkBirthDay } from "@/utils/fun";
import { Text } from "@chakra-ui/react";
import { Navigate, Outlet, useLocation } from "react-router-dom";
const BirthdayProtectedRoute = () => {
  const user = authStore((state) => state.currentUser);
  const location = useLocation();
  return !user ? (
    <Navigate to={"/login"} state={{ from: location }} />
  ) : !checkBirthDay(user?.birth_date) ? (
    <Text bg={"red"} color={"white"} fontWeight={"bold"} px={4}>
      You can't access for now.
    </Text>
  ) : (
    <Outlet />
  );
};
export default BirthdayProtectedRoute;
