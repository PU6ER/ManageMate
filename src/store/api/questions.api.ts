import {
    INote,
    INoteData,
    IProject,
    IProjectData,
    IQuestionData,
  } from "./../../types/project.types";
  import { ITask, ITaskData } from "./../../types/task.types";
  import { api } from "./api";
  
  export const questionsApi = api.injectEndpoints({
    endpoints: (builder) => ({
      createQuestion: builder.mutation<null, [IQuestionData, number]>({
        query: ([question, id]) => ({
          body: question,
          url: `/projects/${id}/questions/`,
          method: "POST",
        }),
        invalidatesTags: () => [
          {
            type: "Question",
          },
        ],
      }),
      deleteQuestion: builder.mutation<null, number>({
        query: (id) => ({
          url: `/questions/${id}`,
          method: "DELETE",
        }),
        invalidatesTags: () => [
          {
            type: "Question",
          },
        ],
      }),
    }),
  });
  
  export const { useCreateQuestionMutation, useDeleteQuestionMutation} = questionsApi;
  