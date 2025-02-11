import Purchase from "@/entity/Purchase";
import ApiClient from "@/utils/ApiClient";
import purchaseCollection from "../assets/data/purchases.json";

const apiClient = new ApiClient<Purchase[]>("/purchases");
const usePurchases = (status: string) =>
  apiClient.get({
    key: ["purchases", status],
    fn: async () =>
      await new Promise((resolve) => {
        setTimeout(() => {
          const responseOne = Object.values(
            purchaseCollection.data
          ) as Purchase[];
          var result: Purchase[] = [];
          if (status === "Cash") {
            result = responseOne.filter((item) => item.bankSlipImage === null);
          } else if (status === "Pre") {
            result = responseOne.filter((item) => item.bankSlipImage !== null);
          }
          result = result.sort(
            (a, b) =>
              new Date(a.dateTime).getTime() - new Date(b.dateTime).getTime()
          );
          resolve(result.reverse());
        }, 500);
      }),
  });

export const usePurchaseHistory = (userId: string) =>
  apiClient.get({
    key: ["purchases", userId],
    fn: async () =>
      await new Promise((resolve) => {
        setTimeout(() => {
          const responseOne = Object.values(
            purchaseCollection.data
          ) as Purchase[];
          var result: Purchase[] = responseOne.filter(
            (item) => item?.userId === userId
          );
          result = result.sort(
            (a, b) =>
              new Date(a.dateTime).getTime() - new Date(b.dateTime).getTime()
          );
          resolve(result.reverse());
        }, 500);
      }),
  });
export default usePurchases;
