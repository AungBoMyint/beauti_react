import Category from "@/entity/Category";
import ApiClient from "@/utils/ApiClient";
import categories from "../assets/data/categories.json";

const apiClient = new ApiClient<Category[]>("/categories");

const useCategories = () => {
  return apiClient.get({
    key: ["categories"],
    //staleTime: 1000 * 60 * 5,
    fn: async () => {
      const response = await new Promise<Category[]>((resolve) => {
        setTimeout(() => {
          const newCategories = Object.values(categories.data);
          newCategories.sort(
            (a, b) =>
              new Date(a.dateTime).getTime() - new Date(b.dateTime).getTime()
          );
          resolve(newCategories.reverse());
        }, 500);
      });
      return response;
    },
    /* initialData: () => {
      const newCategories = Object.values(categories.data);
      newCategories.sort(
        (a, b) =>
          new Date(a.dateTime).getTime() - new Date(b.dateTime).getTime()
      );
      return newCategories.reverse();
    }, */
  });
};

export default useCategories;
