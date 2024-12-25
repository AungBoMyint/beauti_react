import { Box, Card, Text, Image, Flex, Input, Button } from "@chakra-ui/react";
import { useEffect, useRef, useState } from "react";
import { CiCircleMinus } from "react-icons/ci";
import { CiCirclePlus } from "react-icons/ci";

const Cart = () => {
  const bottomActionRef = useRef<HTMLDivElement>();
  const [bottomActionHeight, setBottomActionHeight] = useState(0);
  useEffect(() => {
    if (bottomActionRef.current) {
      setBottomActionHeight(bottomActionRef.current.offsetHeight + 100);
    }
  }, []);
  return (
    <Box position={"relative"} lg={{ display: "flex", gap: 4 }}>
      <Box spaceY={2} paddingBottom={bottomActionHeight}>
        {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14].map((item) => {
          return (
            <Card.Root
              key={item}
              overflow="hidden"
              size={"lg"}
              variant={"elevated"}
              rounded={"lg"}
              padding={2}
            >
              <Flex>
                <Image
                  className="pointer-events-none h-full w-[30%] self-center"
                  src="https://images.unsplash.com/photo-1555041469-a586c61ea9bc?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80"
                  alt="Green double couch with wooden legs"
                />
                <Card.Body padding={2}>
                  <Card.Title
                    padding={0}
                    margin={0}
                    fontSize={"lg"}
                    fontWeight={"medium"}
                  >
                    Living room Sofa bold a;s slkdf a;lsdfl
                  </Card.Title>
                  <Text
                    textStyle="sm"
                    fontWeight="medium"
                    letterSpacing="tight"
                  >
                    50ml
                  </Text>
                  <Text
                    textStyle="sm"
                    fontWeight="medium"
                    letterSpacing="tight"
                  >
                    $450
                  </Text>
                </Card.Body>
                <Flex alignItems={"center"} gap={4}>
                  <CiCircleMinus size={22} />
                  <Text>1</Text>
                  <CiCirclePlus size={22} />
                </Flex>
              </Flex>
            </Card.Root>
          );
        })}
      </Box>
      <Box
        ref={bottomActionRef}
        rounded={"lg"}
        padding={4}
        marginBottom={{ sm: "63px", lg: "0px" }}
        width={"96%"}
        position={{ sm: "fixed", lg: "sticky" }}
        bottom={0}
        left={0}
        right={0}
        marginX={"auto"}
        bgColor={"white"}
        shadow={"2xl"}
      >
        <Input
          placeholder="Enter your email"
          border={"solid"}
          paddingLeft={2}
        />
        <table className="w-full border-separate border-spacing-y-4">
          <tbody>
            <tr>
              <td className="text-left px-2">ကုန်ပစည်းကျသင့်ငွေ</td>
              <td className="text-right px-2">2000Ks</td>
            </tr>
            <tr>
              <td className="text-left px-2">မြို့နယ်</td>
              <td className="text-right px-2">2000Ks</td>
            </tr>
            <tr className=" text-white">
              <td className="text-left p-2 bg-black rounded-tl-lg rounded-bl-lg">
                စုစုပေါင်းကျသင့်ငွေ =
              </td>
              <td className="text-right p-2 bg-black rounded-tr-lg rounded-br-lg">
                2000Ks
              </td>
            </tr>
          </tbody>
        </table>
        <Button
          variant={"solid"}
          backgroundColor={"black"}
          width={"full"}
          color={"white"}
          rounded={"lg"}
        >
          Order တင်ရန် နှိပ်ပါ
        </Button>
      </Box>
    </Box>
  );
};

export default Cart;
