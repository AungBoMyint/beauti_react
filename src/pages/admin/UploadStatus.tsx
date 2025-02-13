import { Button } from "@/components/ui/button";
import { Field } from "@/components/ui/field";
import { toaster } from "@/components/ui/toaster";
import { useCreateStatus, useUpdateStatus } from "@/hooks/useStatus";
import { Box, Flex, Input, Text } from "@chakra-ui/react";
import { useQueryClient } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { useLocation } from "react-router-dom";
import { v4 } from "uuid";

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
  } = useForm<FormValues>({
    defaultValues: status ?? {},
  });
  const queryClient = useQueryClient();
  const onSuccess = () => {
    toaster.create({
      title: `Status is ${status ? "updated" : "created"}`,
      type: "success",
    });
    queryClient.invalidateQueries({ queryKey: ["status"] });
  };
  const mutation = status
    ? useUpdateStatus(onSuccess)
    : useCreateStatus(onSuccess);
  const onSubmit = handleSubmit((data) => {
    if (isValid) {
      mutation.mutate(
        status
          ? data
          : {
              ...data,
              id: v4(),
              dateTime: new Date().toISOString(),
            }
      );
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
