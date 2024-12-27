import ApiClient from "@/utils/ApiClient";
import advertisementCollection from "../assets/data/advertisementCollection.json";
import Advertisement from "@/entity/Advertisement";

const apiClient = new ApiClient<Advertisement[]>("/advertisement1");
const useAdvertisementOne = () => {
  return apiClient.get({
    key: ["advertisement1"],
    fn: async () => {
      return new Promise((resolve) => {
        setTimeout(() => {
          const response = Object.values(advertisementCollection.data);
          response.sort(
            (a, b) =>
              new Date(a.dateTime).getTime() - new Date(b.dateTime).getTime()
          );
          resolve(response.reverse());
        }, 500);
      });
    },
  });
};
export default useAdvertisementOne;