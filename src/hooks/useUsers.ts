import Tag from "@/entity/Tag";
import ApiClient from "@/utils/ApiClient";
import userCollection from "../assets/data/adminUserCollection.json";
import AppUser from "@/entity/AppUser";

const apiClient = new ApiClient<AppUser[]>("/users");
const useUsers = () =>
  apiClient.get({
    key: ["users"],
    fn: async () =>
      new Promise((resolve) => {
        setTimeout(() => {
          const response = Object.values(userCollection.data);

          resolve(response.reverse());
        }, 500);
      }),
  });
export default useUsers;
