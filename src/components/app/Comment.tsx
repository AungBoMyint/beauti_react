import { Text, Card, HStack, Stack, Strong } from "@chakra-ui/react";
import { Avatar } from "../ui/avatar";
import Review from "@/entity/Review";
import { guestUserProfile } from "@/utils/constant";

interface Props {
  review: Review;
}
const Comment = ({ review }: Props) => {
  return (
    <Card.Root width={"full"} variant={"outline"}>
      <Card.Body paddingY={2} paddingX={0}>
        <HStack gap="3">
          <Avatar
            src={review.user.image ?? guestUserProfile}
            name={review.user.emailAddress}
          />
          <Text fontWeight="semibold" textStyle="sm">
            {review.user.userName || review.user.emailAddress?.slice(5, 9)}
          </Text>
        </HStack>
        <Card.Description paddingLeft={14}>
          {review.reviewMessage}
        </Card.Description>
      </Card.Body>
    </Card.Root>
  );
};

export default Comment;
