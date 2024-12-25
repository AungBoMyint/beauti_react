import { Outlet } from "react-router-dom";
import BottomNavBar from "./components/app/BottomNavBar";
import { Box } from "@chakra-ui/react";
import TopNavBar from "./components/app/TopNavBar";

function App() {
  return (
    <>
      <TopNavBar />
      <Box marginBottom={20} marginTop={16} paddingX={2}>
        <Outlet />
      </Box>
      <BottomNavBar />
    </>
  );
}

export default App;
