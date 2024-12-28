import ApiClient from "@/utils/ApiClient";
import statusCollection from "../assets/data/statusCollection.json";
import Status from "@/entity/Status";

const apiClient = new ApiClient<Status[]>("/status");
const useStatus = () =>
  apiClient.get({
    key: ["status"],
    fn: async () =>
      new Promise((resolve) => {
        setTimeout(() => {
          const response = Object.values(statusCollection.data);
          response.sort(
            (a, b) =>
              new Date(a.dateTime).getTime() - new Date(b.dateTime).getTime()
          );
          resolve(response.reverse());
        }, 500);
      }),
  });
export default useStatus;
