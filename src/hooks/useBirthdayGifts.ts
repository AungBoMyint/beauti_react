import ApiClient from "@/utils/ApiClient";
import giftCollection from "../assets/data/birthdayGiftsCollection.json";
import GiftItem from "@/entity/GiftItem";

const apiClient = new ApiClient<GiftItem[]>("/birthdayGifts");
export const useGetBirthdayGifts = () => {
  return apiClient.get({
    key: ["birthday-gifts"],
    fn: async () => {
      return new Promise((resolve) => {
        setTimeout(() => {
          const response = Object.values(giftCollection.data) as GiftItem[];
          response.sort(
            (a, b) =>
              new Date(a.dateTime).getTime() - new Date(b.dateTime).getTime()
          );
          resolve(response);
        }, 500);
      });
    },
  });
};
