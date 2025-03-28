import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";

const API_BASE_URL = "http://localhost:8000/api";

// Generic GET request hook
export const useGetRequest = <T>(key: string, endpoint: string) => {
  return useQuery<T>({
    queryKey: [key],
    queryFn: async () => {
      const res = await fetch(`${API_BASE_URL}/${endpoint}`);
      if (!res.ok) throw new Error("Failed to fetch data");
      return res.json();
    },
  });
};

// Generic POST request hook with success and error handlers passed directly
export const usePostRequest = <T, U>(
  endpoint: string,
  keyToInvalidate?: string
) => {
  const queryClient = useQueryClient();

  return useMutation<T, Error, U>({
    mutationFn: async (data: U) => {
      const res = await fetch(`${API_BASE_URL}/${endpoint}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (!res.ok) {
        const errorData = await res.json();

        throw new Error(`Failed: ${JSON.stringify(errorData.msg)}`);
      }

      return res.json();
    },
    onSuccess: (data, variables, context) => {
      if (keyToInvalidate) {
        queryClient.invalidateQueries({ queryKey: [keyToInvalidate] });
      }
      // Ensure context exists and contains onSuccess
      if (context && typeof context === "object" && "onSuccess" in context) {
        (context as { onSuccess?: (data: T) => void }).onSuccess?.(data);
      }
    },
    onError: (error, variables, context) => {
      // Ensure context exists and contains onError
      if (context && typeof context === "object" && "onError" in context) {
        (context as { onError?: (error: Error) => void }).onError?.(error);
      }
    },
  });
};
