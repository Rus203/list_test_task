import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import type { TaskType } from "../types";

// todo: move it to env file
const API = "http://localhost:3000/api/list";

export function useTasks({
  page = 1,
  limit = 20,
  searchText = "",
}: {
  page?: number;
  limit?: number;
  searchText?: string;
}) {
  return useQuery<{
    data: TaskType[];
    metadata: { page: number; limit: number };
  }>({
    queryKey: ["tasks", page, limit, searchText],
    queryFn: async () => {
      const res = await axios.get(
        `${API}?page=${page}&limit=${limit}&searchText=${searchText}`
      );
      return res.data;
    },
  });
}

export function useCreateTask() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (body: {
      isChecked?: boolean;
      sort?: number;
      content: string;
    }) => axios.post(API, body),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["tasks"] }),
  });
}

export function useUpdateTask() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: {
      taskId: string;
      isChecked?: boolean;
      sort?: number;
      content: string;
    }) => {
      const { taskId, ...body } = data;
      return axios.patch(`${API}/${taskId}`, body);
    },
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["tasks"] }),
  });
}

export function useDeleteTask() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => axios.delete(`${API}/${id}`),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["tasks"] }),
  });
}
