import Tag from "@/entity/Tag";
import ApiClient from "@/utils/ApiClient";
import tagCollection from "../assets/data/tagsCollection.json";

const apiClient = new ApiClient<Tag[]>("/tags");
const useTags = () =>
  apiClient.get({
    key: ["tags"],
    fn: async () =>
      new Promise((resolve) => {
        setTimeout(() => {
          const response = Object.values(tagCollection.data);
          resolve(response.reverse());
        }, 500);
      }),
  });
export default useTags;
