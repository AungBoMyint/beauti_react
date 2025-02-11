import { Outlet } from "react-router-dom";
import BottomNavBar from "./components/app/BottomNavBar";
import { Box } from "@chakra-ui/react";
import TopNavBar from "./components/app/TopNavBar";
import { useEffect } from "react";
import AppUser from "./entity/AppUser";
import authStore from "./hooks/authStore";
import { Toaster } from "@/components/ui/toaster";

function App() {
  useEffect(() => {
    //we check login or not
    const user: AppUser = JSON.parse(localStorage.getItem("user") || "{}");
    if (user && user.emailAddress) {
      //we set user
      authStore.getState().setUser!(user);
    }
  }, []);
  return (
    <>
      <Toaster />
      <Box bg={{ _dark: "black", base: "#fffbfe" }}>
        <TopNavBar />
        <Box paddingBottom={"100px"} paddingTop={"80px"} paddingX={4}>
          <Outlet />
        </Box>
        <BottomNavBar />
      </Box>
    </>
  );
}

export default App;
