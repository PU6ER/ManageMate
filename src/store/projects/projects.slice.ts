import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IProject } from "../../types/project.types";

const initialState: number[] = [];

export const projectsSlice = createSlice({
  name: "projects",
  initialState,
  reducers: {
    setProjectId: (state, { payload: id }: PayloadAction<number>) => {
      state[0] = id;
    },
    setProjectToZero: (state) => {
      state.pop();
    },
  },
});
export const { actions, reducer } = projectsSlice;
