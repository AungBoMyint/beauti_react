import authStore from "@/hooks/authStore";
import { Box, Button, Flex, Image, Text } from "@chakra-ui/react";
import { Card } from "@chakra-ui/react/card";
import { format } from "date-fns";
import circleCalendar from "../../assets/circle_calendar.svg";
import gift from "../../assets/gift.svg";
import { FaGift } from "react-icons/fa";

import {
  DialogBody,
  DialogCloseTrigger,
  DialogContent,
  DialogHeader,
  DialogRoot,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import { checkBirthDay } from "@/utils/fun";
import { useNavigate } from "react-router-dom";

const BirthdayComponent = () => {
  const navigate = useNavigate();
  const currentUser = authStore((state) => state.currentUser);
  return (
    currentUser?.birth_date && (
      <Flex gap={2} direction={"column"}>
        {checkBirthDay(currentUser?.birth_date) ? (
          <Card.Root
            overflow="hidden"
            size={"lg"}
            variant={"elevated"}
            rounded={"lg"}
            padding={2}
          >
            <Card.Body
              padding={2}
              spaceY={2}
              alignSelf={"start"}
              width={"full"}
            >
              <Flex
                direction={"column"}
                alignItems={"center"}
                justifyContent={"center"}
                gap={2}
              >
                <Flex
                  bg={"#FFD7001A"}
                  rounded={"full"}
                  width={20}
                  height={20}
                  justifySelf={"center"}
                  justifyContent={"center"}
                  alignItems={"center"}
                >
                  <FaGift size={28} color="gold" />
                </Flex>
                <Text fontSize={"md"} fontWeight={"bold"}>
                  Your Brthday Month!
                </Text>
                <Button
                  onClick={() => navigate("/claim-gift")}
                  width={"full"}
                  variant={"solid"}
                  bg={"gold"}
                  color={"white"}
                  fontWeight={"bold"}
                >
                  Claim Now
                </Button>
              </Flex>
            </Card.Body>
          </Card.Root>
        ) : (
          <Card.Root
            overflow="hidden"
            size={"lg"}
            variant={"elevated"}
            rounded={"lg"}
            padding={2}
          >
            <Card.Body
              padding={2}
              spaceY={2}
              alignSelf={"start"}
              width={"full"}
            >
              <Flex
                width={"full"}
                direction={"column"}
                alignItems={"start"}
                justifyContent={"start"}
              >
                <Text fontSize={"sm"} fontWeight={"bold"}>
                  Birthday Gift Status
                </Text>
                {currentUser?.birth_date && (
                  <Text fontSize={12}>
                    {format(currentUser?.birth_date, "MMMM d")}
                  </Text>
                )}
                {currentUser?.birth_date && (
                  <Flex width={"full"} justifyContent={"center"}>
                    <Button
                      px={4}
                      fontSize={12}
                      size={"sm"}
                      mt={2}
                      bg={{ base: "gray.100", _dark: "gray.800" }}
                    >
                      You can claim your gift in{" "}
                      {format(currentUser?.birth_date, "MMMM")}
                    </Button>
                  </Flex>
                )}
                <Flex width={"full"} justifyContent={"center"}>
                  <DialogRoot
                    size="sm"
                    placement="center"
                    motionPreset="slide-in-bottom"
                  >
                    <DialogTrigger asChild>
                      <Button
                        px={4}
                        fontSize={12}
                        mt={2}
                        size={"sm"}
                        color={"white"}
                        rounded={"lg"}
                        bg={{ base: "black", _dark: "gray.800" }}
                      >
                        Claim Birthday Gift
                      </Button>
                    </DialogTrigger>
                    <DialogContent>
                      <DialogBody>
                        <DialogCloseTrigger />
                        <Flex
                          direction={"column"}
                          alignItems={"center"}
                          justifyContent={"center"}
                          gap={2}
                        >
                          <Image src={circleCalendar} />
                          <Text fontSize={"md"} fontWeight={"bold"}>
                            Coming Soon!
                          </Text>
                          <Text>
                            You can claim your gift in{" "}
                            <span style={{ fontWeight: "bold" }}>
                              {format(currentUser?.birth_date, "MMMM")}
                            </span>
                          </Text>
                        </Flex>
                      </DialogBody>
                    </DialogContent>
                  </DialogRoot>
                </Flex>
              </Flex>
            </Card.Body>
          </Card.Root>
        )}
        <Card.Root
          overflow="hidden"
          size={"lg"}
          variant={"elevated"}
          rounded={"lg"}
          padding={2}
        >
          <Card.Body padding={2} spaceY={2} alignSelf={"start"} width={"full"}>
            <Flex
              width={"full"}
              direction={"column"}
              alignItems={"start"}
              justifyContent={"start"}
              gap={2}
            >
              <Text fontSize={"sm"} fontWeight={"bold"}>
                Gift Rules
              </Text>
              <Flex ml={4} gap={2} direction={"column"}>
                <Text fontSize={"sm"} color={"gray.600"}>
                  Gift can only be claimed during your birthday month
                </Text>
                <Text fontSize={"sm"} color={"gray.600"}>
                  One gift per year
                </Text>
                <Text fontSize={"sm"} color={"gray.600"}>
                  Must be claimed within the birthday month
                </Text>
              </Flex>
            </Flex>
          </Card.Body>
        </Card.Root>
      </Flex>
    )
  );
};

export default BirthdayComponent;
