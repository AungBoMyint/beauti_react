import NotiModel from "@/entity/Notification";
import ApiClient from "@/utils/ApiClient";

const apiClient = new ApiClient<NotiModel[]>("/notifiations");
const useNotifications = () => {
  return apiClient.get({
    key: ["notifications"],
    fn: async () => {
      return new Promise((_) => {
        setTimeout(() => {}, 500);
      });
    },
  });
};
export default useNotifications;
