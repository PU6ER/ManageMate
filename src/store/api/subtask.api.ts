import {
  ISubtask,
  ISubtaskData,
  ITask,
  ITaskData,
} from "./../../types/task.types";
import { api } from "./api";

export const subtaskApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getSubTasksById: builder.query<ISubtask[], number>({
      query: (taskId) => `/tasks/${taskId}/subtasks`,

      providesTags: (taskId) => [
        {
          type: "Subtask",
          taskId: `${taskId}`,
        },
      ],
    }),
    createSubtask: builder.mutation<null, [ISubtaskData, number, number]>({
      query: ([subtask, projectId, taskId]) => ({
        body: subtask,
        url: `/tasks/${taskId}/subtasks/`,
        method: "POST",
      }),
      invalidatesTags: () => [
        {
          type: "Subtask",
        },
      ],
    }),
    updateSubtask: builder.mutation<null, [ISubtaskData, number, number]>({
      query: ([subtask, subtaskId, taskId]) => ({
        body: { ...subtask, taskId: `${taskId}` },
        url: `/subtasks/${subtaskId}`,
        method: "PATCH",
      }),
      invalidatesTags: (subtaskId) => [
        {
          type: "Subtask",
          //   id: `${subtaskId}`
        },
      ],
    }),
  }),
});

export const {
  useGetSubTasksByIdQuery,
  useCreateSubtaskMutation,
  useUpdateSubtaskMutation,
} = subtaskApi;
