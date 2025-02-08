import AppDialog from "@/components/app/AppDialog";
import { DialogActionTrigger, DialogFooter } from "@/components/ui/dialog";
import { Field } from "@/components/ui/field";
import Division from "@/entity/Division";
import { Button, Flex, Input } from "@chakra-ui/react";
import React from "react";
import { useForm } from "react-hook-form";
interface Props {
  item: Division;
}
interface FormValues {
  fee: number;
  name: string;
}
const AddTownship = ({ item }: Props) => {
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
      title="Add Township"
      trigger={
        <Button
          px={2}
          color={"white"}
          bg={"green.500"}
          size={"sm"}
          fontSize={12}
          variant={"solid"}
        >
          Add
        </Button>
      }
    >
      <form onSubmit={onSubmit}>
        <Flex direction={"column"} gap={4}>
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
              {...register("name", { required: "Name is required" })}
            />
          </Field>
          <Field
            label="Fee"
            invalid={!!errors.fee}
            errorText={errors.fee?.message}
          >
            <Input
              border={"solid"}
              focusRing={"none"}
              px={2}
              css={{
                "--error-color": "none",
                "--focus-color": "none",
              }}
              {...register("fee", { required: "Fee is required" })}
            />
          </Field>
          <DialogFooter>
            <DialogActionTrigger asChild>
              <Button variant="outline">Cancel</Button>
            </DialogActionTrigger>
            <Button px={2} bg={"black"} color={"white"} type="submit">
              Save
            </Button>
          </DialogFooter>
        </Flex>
      </form>
    </AppDialog>
  );
};

export default AddTownship;
