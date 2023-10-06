import { IProject, IProjectData } from "./../../types/project.types";
import { ITask, ITaskData } from "./../../types/task.types";
import { api } from "./api";

export const projectApi = api.injectEndpoints({
  endpoints: (builder) => ({
    createProject: builder.mutation<null, IProjectData>({
      query: (project) => ({
        body: project,
        url: "/projects",
        method: "POST",
      }),
      invalidatesTags: () => [
        {
          type: "Project",
        },
      ],
    }),
    getProjectById: builder.query<IProject, number>({
      query: (id) => `/projects/${id}`,
      providesTags: () => [
        {
          type: "Project",
        },
      ],
    }),
  }),
});

export const { useCreateProjectMutation, useGetProjectByIdQuery } = projectApi;
