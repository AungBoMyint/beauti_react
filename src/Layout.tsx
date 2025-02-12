import { Outlet } from "react-router-dom";
import BottomNavBar from "./components/app/BottomNavBar";
import { Box } from "@chakra-ui/react";
import TopNavBar from "./components/app/TopNavBar";
import { useEffect } from "react";
import { Toaster } from "@/components/ui/toaster";
import utilMethod from "./utils/util";

function App() {
  useEffect(() => {
    //we check login or not
    utilMethod();
  }, []);
  return (
    <>
      <Toaster />
      <Box bg={{ _dark: "black", base: "gray.50" }}>
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
