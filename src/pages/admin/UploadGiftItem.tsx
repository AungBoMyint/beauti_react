import { Button } from "@/components/ui/button";
import { Field } from "@/components/ui/field";
import { Flex, Input, Text } from "@chakra-ui/react";
import { useForm } from "react-hook-form";
import { v4 } from "uuid";
import { useLocation } from "react-router-dom";
import { useQueryClient } from "@tanstack/react-query";
import { toaster } from "@/components/ui/toaster";
import GiftItem from "@/entity/GiftItem";
import { useCreateGiftItem, useUpdateGiftItem } from "@/hooks/useBirthdayGift";

interface FormValues {
  dateTime: string;
  id: string;
  name: string;
  desc: string;
  image: string;
}
const UploadGiftItem = () => {
  const location = useLocation();
  const product = location.state?.item as GiftItem | undefined;

  const queryClient = useQueryClient();
  const onSuccess = () => {
    toaster.create({
      title: `Product is ${product ? "updated" : "created"}!`,
      type: "success",
    });
    queryClient.invalidateQueries({ queryKey: ["gift-items"] });
  };
  const mutation = product
    ? useUpdateGiftItem(onSuccess)
    : useCreateGiftItem(onSuccess);

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<FormValues>({
    defaultValues: product ? product : {},
  });

  const onSubmit = handleSubmit((data) => {
    if (isValid) {
      mutation.mutate(
        product
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
        width={"100vw"}
        position={"fixed"}
        justifyContent={"space-between"}
        alignItems={"center"}
        shadow={"lg"}
        px={4}
        py={2}
        fontWeight={"bold"}
        bgColor={{ base: "white", _dark: "gray.800" }}
      >
        <Text>Upload Gift Item</Text>
        <Button
          bg={{ base: "black", _dark: "black" }}
          type="submit"
          variant={"solid"}
          size={"sm"}
          px={2}
          fontSize={"sm"}
          color={"white"}
          loading={mutation.isPending}
          disabled={mutation.isPending}
        >
          Save
        </Button>
      </Flex>
      <Flex direction={"column"} p={2} gap={4}>
        <Field
          mt={"60px"}
          label="Image Link"
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
          label="Product အမည်"
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
            {...register("name", { required: "Product အမည် is required" })}
          />
        </Field>
        <Field
          label="အသေးစိတ်ဖော်ပြချက်"
          invalid={!!errors.desc}
          errorText={errors.desc?.message}
        >
          <Input
            border={"solid"}
            focusRing={"none"}
            px={2}
            css={{
              "--error-color": "none",
              "--focus-color": "none",
            }}
            {...register("desc", {
              required: "အသေးစိတ်ဖော်ပြချက် is required",
            })}
          />
        </Field>
      </Flex>
    </form>
  );
};

export default UploadGiftItem;
