import AppDialog from "@/components/app/AppDialog";
import { Field } from "@/components/ui/field";
import { toaster } from "@/components/ui/toaster";
import AppUser from "@/entity/AppUser";
import { managePoint } from "@/hooks/useUsers";
import { Box, Button, Flex, Input, Text } from "@chakra-ui/react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
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
  const queryClient = useQueryClient();
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<FormValues>({
    defaultValues: {
      points: user.points ?? 0,
    },
  });
  const mutation = useMutation({
    mutationFn: async (point: number) => await managePoint(point, user),
    onSuccess: (_) => {
      toaster.create({
        title: "Point updated!",
        type: "success",
      });
      queryClient.invalidateQueries({ queryKey: ["users"] });
    },
    onError: (error) => {
      toaster.create({
        title: `Point update failed: ${error.message}`,
        type: "error",
      });
    },
  });

  const onSubmit = handleSubmit((data) => {
    if (isValid) {
      mutation.mutate(data.points);
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
            loading={mutation.isPending}
            disabled={mutation.isPending}
          >
            Save
          </Button>
        </Flex>
      </form>
    </AppDialog>
  );
};

export default ManagePoint;
