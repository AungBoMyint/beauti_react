import ApiClient from "@/utils/ApiClient";
import promotionCollections from "../assets/data/promotions.json";
import Promotion from "@/entity/Promotion";
import { set } from "react-hook-form";

const apiClient = new ApiClient<Promotion[]>("/promotions");
export const usePromotion = () =>
  apiClient.get({
    key: ["promotions"],
    fn: async () =>
      new Promise((resolve) => {
        setTimeout(() => {
          const response = Object.values(
            promotionCollections.data
          ) as Promotion[];
          resolve(response);
        }, 500);
      }),
  });
export const useSearchPromotion = (value: string) => {
  const apiClient = new ApiClient<Promotion>("/promotions");

  return apiClient.get({
    key: ["promotions", value],
    fn: async () =>
      new Promise((resolve) => {
        setTimeout(() => {
          const response = Object.values(
            promotionCollections.data
          ) as Promotion[];
          const result = response.find((item) => item.code === value);
          resolve(
            result ?? {
              code: "",
              dateTime: "",
              id: "",
              promotionValue: "",
              restrictValue: 0,
            }
          );
        }, 500);
      }),
  });
};
export const filterPromotion = (value: string) => {
  const response = Object.values(promotionCollections.data) as Promotion[];
  const result = response.find((item) => item.code === value);
  return result;
};
