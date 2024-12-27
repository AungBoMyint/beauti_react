import ApiClient from "@/utils/ApiClient";
import brandCollection from "../assets/data/brandCollection.json";
import Brand from "@/entity/Brand";

const apiClient = new ApiClient<Brand[]>("/brands");
const useBrand = () => {
  return apiClient.get({
    key: ["brands"],
    fn: async () => {
      return new Promise((resolve) => {
        setTimeout(() => {
          const response = Object.values(brandCollection.data) as Brand[];
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
export default useBrand;
