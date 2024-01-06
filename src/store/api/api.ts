import { INote, IProject, IQuestion } from "./../../types/project.types";
import { ITask } from "./../../types/task.types";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { IUser } from "../../types/user.types";

const API_URL = "http://localhost:5555/api";

export const api = createApi({
  // reducerPath: "api",
  tagTypes: ["Task", "Project", "Note", "Question", "Subtask", "User"],
  baseQuery: fetchBaseQuery({
    baseUrl: API_URL,
  }),
  endpoints: (builder) => ({
    getTasks: builder.query<ITask[], number>({
      query: (id) => `/projects/${id}/tasks`,
      providesTags: (result, error, id) => [
        {
          type: "Task",
          id: `${id}`,
        },
      ],
    }),
    getProjects: builder.query<IProject[], null>({
      query: () => `/projects`,
      providesTags: () => [
        {
          type: "Project",
        },
      ],
    }),
    getNotes: builder.query<INote[], number>({
      query: (id) => `/projects/${id}/notes`,
      providesTags: () => [
        {
          type: "Note",
        },
      ],
    }),
    getQuestions: builder.query<IQuestion[], number>({
      query: (id) => `/projects/${id}/questions`,
      providesTags: () => [
        {
          type: "Question",
        },
      ],
    }),
    getUser: builder.query<IUser, [string, string]>({
      query: ([email, password]) => ({
        body: { email: email, password: password },
        url: `/users/`,
        method: "SEARCH",
      }),

      providesTags: () => [
        {
          type: "User",
        },
      ],
    }),
  }),
});

export const {
  useGetTasksQuery,
  useGetProjectsQuery,
  useGetNotesQuery,
  useGetQuestionsQuery,
  useGetUserQuery,
} = api;
