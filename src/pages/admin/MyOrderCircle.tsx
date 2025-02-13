import { usePurchaseCount } from "@/hooks/usePurchases";
import { Circle, ProgressCircle } from "@chakra-ui/react";

const MyOrderCircle = () => {
  const { isLoading, data } = usePurchaseCount();
  return (
    <Circle
      fontSize={10}
      fontWeight={"bold"}
      size="8"
      bg="black"
      color="white"
      
    >
      {isLoading ? (
        <ProgressCircle.Root value={null} size="sm">
          <ProgressCircle.Circle>
            <ProgressCircle.Track />
            <ProgressCircle.Range />
          </ProgressCircle.Circle>
        </ProgressCircle.Root>
      ) : (
        data
      )}
    </Circle>
  );
};

export default MyOrderCircle;
