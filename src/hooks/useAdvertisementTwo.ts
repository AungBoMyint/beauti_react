import ApiClient from "@/utils/ApiClient";
import advertisementColection2 from "../assets/data/advertisementColection2.json";
import Advertisement from "@/entity/Advertisement";

const apiClient = new ApiClient<Advertisement[]>("/advertisement1");
const useAdvertisementTwo = () => {
  return apiClient.get({
    key: ["advertisement2"],
    fn: async () => {
      return new Promise((resolve) => {
        setTimeout(() => {
          const response = Object.values(advertisementColection2.data);
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
export default useAdvertisementTwo;
