import useReview, { useAddReview } from "@/hooks/useReview";
import { Flex, Text, Button, Textarea } from "@chakra-ui/react";
import { Rating } from "../ui/rating";
import Comment from "./Comment";
import { useForm, Controller } from "react-hook-form";
import { Field } from "../ui/field";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useQueryClient } from "@tanstack/react-query";
import { ProgressCircleRing, ProgressCircleRoot } from "../ui/progress-circle";
import { v4 } from "uuid";
import authStore from "@/hooks/authStore";

interface Props {
  productId: string;
}
interface FormValues {
  rating: number;
  comment: string;
}
const formSchema = z.object({
  rating: z.number({ required_error: "Rating is required" }).min(1).max(5),
  comment: z.string({ required_error: "Review is required" }),
});

const ItemDetailReview = ({ productId }: Props) => {
  const queryClient = useQueryClient();
  const { data, isLoading } = useReview(productId);
  const {
    mutate: addReview,
    isPending,
    isError,
  } = useAddReview({
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["reviews", data.productId] });
      queryClient.invalidateQueries({ queryKey: ["ratings", data.productId] });
    },
  });
  //if (isLoading) return <div>loading.....</div>;
  const {
    register,
    handleSubmit,
    formState: { errors },
    control,
  } = useForm<FormValues>({
    resolver: zodResolver(formSchema),
  });

  const onSubmit = handleSubmit((data) => {
    const currentUser = authStore.getState().currentUser;
    if (!currentUser) return;
    const review = {
      dateTime: new Date().toISOString(),
      id: `test:${v4()}`,
      productId: productId,
      rating: data.rating,
      reviewMessage: data.comment,
      user: currentUser,
      approved: false,
      verifiedPurchase: false,
    };
    addReview(review);
  });

  return (
    <form onSubmit={onSubmit} className=" w-full">
      <Flex gap={2} alignItems={"start"} direction={"column"} width={"full"}>
        <Flex
          width={"full"}
          alignItems={"center"}
          justifyContent={"space-between"}
        >
          <Text fontWeight={"bold"} fontSize={"md"}>
            Review Product
          </Text>
          <Text fontSize={"sm"} fontWeight={"medium"}>
            ({data ? data.length : 0} Reviews)
          </Text>
        </Flex>
        <Field
          label=""
          invalid={!!errors.rating}
          errorText={errors.rating?.message}
        >
          <Controller
            control={control}
            name="rating"
            render={({ field }) => (
              <Flex alignItems={"center"} gap={2}>
                <Rating
                  name={field.name}
                  value={field.value}
                  onValueChange={({ value }) => field.onChange(value)}
                />
                <Text>{field.value}</Text>
              </Flex>
            )}
          />
        </Field>

        <Field
          label=""
          invalid={!!errors.comment}
          helperText=""
          errorText={errors.comment?.message}
        >
          <Controller
            control={control}
            name="comment"
            render={({ field }) => (
              <Textarea
                focusRing={"none"}
                border={"1px solid"}
                padding={2}
                size={"xl"}
                placeholder="Write a review..."
                {...field}
              />
            )}
          />
        </Field>
        {isError && <Text color={"red"}>Something was wrong!</Text>}
        <Flex width={"full"} justifyContent={"center"}>
          <Button
            type="submit"
            variant={"solid"}
            bg={{ base: "black", _dark: "gray.800" }}
            paddingX={2}
            rounded={"md"}
            fontWeight={"medium"}
            color={"white"}
            disabled={isPending ? true : false}
          >
            {isPending ? (
              <ProgressCircleRoot value={null} size="sm">
                <ProgressCircleRing cap="round" />
              </ProgressCircleRoot>
            ) : (
              "Submit"
            )}
          </Button>
        </Flex>
        {data?.map((review) => (
          <Comment key={review.id} review={review} />
        ))}
      </Flex>
    </form>
  );
};

export default ItemDetailReview;
