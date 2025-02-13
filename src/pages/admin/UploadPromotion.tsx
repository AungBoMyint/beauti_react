import { Button } from "@/components/ui/button";
import { Field } from "@/components/ui/field";
import { toaster } from "@/components/ui/toaster";
import { useCreatePromotion, useUpdatePromotion } from "@/hooks/usePromotion";
import { Box, Flex, Input, Text } from "@chakra-ui/react";
import { useQueryClient } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { useLocation } from "react-router-dom";
import { v4 } from "uuid";

interface FormValues {
  code: string;
  dateTime: string;
  id: string;
  promotionValue: string;
  restrictValue: number;
}
const UploadPromotion = () => {
  const location = useLocation();
  const promotion = location.state?.promotion;
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<FormValues>({
    defaultValues: promotion ?? {},
  });
  const queryClient = useQueryClient();
  const onSuccess = () => {
    toaster.create({
      title: `Promotion is ${promotion ? "updated" : "created"}`,
      type: "success",
    });
    queryClient.invalidateQueries({ queryKey: ["promotions"] });
  };
  const mutation = promotion
    ? useUpdatePromotion(onSuccess)
    : useCreatePromotion(onSuccess);
  const onSubmit = handleSubmit((data) => {
    if (isValid) {
      mutation.mutate(
        promotion
          ? { ...data, id: promotion.id }
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
        <Text>Upload promotion</Text>

        <Button
          type="submit"
          variant={"solid"}
          size={"sm"}
          px={2}
          fontSize={"sm"}
          bg={{ base: "black", _dark: "black" }}
          color={"white"}
          loading={mutation.isPending}
          disabled={mutation.isPending}
        >
          Save
        </Button>
      </Flex>
      <Box height={"56px"}></Box>
      <Flex direction={"column"} p={2} gap={4}>
        <Field
          label="Code"
          invalid={!!errors.code}
          errorText={errors.code?.message}
        >
          <Input
            border={"solid"}
            focusRing={"none"}
            px={2}
            css={{
              "--error-color": "none",
              "--focus-color": "none",
            }}
            {...register("code", {
              required: "Code is required",
            })}
          />
        </Field>
        <Field
          label="Value: __Ks (or) __ %"
          invalid={!!errors.promotionValue}
          errorText={errors.promotionValue?.message}
        >
          <Input
            border={"solid"}
            focusRing={"none"}
            px={2}
            css={{
              "--error-color": "none",
              "--focus-color": "none",
            }}
            {...register("promotionValue", {
              required: "Promotion Value is required",
            })}
          />
        </Field>
        <Field
          label="Restricted amount"
          invalid={!!errors.restrictValue}
          errorText={errors.restrictValue?.message}
        >
          <Input
            border={"solid"}
            focusRing={"none"}
            px={2}
            css={{
              "--error-color": "none",
              "--focus-color": "none",
            }}
            {...register("restrictValue", {
              required: "Restricted Value is required",
            })}
          />
        </Field>
      </Flex>
    </form>
  );
};

export default UploadPromotion;
