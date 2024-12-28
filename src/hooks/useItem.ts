import ApiClient from "@/utils/ApiClient";
import items from "../assets/data/items.json";
import Item from "@/entity/Item";

interface FilterItemProps {
  categoryName: string;
  sortName: string;
  oldItems: Item[];
}
const apiClient = new ApiClient<Item[]>("/items");

export const useFilterStatusItem = (status: string) =>
  apiClient.get({
    key: ["items", status],
    fn: async () =>
      new Promise((resolve) => {
        setTimeout(() => {
          const response = Object.values(items.data) as Item[];
          response.sort(
            (a, b) =>
              new Date(a.dateTime).getTime() - new Date(b.dateTime).getTime()
          );
          //find items equal to status
          const result = response.filter(
            (item) => item.status?.trim() === status?.trim()
          );
          resolve(result.reverse());
        }, 500);
      }),
  });
export const useFilterCategoryItem = (category: string) =>
  apiClient.get({
    key: ["items", status],
    fn: async () =>
      new Promise((resolve) => {
        setTimeout(() => {
          const response = Object.values(items.data) as Item[];
          response.sort(
            (a, b) =>
              new Date(a.dateTime).getTime() - new Date(b.dateTime).getTime()
          );
          //find items equal to status
          const result = response.filter(
            (item) => item.category && item.category?.includes(category.trim())
          );
          resolve(result.reverse());
        }, 500);
      }),
  });
export const useFilterBrandItem = (brandName: string) =>
  apiClient.get({
    key: ["items", brandName],
    fn: async () =>
      new Promise((resolve) => {
        setTimeout(() => {
          const response = Object.values(items.data) as Item[];
          response.sort(
            (a, b) =>
              new Date(a.dateTime).getTime() - new Date(b.dateTime).getTime()
          );
          //find items equal to status
          const result = response.filter(
            (item) =>
              item.brandName &&
              item.brandName?.toLowerCase().trim() ===
                brandName.toLowerCase().trim()
          );
          resolve(result.reverse());
        }, 500);
      }),
  });
export const useFilterItem = ({
  categoryName,
  sortName,
  oldItems,
}: FilterItemProps) =>
  apiClient.get({
    key: ["items", categoryName, sortName],
    fn: async () =>
      new Promise((resolve) => {
        setTimeout(() => {
          const resultOne = oldItems;
          const resultTwo = resultOne.filter((item) =>
            (item.category ?? []).includes(categoryName)
          );

          const finalResult = resultTwo?.length > 0 ? resultTwo : resultOne;
          //we sort lth htl

          switch (sortName) {
            case "lth":
              finalResult
                .sort((a, b) => parseInt(`${a.price}`) - parseInt(`${b.price}`))
                .reverse();
            case "htl":
              finalResult.sort(
                (a, b) =>
                  parseInt(`${a.requirePoint ?? a.price}`) -
                  parseInt(`${b.price}`)
              );

            default:
              break;
          }

          resolve(finalResult);
        }, 500);
      }),
  });
export const useSearchItems = (value: string | undefined) =>
  apiClient.get({
    key: ["items", value ?? ""],
    fn: value
      ? async () =>
          new Promise((resolve) => {
            setTimeout(() => {
              const response = Object.values(items.data) as Item[];
              const result = response.filter((item) =>
                item.name?.includes(value)
              );

              resolve(result);
            }, 500);
          })
      : async () => [],
  });
export const useFilterIdItem = (id: string) => {
  const newApiClient = new ApiClient<Item | undefined>(`/items/${id}`);
  return newApiClient.get({
    key: ["items", id],
    fn: async () =>
      new Promise((resolve) => {
        setTimeout(() => {
          const response = Object.values(items.data) as Item[];
          const result = response.find((item) => item.id === id);

          resolve(result);
        }, 500);
      }),
  });
};
