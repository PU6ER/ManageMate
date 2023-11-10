import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IProject } from "../../types/project.types";

const initialState: string[] = [];

export const sidebarSlice = createSlice({
  name: "sidebar",
  initialState,
  reducers: {
    setSidebarSection: (state, { payload: name }: PayloadAction<string>) => {
      state[0] = name;
    },
    setStateToInitial: (state, { payload: name }: PayloadAction<string>) => {
      state = state.filter((item) => item === name);
    },
  },
});
export const { actions, reducer } = sidebarSlice;
