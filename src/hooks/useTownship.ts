import ApiClient from "@/utils/ApiClient";
import townshipCollection from "../assets/data/divisions.json";
import Township from "@/entity/Division";

const apiClient = new ApiClient<Township[]>("/townships");
export const useTownship = () =>
  apiClient.get({
    key: ["townships"],
    fn: async () =>
      new Promise((resolve) => {
        setTimeout(() => {
          const response = Object.values(townshipCollection.data) as Township[];
          response.sort(
            (a, b) =>
              new Date(a.dateTime).getTime() - new Date(b.dateTime).getTime()
          );
          resolve(response);
        }, 500);
      }),
  });
