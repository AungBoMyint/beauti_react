import AppDialog from "@/components/app/AppDialog";
import { Field } from "@/components/ui/field";
import { Box, Button, Flex, Input } from "@chakra-ui/react";
import { useForm } from "react-hook-form";
import { IoMdAdd } from "react-icons/io";

interface FormValues {
  title: string;
  body: string;
}

const AddNotification = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<FormValues>({
    defaultValues: {},
  });

  const onSubmit = handleSubmit((data) => {
    if (isValid) {
      console.log(data);
    } else {
      console.log(`🔥🔥🔥Not Valid`);
    }
  });
  return (
    <AppDialog
      title="Push New Notification"
      trigger={
        <Box
          zIndex={"2000"}
          position={"fixed"}
          bottom={4}
          right={4}
          justifyContent={"space-between"}
          alignItems={"center"}
          shadow={"xl"}
          rounded={"full"}
          bgColor={"black"}
          p={2}
          cursor={"pointer"}
        >
          <IoMdAdd color="white" size={26} />
        </Box>
      }
    >
      <form onSubmit={onSubmit}>
        <Box spaceY={4}>
          <Field
            label="Title"
            invalid={!!errors.title}
            errorText={errors.title?.message}
          >
            <Input
              border={"solid"}
              focusRing={"none"}
              px={2}
              css={{
                "--error-color": "none",
                "--focus-color": "none",
              }}
              {...register("title", { required: "Title is required" })}
            />
          </Field>
          <Field
            label="Body"
            invalid={!!errors.body}
            errorText={errors.body?.message}
          >
            <Input
              border={"solid"}
              focusRing={"none"}
              px={2}
              css={{
                "--error-color": "none",
                "--focus-color": "none",
              }}
              {...register("body", { required: "Body is required" })}
            />
          </Field>
          <Flex justifySelf={"end"}>
            <Button
              type="submit"
              color={"white"}
              px={4}
              bg={{ base: "black", _dark: "gray.800" }}
            >
              Push
            </Button>
          </Flex>
        </Box>
      </form>
    </AppDialog>
  );
};

export default AddNotification;
