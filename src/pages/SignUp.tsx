import { Button, Flex, Image, Input, Stack, Text } from "@chakra-ui/react";
import { Field } from "@/components/ui/field";
import { useForm } from "react-hook-form";
import { PasswordInput } from "@/components/ui/password-input";
import logo from "../assets/logo.png";
import { Link } from "react-router-dom";
import { useRegister } from "@/hooks/useAuth";
import { toaster } from "@/components/ui/toaster";
import { useState } from "react";
import {
  PopoverBody,
  PopoverContent,
  PopoverRoot,
  PopoverTrigger,
} from "@/components/ui/popover";
import Calendar from "react-calendar/dist/esm/Calendar.js";
import { InputGroup } from "@/components/ui/input-group";
import { format } from "date-fns";
import { FaCalendarAlt } from "react-icons/fa";

interface FormValues {
  email: string;
  password: string;
  birth_day: string;
  confirmPassword: string;
}

const SignUp = () => {
  const [open, setOpen] = useState(false);
  const [date, setDate] = useState(new Date());
  const mutation = useRegister();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>();

  const onSubmit = handleSubmit((data) => {
    if (data.password !== data.confirmPassword) {
      toaster.create({
        title: "Password not matched!",
        type: "error",
      });
      return;
    }
    mutation.mutate({
      emailAddress: data.email,
      id: "",
      image: "",
      points: 0,
      status: 0,
      userName: "",
      password: data.password,
      birth_date: date.toISOString(),
      claimed: [],
    });
  });

  return (
    <form onSubmit={onSubmit}>
      <Stack gap="4" align="flex-start" maxW="lg">
        <Flex justifyContent={"center"} alignItems={"center"} width={"full"}>
          <Image src={logo} width={100} height={100} />
        </Flex>
        <Field
          label="Email"
          invalid={!!errors.email}
          errorText={errors.email?.message}
        >
          <Input
            border={"solid"}
            paddingLeft={2}
            rounded={"lg"}
            _focus={{
              border: "1px solid",
              borderColor: "blue.500",
            }}
            _invalid={{
              border: "1px solid",
              borderColor: "red.500",
            }}
            {...register("email", {
              required: "Email is required",
              pattern: {
                value: /^[^\s@]+@[^\s@]+\.[a-zA-Z]{2,}$/,
                message: "Invalid email format",
              },
            })}
          />
        </Field>
        <Field
          label="Birthday"
          invalid={!!errors.birth_day}
          errorText={errors.birth_day?.message}
        >
          <InputGroup width={"full"} endElement={<FaCalendarAlt />}>
            <PopoverRoot
              open={open}
              onOpenChange={(v) => setOpen(v.open)}
              positioning={{ offset: { crossAxis: 0, mainAxis: 0 } }}
              /* positioning={{ placement: "bottom-end" }} */
            >
              <PopoverTrigger asChild>
                <Input
                  border={"solid"}
                  paddingLeft={2}
                  rounded={"lg"}
                  value={format(date, "d/MM/y")}
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
                  {...register("birth_day", {
                    required: "Birthday is required",
                  })}
                />
              </PopoverTrigger>
              <PopoverContent>
                {/*  <PopoverArrow /> */}
                <PopoverBody p={4}>
                  <Calendar
                    onChange={(value) => {
                      setDate(new Date(`${value}`));
                      setOpen(false);
                    }}
                    value={date}
                  />
                </PopoverBody>
              </PopoverContent>
            </PopoverRoot>
          </InputGroup>
        </Field>
        <Field
          label="Password"
          invalid={!!errors.password}
          errorText={errors.password?.message}
        >
          <PasswordInput
            border={"solid"}
            paddingLeft={2}
            rounded={"lg"}
            {...register("password", { required: "Password is required" })}
          />
        </Field>
        <Field
          label="Confirm Password"
          invalid={!!errors.confirmPassword}
          errorText={errors.confirmPassword?.message}
        >
          <PasswordInput
            border={"solid"}
            paddingLeft={2}
            rounded={"lg"}
            {...register("confirmPassword", {
              required: "Confirm password is required",
            })}
          />
        </Field>
        <Button
          variant={"solid"}
          bg={{ base: "black", _dark: "gray.800" }}
          color={"white"}
          width={"full"}
          type="submit"
          disabled={mutation.isPending}
          loading={mutation.isPending}
        >
          Register
        </Button>
        <Flex justifyContent={"center"} width={"full"}>
          <Text>Already have an account?</Text>
          <Link to={"/login"} className="text-blue-600 underline pl-2">
            Login
          </Link>
        </Flex>
      </Stack>
    </form>
  );
};

export default SignUp;
