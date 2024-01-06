import { ISubtask, ITask, ITaskData } from "./../../types/task.types";
import { api } from "./api";

export const taskApi = api.injectEndpoints({
  endpoints: (builder) => ({
    createTask: builder.mutation<null, [ITaskData, number]>({
      query: ([task, id]) => ({
        body: task,
        url: `/projects/${id}/tasks`,
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
        url: `/tasks/${id}`,
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
    updateTaskStatus: builder.mutation<null, [string, number]>({
      query: ([status, id]) => ({
        url: `/tasks/${id}/${status}`,
        method: "PATCH",
      }),
      invalidatesTags: () => [{ type: "Task" }],
    }),
  }),
});

export const {
  useCreateTaskMutation,
  useDeleteTaskMutation,
  useGetTasksByStatusQuery,
  useUpdateTaskStatusMutation,
} = taskApi;
