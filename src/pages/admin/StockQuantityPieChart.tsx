import { Box, Text } from "@chakra-ui/react";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Doughnut } from "react-chartjs-2";
import StockTable from "./StockTable";

ChartJS.register(ArcElement, Tooltip, Legend);

export const data = {
  labels: ["Total Quantity", "Remain Quantity"],
  datasets: [
    {
      label: "# of Votes",
      data: [12, 19],
      backgroundColor: ["rgb(119, 178, 84)", "rgb(251, 165, 24)"],
      borderColor: ["rgb(119, 178, 84)", "rgb(251, 165, 24)"],
      borderWidth: 1,
    },
  ],
};

const StockQuantityPieChart = () => {
  return (
    <Box>
      <Text ml={2} fontWeight={"bold"}>
        Stock Quantity
      </Text>
      <Box width={"60vw"} justifySelf={"center"}>
        <Doughnut data={data} />
      </Box>
      <Text ml={2} mt={2} fontWeight={"bold"}>
        Stock Table
      </Text>
      <StockTable />
    </Box>
  );
};

export default StockQuantityPieChart;
