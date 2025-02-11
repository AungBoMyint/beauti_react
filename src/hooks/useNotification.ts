import NotiModel from "@/entity/Notification";
import ApiClient from "@/utils/ApiClient";
import notificationCollection from "../assets/data/notificationCOllection.json";

const apiClient = new ApiClient<NotiModel[]>("/notifiations");
const useNotifications = () => {
  return apiClient.get({
    key: ["notifications"],
    fn: async () => {
      return new Promise((resolve) => {
        setTimeout(() => {
          const response: NotiModel[] = Object.values(
            notificationCollection.data
          );
          resolve(response);
        }, 500);
      });
    },
  });
};
export default useNotifications;
