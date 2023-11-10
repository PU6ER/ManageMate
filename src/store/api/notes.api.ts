import {
  INote,
  INoteData,
  IProject,
  IProjectData,
} from "./../../types/project.types";
import { ITask, ITaskData } from "./../../types/task.types";
import { api } from "./api";

export const notesApi = api.injectEndpoints({
  endpoints: (builder) => ({
    createNote: builder.mutation<null, [INoteData, number]>({
      query: ([note, id]) => ({
        body: note,
        url: `/projects/${id}/notes/`,
        method: "POST",
      }),
      invalidatesTags: () => [
        {
          type: "Note",
        },
      ],
    }),
    deleteNote: builder.mutation<null, number>({
      query: (id) => ({
        url: `/notes/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: () => [
        {
          type: "Note",
        },
      ],
    }),
  }),
});

export const { useCreateNoteMutation, useDeleteNoteMutation} = notesApi;
