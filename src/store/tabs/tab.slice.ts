import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IProject } from "../../types/project.types";

const initialState: string[] = ["Overview"];

export const taskSlice = createSlice({
  name: "tab",
  initialState,
  reducers: {
    setTab: (state, { payload: tab }: PayloadAction<string>) => {
      state[0] = tab;
    },
  },
});
export const { actions, reducer } = taskSlice;
