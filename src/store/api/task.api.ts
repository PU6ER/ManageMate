import { ITask, ITaskData } from "./../../types/task.types";
import { api } from "./api";

export const taskApi = api.injectEndpoints({
  endpoints: (builder) => ({
    createTask: builder.mutation<null, ITaskData>({
      query: (task) => ({
        body: task,
        url: "/",
        method: "POST",
      }),
      invalidatesTags: () => [
        {
          type: "Task",
        },
      ],
    }),
    deleteTask: builder.mutation<null, number>({
      query: (id) => ({
        url: `/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: () => [
        {
          type: "Task",
        },
      ],
    }),
    getTasksByStatus: builder.query<ITask[], string>({
      query: (status) => `/status=${status}`,
      providesTags: () => [
        {
          type: "Task",
        },
      ],
    }),
  }),
});

export const { useCreateTaskMutation, useDeleteTaskMutation, useGetTasksByStatusQuery } = taskApi;
