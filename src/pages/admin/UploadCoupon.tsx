import { Button } from "@/components/ui/button";
import { Field } from "@/components/ui/field";
import {
  SelectContent,
  SelectItem,
  SelectLabel,
  SelectRoot,
  SelectTrigger,
  SelectValueText,
} from "@/components/ui/select";

import useBrand from "@/hooks/useBrand";
import useCategories from "@/hooks/useCategories";
import { CollectionType, createCollection } from "@/utils/fun";
import { Box, Flex, Input, ListCollection, Text } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useLocation } from "react-router-dom";
import "./item.css";
import { useQueryClient } from "@tanstack/react-query";
import { toaster } from "@/components/ui/toaster";
import { useCreateCoupon, useUpdateCoupon } from "@/hooks/useCoupon";
import { v4 } from "uuid";

interface FormValues {
  brands: string[];
  categories: string[];
  code: string;
  dateTime: string;
  id: string;
  promotionValue: string;
  restrictValue: number;
  users: string[] | undefined | null;
}

const UploadCoupon = () => {
  const location = useLocation();
  const coupon = location.state?.coupon;
  const { data: brands, isLoading: loadingBrands } = useBrand();
  const { data: categories, isLoading: loadingCategories } = useCategories();
  const [brandCollection, setBrandCollection] = useState<
    ListCollection<CollectionType> | undefined
  >();
  const [categoryCollection, setCategoryCollection] = useState<
    ListCollection<CollectionType> | undefined
  >();
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<FormValues>({
    defaultValues: coupon ?? {},
  });
  const queryClient = useQueryClient();
  const onSuccess = () => {
    toaster.create({
      title: `Coupon is ${coupon ? "updated" : "created"}`,
      type: "success",
    });
    queryClient.invalidateQueries({ queryKey: ["coupons"] });
  };
  const mutation = coupon
    ? useUpdateCoupon(onSuccess)
    : useCreateCoupon(onSuccess);
  const onSubmit = handleSubmit((data) => {
    if (isValid) {
      mutation.mutate(
        coupon
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
  useEffect(() => {
    if (brands) {
      var bc = createCollection({
        items: brands,
        labelKey: "name",
        valueKey: "id",
      });
      setBrandCollection(bc);
    }
    if (categories) {
      var cc = createCollection({
        items: categories,
        labelKey: "name",
        valueKey: "id",
      });
      setCategoryCollection(cc);
    }
  }, [brands, categories]);
  if (loadingBrands || loadingCategories) {
    return <Text>Loading....</Text>;
  }
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
        <Text>Upload Coupon</Text>

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
        <Field invalid errorText={errors.brands?.message}>
          <SelectRoot
            multiple
            collection={brandCollection!}
            size="sm"
            width="full"
            defaultValue={coupon?.brands}
            {...register("brands", {
              required: "Brands is required",
            })}
          >
            <SelectLabel fontWeight={"medium"}>
              Select Allowed Brands
            </SelectLabel>
            <SelectTrigger border={"solid"} px={2} rounded={"sm"}>
              <SelectValueText fontSize={"sm"} placeholder="" />
            </SelectTrigger>
            <SelectContent maxHeight={250}>
              {brandCollection?.items.map((item) => (
                <SelectItem item={item} key={item.value}>
                  {item.label}
                </SelectItem>
              ))}
            </SelectContent>
          </SelectRoot>
        </Field>
        <Field invalid errorText={errors.categories?.message}>
          <SelectRoot
            multiple
            collection={categoryCollection!}
            defaultValue={coupon?.categories}
            size="sm"
            width="full"
            {...register("categories", {
              required: "Categories is required",
            })}
          >
            <SelectLabel fontWeight={"medium"}>
              Select Allowed Categories
            </SelectLabel>
            <SelectTrigger border={"solid"} px={2} rounded={"sm"}>
              <SelectValueText fontSize={"sm"} placeholder="" />
            </SelectTrigger>
            <SelectContent maxHeight={250}>
              {categoryCollection?.items.map((item) => (
                <SelectItem item={item} key={item.value}>
                  {item.label}
                </SelectItem>
              ))}
            </SelectContent>
          </SelectRoot>
        </Field>
      </Flex>
    </form>
  );
};

export default UploadCoupon;
