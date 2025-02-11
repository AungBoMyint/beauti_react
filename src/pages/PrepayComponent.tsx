import React from "react";
import kbz from "../assets/bank/kbz.png";
import aya from "../assets/bank/ayabank.png";
import cb from "../assets/bank/cbbank.jpg";
import uab from "../assets/bank/uabbank.jpg";
import { Box, Flex, Image, Text } from "@chakra-ui/react";

interface BankProp {
  name: string;
  no: string;
  logo: string;
}
const bankList: BankProp[] = [
  {
    name: "U KAUNG SETT WIN",
    no: "28613728600633901",
    logo: kbz,
  },
  {
    name: "KAUNG SETT WIN",
    no: "0081600500063614",
    logo: cb,
  },
  {
    name: "KAUNG SETT WIN",
    no: "40034198496",
    logo: aya,
  },
  {
    name: "KAUNG SETT WIN",
    no: "035010100004163",
    logo: uab,
  },
];

const PrepayComponent = () => {
  return (
    <Box spaceY={4} mx={4}>
      {bankList.map((bank) => {
        return <BankCard key={bank.name} bank={bank} />;
      })}
    </Box>
  );
};

export default PrepayComponent;

interface Props {
  bank: BankProp;
}
const BankCard = ({ bank }: Props) => {
  return (
    <Flex alignItems={"center"} gap={8}>
      <Image src={bank.logo} width={"120px"} />
      <Flex direction={"column"} gap={1}>
        <Text fontWeight={"bold"}>{bank.name}</Text>
        <Text fontWeight={"bold"}>{bank.no}</Text>
      </Flex>
    </Flex>
  );
};
