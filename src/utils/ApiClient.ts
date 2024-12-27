import axios from "axios";
import { useQuery, useQueryClient } from "@tanstack/react-query";

interface GetProps<T> {
  fn: () => Promise<T>;
  key: string[];
  initialData?: () => T;
}
const axiosInstance = axios.create({
  baseURL: "https:google.com",
});

class ApiClient<T> {
  endpoint: string;
  constructor(endpoint: string) {
    this.endpoint = endpoint;
  }
  get({ fn, key, initialData }: GetProps<T>) {
    return useQuery<T>({
      queryKey: key,
      queryFn: fn,
      initialData: initialData,
    });
  }
}

export default ApiClient;
