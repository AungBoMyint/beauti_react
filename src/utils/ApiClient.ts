import { useMutation, useQuery } from "@tanstack/react-query";

interface GetProps<T> {
  fn: () => Promise<T>;
  key: string[];
  initialData?: () => T;
}
interface PostProps<T> {
  fn: (variables: T) => Promise<T>;
  key: string[];
  onSuccess: (
    data: T,
    variables: T,
    context: unknown
  ) => Promise<unknown> | unknown;
}

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
  post({ fn, key, onSuccess }: PostProps<T>) {
    return useMutation<T, Error, T>({
      mutationKey: key,
      mutationFn: fn,
      onSuccess: onSuccess,
    });
  }
}

export default ApiClient;
