import { Button } from "@/components/ui/button";
import { Field } from "@/components/ui/field";
import { Box, Flex, Input, Text } from "@chakra-ui/react";
import React from "react";
import { useForm } from "react-hook-form";
import { useLocation } from "react-router-dom";

interface FormValues {
  dateTime: string;
  description: string;
  id: string;
  image: string;
}
const UploadAdvertisement = () => {
  const location = useLocation();
  const advertisement = location.state?.advertisement;
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
    setValue,
  } = useForm<FormValues>({
    defaultValues: advertisement ?? {},
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
        <Text>Upload Advertisement</Text>

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
          label="Image"
          invalid={!!errors.image}
          errorText={errors.image?.message}
        >
          <Input
            border={"solid"}
            focusRing={"none"}
            px={2}
            css={{
              "--error-color": "none",
              "--focus-color": "none",
            }}
            {...register("image", { required: "Image is required" })}
          />
        </Field>
        <Field
          label="Description"
          invalid={!!errors.description}
          errorText={errors.description?.message}
        >
          <Input
            border={"solid"}
            focusRing={"none"}
            px={2}
            css={{
              "--error-color": "none",
              "--focus-color": "none",
            }}
            {...register("description", {
              required: "Description is required",
            })}
          />
        </Field>
      </Flex>
    </form>
  );
};

export default UploadAdvertisement;
