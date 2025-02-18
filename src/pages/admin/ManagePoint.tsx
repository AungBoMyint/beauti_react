import AppDialog from "@/components/app/AppDialog";
import { Field } from "@/components/ui/field";
import { InputGroup } from "@/components/ui/input-group";
import {
  PopoverBody,
  PopoverContent,
  PopoverRoot,
  PopoverTrigger,
} from "@/components/ui/popover";
import { toaster } from "@/components/ui/toaster";
import AppUser from "@/entity/AppUser";
import { db } from "@/firebaseConfig";
import { Button, Flex, Input } from "@chakra-ui/react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { format } from "date-fns/format";
import { doc, updateDoc } from "firebase/firestore";
import { ReactNode, useState } from "react";
import Calendar from "react-calendar/dist/esm/Calendar.js";
import { useForm } from "react-hook-form";
import { FaCalendarAlt } from "react-icons/fa";

interface Props {
  user: AppUser;
  trigger: ReactNode;
}
interface FormValues {
  points: number;
  expire_date?: string | undefined | null;
}
const ManagePoint = ({ user, trigger }: Props) => {
  const queryClient = useQueryClient();
  const [date, setDate] = useState<Date | undefined>();
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<FormValues>({
    defaultValues: {
      points: user.points ?? 0,
      expire_date: user.expire_date,
    },
  });
  const mutation = useMutation({
    mutationFn: async ({ points, expire_date }: FormValues) => {
      var docRef = doc(db, "adminUserCollection", user?.id ?? "");
      return await updateDoc(docRef, {
        points: points,
        expire_date: expire_date,
      });
    },
    onSuccess: (_) => {
      toaster.create({
        title: "User updated!",
        type: "success",
      });
      queryClient.invalidateQueries({ queryKey: ["users"] });
    },
    onError: (error) => {
      toaster.create({
        title: `User update failed: ${error.message}`,
        type: "error",
      });
    },
  });

  const onSubmit = handleSubmit((data) => {
    if (isValid) {
      mutation.mutate({
        points: data.points,
        expire_date: date?.toISOString() ?? null,
      });
    }
  });
  return (
    <AppDialog
      title="Manage User"
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
        <Field
          mt={2}
          label="Expire Date"
          invalid={!!errors.expire_date}
          errorText={errors.expire_date?.message}
        >
          <InputGroup width={"full"} endElement={<FaCalendarAlt />}>
            <PopoverRoot positioning={{ placement: "bottom-end" }}>
              <PopoverTrigger asChild>
                <Input
                  border={"solid"}
                  paddingLeft={2}
                  rounded={"lg"}
                  value={date ? format(date, "d/MM/y") : ""}
                  placeholder="Select your birthday"
                  readOnly
                  _focus={{
                    border: "1px solid",
                    borderColor: "blue.500",
                  }}
                  _invalid={{
                    border: "1px solid",
                    borderColor: "red.500",
                  }}
                  /* {...register("expire_date", {
                    required: "Birthday is required",
                  })} */
                />
              </PopoverTrigger>
              <PopoverContent>
                {/*  <PopoverArrow /> */}
                <PopoverBody p={4}>
                  <Calendar
                    onChange={(value) => {
                      setDate(new Date(`${value}`));
                    }}
                    value={date}
                  />
                </PopoverBody>
              </PopoverContent>
            </PopoverRoot>
          </InputGroup>
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
