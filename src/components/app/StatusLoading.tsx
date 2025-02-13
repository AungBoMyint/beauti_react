import { Box, Skeleton } from "@chakra-ui/react";
import ViewAllLabel from "./ViewAllLabel";
import ScrollX from "./ScrollX";
import { mockItems } from "@/utils/constant";

const StatusLoading = () => {
  return (
    <Box spaceY={2}>
      <Skeleton>
        <ViewAllLabel label={status} action="Show More" to={""} />
      </Skeleton>
      <ScrollX>
        {mockItems?.map((item) => (
          <Skeleton key={item} width={220} height={400}></Skeleton>
        ))}
      </ScrollX>
    </Box>
  );
};

export default StatusLoading;
