import React, { ChangeEvent, useState } from "react";
import kbz from "../assets/bank/kbz.png";
import aya from "../assets/bank/ayabank.png";
import cb from "../assets/bank/cbbank.jpg";
import uab from "../assets/bank/uabbank.jpg";
import { Box, Button, Flex, Image, Input, Text } from "@chakra-ui/react";
import { toaster } from "@/components/ui/toaster";
import {
  FileUploadList,
  FileUploadRoot,
  FileUploadTrigger,
} from "@/components/ui/file-upload";
import { FaFileImage } from "react-icons/fa";
import "./PrepayComponent.css";
import useCart from "@/hooks/useCart";

interface BankProp {
  name: string;
  no: string;
  logo: string;
  bank: string;
}
const bankList: BankProp[] = [
  {
    name: "U KAUNG SETT WIN",
    no: "28613728600633901",
    logo: kbz,
    bank: "KBZ Bank",
  },
  {
    name: "KAUNG SETT WIN",
    no: "0081600500063614",
    logo: cb,
    bank: "CB Bank",
  },
  {
    name: "KAUNG SETT WIN",
    no: "40034198496",
    logo: aya,
    bank: "AYA Bank",
  },
  {
    name: "KAUNG SETT WIN",
    no: "035010100004163",
    logo: uab,
    bank: "UAB Bank",
  },
];

const PrepayComponent = () => {
  return (
    <Box spaceY={4} mx={4}>
      {bankList.map((bank) => {
        return <BankCard key={bank.no} bank={bank} />;
      })}
      <Flex
        alignItems={"center"}
        justifyItems={"center"}
        justifyContent={"center"}
        width={"full"}
      >
        <FileUploadRoot
          maxFiles={1}
          onFileAccept={(detail) => {
            if (detail.files) {
              useCart.getState().setBankSlip(detail.files[0]);
            }
          }}
          accept={"image/*"}
          width={"fit"}
        >
          <FileUploadTrigger asChild>
            <Button variant="outline" size="sm" border={"solid gray"} px={4}>
              <FaFileImage />
              Upload a paid screenshot
            </Button>
          </FileUploadTrigger>
          <FileUploadList/>
        </FileUploadRoot>
      </Flex>
    </Box>
  );
};

export default PrepayComponent;

interface Props {
  bank: BankProp;
}
const BankCard = ({ bank }: Props) => {
  const handleCopyClick = (bank_no: string) => {
    navigator.clipboard
      .writeText(bank_no)
      .then(() => {
        toaster.create({
          title: `${bank.bank} Account နံပါတ် ${bank_no} ကို Copy ကူးလိုက်ပါပြီ`,
          type: "info",
        });
      })
      .catch((err) => {
        console.error("Error copying text: ", err);
      });
  };
  return (
    <Flex alignItems={"center"} gap={8}>
      <Image src={bank.logo} width={"120px"} />
      <Flex direction={"column"} gap={1}>
        <Text fontWeight={"bold"}>{bank.name}</Text>
        <Text
          cursor={"pointer"}
          onClick={() => handleCopyClick(bank.no)}
          fontWeight={"bold"}
        >
          {bank.no}
        </Text>
      </Flex>
    </Flex>
  );
};
