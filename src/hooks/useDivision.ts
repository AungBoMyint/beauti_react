import ApiClient from "@/utils/ApiClient";
import townshipCollection from "../assets/data/divisions.json";
import Division from "@/entity/Division";

const apiClient = new ApiClient<Division[]>("/townships");
export const useDivisions = () =>
  apiClient.get({
    key: ["divisions"],
    fn: async () =>
      new Promise((resolve) => {
        setTimeout(() => {
          const response = Object.values(townshipCollection.data) as Division[];
          response.sort(
            (a, b) =>
              new Date(a.dateTime).getTime() - new Date(b.dateTime).getTime()
          );
          resolve(response);
        }, 500);
      }),
  });
