import { Button, Flex, Image, Input, Stack, Text } from "@chakra-ui/react";
import { Field } from "@/components/ui/field";
import { useForm } from "react-hook-form";
import { PasswordInput } from "@/components/ui/password-input";
import logo from "../assets/logo.png";
import { Link } from "react-router-dom";
import { useRegister } from "@/hooks/useAuth";
import { toaster } from "@/components/ui/toaster";

interface FormValues {
  email: string;
  password: string;
  confirmPassword: string;
}

const SignUp = () => {
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
            {...register("email", { required: "Email is required" })}
          />
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
