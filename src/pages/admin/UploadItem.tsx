import ScrollX from "@/components/app/ScrollX";
import SizeInput from "@/components/app/SizeInput";
import { Button } from "@/components/ui/button";
import { Field } from "@/components/ui/field";
import Brand from "@/entity/Brand";
import ScheduleSale from "@/entity/ScheduleSale";
import Size from "@/entity/Size";
import useBrand from "@/hooks/useBrand";
import useCategories from "@/hooks/useCategories";
import useStatus from "@/hooks/useStatus";
import useTags from "@/hooks/useTags";
import { Box, Flex, Input, Text, Textarea } from "@chakra-ui/react";
import { useMemo, useState } from "react";
import { useForm } from "react-hook-form";
import { v4 as uuidv4, v4 } from "uuid";
import debounce from "lodash.debounce";
import ScheduleSaleInput from "@/components/app/ScheduleSaleInput";
import { useLocation } from "react-router-dom";
import Item from "@/entity/Item";
import { useCreateItem, useUpdateItem } from "@/hooks/useItem";
import { useQueryClient } from "@tanstack/react-query";
import { toaster } from "@/components/ui/toaster";

interface FormValues {
  advertisementID: string;
  brandID: string;
  brandName: string;
  category: string[];
  color: string;
  comment: string[] | null;
  dateTime: string;
  deliveryTime: string | null;
  description: string;
  discountPrice: number | null;
  howToUse: string | null;
  id: string;
  ingredients: string | null;
  love: null | number;
  name: string;
  originalPrice: number;
  originalQuantity: number;
  photo1: string | null;
  photo2: string | null;
  photo3: string | null;
  price: number | string;
  remainQuantity: number;
  requirePoint: null | number;
  reviewCount: null | number;
  scheduleSale: null | ScheduleSale;
  size: Size[] | null;
  status: string | null;
  tags: string[] | null;
}
const UploadItem = () => {
  const location = useLocation();
  const product = location.state?.item as Item | undefined;
  const [category, setCategory] = useState<string[]>(product?.category ?? []);
  const [status, setStatus] = useState<string | undefined>(
    product?.status ?? undefined
  );
  const [tag, setTag] = useState<string[]>(product?.tags ?? []);
  const productBrand = product
    ? { dateTime: "", id: product.brandID, image: "", name: product.brandName }
    : (undefined as Brand | undefined);
  const [brand, setBrand] = useState<Brand | undefined>(productBrand);
  const [sizes, setSize] = useState<Size[]>(product?.size ?? []);
  const [scheduleSale, setScheduleSale] = useState<ScheduleSale>(
    product?.scheduleSale ?? ({} as ScheduleSale)
  );
  const brands = useBrand();
  const categories = useCategories();
  const statuses = useStatus();
  const tags = useTags();
  const queryClient = useQueryClient();
  const onSuccess = () => {
    toaster.create({
      title: `Product is ${product ? "updated" : "created"}!`,
      type: "success",
    });
    queryClient.invalidateQueries({ queryKey: ["items"] });
  };
  const mutation = product
    ? useUpdateItem(onSuccess)
    : useCreateItem(onSuccess);

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },

    setValue,
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

  const addSize = () => {
    setSize((pre) => {
      var result = [...pre, { id: uuidv4(), price: 0, size: "" }];
      setValue("size", result);
      return result;
    });
  };
  const removeSize = (size: Size) => {
    setSize((pre) => {
      var result = pre?.filter((item) => item.id !== size.id);
      setValue("size", result);
      return result;
    });
  };

  const isSelectedCategory = (value: string) => category?.includes(value);
  const isSelectedTag = (value: string) => tag?.includes(value);
  const handleSetCategory = (value: string) => {
    setCategory((pre) => {
      if (pre?.includes(value)) {
        var result = pre.filter((item) => item !== value);
        setValue("category", result);
        return result;
      } else {
        var result = [...pre, value];
        setValue("category", result);
        return result;
      }
    });
  };
  const handleSetStatus = (value: string) => {
    setStatus((_) => {
      setValue("status", value);
      return value;
    });
  };
  const handleSetBrand = (value: Brand) => {
    setBrand((_) => {
      setValue("brandID", value.id);
      setValue("brandName", value.name);
      return value;
    });
  };
  const handleSetTag = (value: string) =>
    setTag((pre) => {
      if (pre?.includes(value)) {
        var result = pre.filter((item) => item !== value);
        setValue("tags", result);
        return result;
      } else {
        var result = [...pre, value];
        setValue("tags", result);
        return result;
      }
    });

  const handleSizeInputChange = useMemo(
    () =>
      debounce((id: string, key: string, value: string) => {
        setSize((pre) => {
          var result = pre.map((item) =>
            item.id === id ? { ...item, [key]: value } : item
          );
          setValue("size", result);
          return result;
        });
      }, 500),
    []
  );

  const handleScheduleInputChange = useMemo(
    () =>
      debounce((key: string, value: string) => {
        setScheduleSale((pre) => {
          var result = { ...pre, [key]: value };
          setValue("scheduleSale", result);
          return result;
        });
      }, 500),
    []
  );

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
        <Text>Upload Item</Text>
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
      <Flex direction={"column"} p={2} gap={4}>
        <Box spaceY={2} mt={"60px"}>
          <Text fontWeight={"medium"} fontSize={15}>
            Category:
          </Text>
          <ScrollX key={"upload-categories"}>
            {categories.data?.map((item) => (
              <Button
                shadow={"xs"}
                px={2}
                size={"sm"}
                color={{
                  base: isSelectedCategory(item.name) ? "black" : "gray.500",
                  _dark: "white",
                }}
                border={"solid"}
                borderColor={{
                  base: isSelectedCategory(item.name) ? "gray.800" : "white",
                  _dark: isSelectedCategory(item.name) ? "black" : "gray.800",
                }}
                variant={"solid"}
                key={`${item.id}`}
                onClick={() => handleSetCategory(item.name)}
              >
                {item?.name}
              </Button>
            ))}
          </ScrollX>
        </Box>
        <Box spaceY={2}>
          <Text fontWeight={"medium"} fontSize={15}>
            Status:
          </Text>
          <ScrollX key={"upload-status"}>
            {statuses.data?.map((item) => (
              <Button
                shadow={"xs"}
                px={2}
                size={"sm"}
                color={{
                  base: status === item.name ? "black" : "gray.500",
                  _dark: "white",
                }}
                border={"solid"}
                borderColor={{
                  base: status === item.name ? "gray.800" : "white",
                  _dark: status === item.name ? "black" : "gray.800",
                }}
                variant={"solid"}
                key={`${item.id}`}
                onClick={() => handleSetStatus(item.name)}
              >
                {item?.name}
              </Button>
            ))}
          </ScrollX>
        </Box>
        <Box spaceY={2}>
          <Text fontWeight={"medium"} fontSize={15}>
            Tags:
          </Text>
          <ScrollX key={"upload-tags"}>
            {tags.data?.map((item) => (
              <Button
                shadow={"xs"}
                px={2}
                size={"sm"}
                color={{
                  base: isSelectedTag(item.name) ? "black" : "gray.500",
                  _dark: "white",
                }}
                border={"solid"}
                borderColor={{
                  base: isSelectedTag(item.name) ? "gray.800" : "white",
                  _dark: isSelectedTag(item.name) ? "black" : "gray.800",
                }}
                variant={"solid"}
                key={`${item.id}`}
                onClick={() => handleSetTag(item.name)}
              >
                {item?.name}
              </Button>
            ))}
          </ScrollX>
        </Box>
        <Box spaceY={2}>
          <Text fontWeight={"medium"} fontSize={15}>
            Brands:
          </Text>
          <ScrollX key={"upload-brands"}>
            {brands.data?.map((item) => (
              <Button
                shadow={"xs"}
                px={2}
                size={"sm"}
                color={{
                  base: brand?.id == item.id ? "black" : "gray.500",
                  _dark: "white",
                }}
                border={"solid"}
                borderColor={{
                  base: brand?.id == item.id ? "gray.800" : "white",
                  _dark: brand?.id == item.id ? "black" : "gray.800",
                }}
                variant={"solid"}
                key={`${item.id}`}
                onClick={() => handleSetBrand(item)}
              >
                {item?.name}
              </Button>
            ))}
          </ScrollX>
        </Box>
        <Field
          label="Photo Link 1"
          invalid={!!errors.photo1}
          errorText={errors.photo1?.message}
        >
          <Input
            border={"solid"}
            focusRing={"none"}
            px={2}
            css={{
              "--error-color": "none",
              "--focus-color": "none",
            }}
            {...register("photo1", { required: "Photo Link 1 is required" })}
          />
        </Field>
        <Field
          label="Photo Link 2"
          invalid={!!errors.photo2}
          errorText={errors.photo2?.message}
        >
          <Input
            border={"solid"}
            focusRing={"none"}
            px={2}
            css={{
              "--error-color": "none",
              "--focus-color": "none",
            }}
            {...register("photo2", { required: "Photo Link 2 is required" })}
          />
        </Field>
        <Field
          label="Photo Link 3"
          invalid={!!errors.photo3}
          errorText={errors.photo3?.message}
        >
          <Input
            border={"solid"}
            focusRing={"none"}
            px={2}
            css={{
              "--error-color": "none",
              "--focus-color": "none",
            }}
            {...register("photo3", { required: "Photo Link 3 is required" })}
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
          invalid={!!errors.description}
          errorText={errors.description?.message}
        >
          <Input
            border={"solid"}
            focusRing={"none"}
            px={2}
            css={{
              "--error-color": "none",
              "--focus-color": "none",
            }}
            {...register("description", {
              required: "အသေးစိတ်ဖော်ပြချက် is required",
            })}
          />
        </Field>
        <Field
          label="Ingredients"
          invalid={!!errors.ingredients}
          errorText={errors.ingredients?.message}
        >
          <Textarea
            border={"solid"}
            focusRing={"none"}
            px={2}
            css={{
              "--error-color": "none",
              "--focus-color": "none",
            }}
            {...register("ingredients")}
          />
        </Field>
        <Field
          label="How To Use"
          invalid={!!errors.howToUse}
          errorText={errors.howToUse?.message}
        >
          <Textarea
            border={"solid"}
            focusRing={"none"}
            px={2}
            css={{
              "--error-color": "none",
              "--focus-color": "none",
            }}
            {...register("howToUse")}
          />
        </Field>
        <Field
          label="စျေးနှုန်း"
          invalid={!!errors.price}
          errorText={errors.price?.message}
        >
          <Textarea
            border={"solid"}
            focusRing={"none"}
            px={2}
            css={{
              "--error-color": "none",
              "--focus-color": "none",
            }}
            {...register("price", {
              required: "စျေးနှုန်း is required",
            })}
          />
        </Field>
        <Field
          label="အထူးလျော့စျေး"
          invalid={!!errors.discountPrice}
          errorText={errors.discountPrice?.message}
        >
          <Textarea
            border={"solid"}
            focusRing={"none"}
            px={2}
            css={{
              "--error-color": "none",
              "--focus-color": "none",
            }}
            {...register("discountPrice")}
          />
        </Field>
        <SizeInput
          items={sizes}
          onAdd={addSize}
          onRemove={removeSize}
          handleInputChange={handleSizeInputChange}
        />
        <ScheduleSaleInput
          scheduleSale={scheduleSale}
          handleInputChange={handleScheduleInputChange}
        />
        <Field label="Reward Point" invalid={!!errors.requirePoint}>
          <Input
            border={"solid"}
            focusRing={"none"}
            px={2}
            css={{
              "--error-color": "none",
              "--focus-color": "none",
            }}
            {...register("requirePoint")}
          />
        </Field>
        <Field label="Buying Price" invalid={!!errors.originalPrice}>
          <Input
            border={"solid"}
            focusRing={"none"}
            px={2}
            css={{
              "--error-color": "none",
              "--focus-color": "none",
            }}
            {...register("originalPrice", {
              required: "Buying Price is required",
            })}
          />
        </Field>
        <Field label="Original Quantity" invalid={!!errors.originalQuantity}>
          <Input
            border={"solid"}
            focusRing={"none"}
            px={2}
            css={{
              "--error-color": "none",
              "--focus-color": "none",
            }}
            {...register("originalQuantity", {
              required: "Original Quantity is required",
            })}
          />
        </Field>
        <Field label="Remain Quantity" invalid={!!errors.remainQuantity}>
          <Input
            border={"solid"}
            focusRing={"none"}
            px={2}
            css={{
              "--error-color": "none",
              "--focus-color": "none",
            }}
            {...register("remainQuantity", {
              required: "Remain Quantity is required",
            })}
          />
        </Field>
      </Flex>
    </form>
  );
};

export default UploadItem;
