import { IUser } from "../../types/user.types";
import { IProject, IProjectData } from "./../../types/project.types";
import { ITask, ITaskData } from "./../../types/task.types";
import { api } from "./api";

export const userApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getUserById: builder.query<IUser, number>({
      query: (id) => `/users/${id}`,
      providesTags: () => [
        {
          type: "User",
        },
      ],
    }),
    updateUser: builder.mutation<null, IUser>({
      query: (user) => ({
        body: user,
        url: `/users/${user.id}`,
        method: "PATCH",
      }),
      invalidatesTags: () => [
        {
          type: "User",
          //   id: `${subtaskId}`
        },
      ],
    }),
  }),
});

export const { useGetUserByIdQuery, useUpdateUserMutation } = userApi;
