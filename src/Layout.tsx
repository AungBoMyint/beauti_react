import { Outlet } from "react-router-dom";
import BottomNavBar from "./components/app/BottomNavBar";
import { Box } from "@chakra-ui/react";
import TopNavBar from "./components/app/TopNavBar";

function App() {
  return (
    <Box bg={{_dark:'black',base:'#fffbfe'}}>
      <TopNavBar />
      <Box paddingBottom={'100px'} paddingTop={'80px'} paddingX={4}>
        <Outlet />
      </Box>
      <BottomNavBar />
    </Box>
  );
}

export default App;
