import { ITask } from "./../../types/task.types";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const API_URL = "http://localhost:4200/tasks";

export const api = createApi({
  reducerPath: "api",
  tagTypes: ["Task"],
  baseQuery: fetchBaseQuery({
    baseUrl: API_URL,
  }),
  endpoints: (builder) => ({
    getTasks: builder.query<ITask[], null>({
      query: () => `/?_sort=id&_order=desc`,
      providesTags: (result, error) => [
        {
          type: "Task",
        },
      ],
    }),
  }),
});

export const { useGetTasksQuery } = api;
