import { IProject } from "./../../types/project.types";
import { ITask } from "./../../types/task.types";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const API_URL = "http://localhost:4200";

export const api = createApi({
  reducerPath: "api",
  tagTypes: ["Task", "Project"],
  baseQuery: fetchBaseQuery({
    baseUrl: API_URL,
  }),
  endpoints: (builder) => ({
    getTasks: builder.query<ITask[], null>({
      query: () => `/tasks/?_sort=id&_order=desc`,
      providesTags: (result, error) => [
        {
          type: "Task",
        },
      ],
    }),
    getProjects: builder.query<IProject[], null>({
      query: () => `/projects/?_sort=id&_order=desc`,
      providesTags: () => [
        {
          type: "Project",
        },
      ],
    }),
  }),
});

export const { useGetTasksQuery, useGetProjectsQuery } = api;
