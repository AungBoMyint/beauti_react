import { Button } from "@/components/ui/button";
import { Field } from "@/components/ui/field";
import { Box, Flex, Input, Text } from "@chakra-ui/react";
import React from "react";
import { useForm } from "react-hook-form";
import { useLocation } from "react-router-dom";

interface FormValues {
  dateTime: string;
  id: string;
  name: string;
}
const UploadStatus = () => {
  const location = useLocation();
  const status = location.state?.status;
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
    setValue,
  } = useForm<FormValues>({
    defaultValues: status ?? {},
  });

  const onSubmit = handleSubmit((data) => {
    if (isValid) {
      console.log(data);
    } else {
      console.log(`🔥🔥🔥Not Valid`);
    }
  });
  return (
    <form onSubmit={onSubmit}>
      <Flex
        zIndex={"2000"}
        bg={"white"}
        width={"full"}
        position={"fixed"}
        justifyContent={"space-between"}
        alignItems={"center"}
        shadow={"lg"}
        px={4}
        py={2}
        fontWeight={"bold"}
        bgColor={{ base: "white", _dark: "gray.800" }}
      >
        <Text>Upload Status</Text>

        <Button
          type="submit"
          variant={"solid"}
          size={"sm"}
          px={2}
          fontSize={"sm"}
          bg={{ base: "black", _dark: "black" }}
          color={"white"}
        >
          Save
        </Button>
      </Flex>
      <Box height={"56px"}></Box>
      <Flex direction={"column"} p={2} gap={4}>
        <Field
          label="Name"
          invalid={!!errors.name}
          errorText={errors.name?.message}
        >
          <Input
            border={"solid"}
            focusRing={"none"}
            px={2}
            css={{
              "--error-color": "none",
              "--focus-color": "none",
            }}
            {...register("name", {
              required: "Name is required",
            })}
          />
        </Field>
      </Flex>
    </form>
  );
};

export default UploadStatus;
