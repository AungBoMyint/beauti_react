import AppDialog from "@/components/app/AppDialog";
import { Field } from "@/components/ui/field";
import AppUser from "@/entity/AppUser";
import { Box, Button, Flex, Input, Text } from "@chakra-ui/react";
import { ReactNode } from "react";
import { useForm } from "react-hook-form";
import { RiEditBoxLine } from "react-icons/ri";

interface Props {
  user: AppUser;
  trigger: ReactNode;
}
interface FormValues {
  points: number;
}
const ManagePoint = ({ user, trigger }: Props) => {
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<FormValues>({
    defaultValues: {
      points: user.points ?? 0,
    },
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
      title="Manage Points"
      trigger={
        trigger
        /*   <Box
          direction={"column"}
          alignContent={"center"}
          justifyItems={"center"}
          bg={"green.500"}
          mb={3}
          cursor={"pointer"}
          width={"full"}
        >
          <RiEditBoxLine color="white" size={30} />
          <Text fontWeight={"bold"} color={"white"} fontSize={"xs"}>
            Edit
          </Text>
        </Box>
       */
      }
    >
      <form onSubmit={onSubmit}>
        <Field
          label="Points"
          invalid={!!errors.points}
          errorText={errors.points?.message}
        >
          <Input
            border={"solid"}
            focusRing={"none"}
            defaultValue={user.points}
            px={2}
            css={{
              "--error-color": "none",
              "--focus-color": "none",
            }}
            {...register("points", { required: "Points is required" })}
          />
        </Field>
        <Flex justifyContent={"end"}>
          <Button
            bg={{ base: "black", _dark: "gray.800" }}
            variant={"solid"}
            color={"white"}
            px={2}
            mt={2}
            type="submit"
          >
            Save
          </Button>
        </Flex>
      </form>
    </AppDialog>
  );
};

export default ManagePoint;
