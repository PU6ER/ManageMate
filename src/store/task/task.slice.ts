import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IProject } from "../../types/project.types";

const initialState: number[] = [];

export const taskSlice = createSlice({
  name: "task",
  initialState,
  reducers: {
    setTask: (state, { payload: id }: PayloadAction<number>) => {
      state[0] = id;
    },
    setTaskToZero: (state) => {
      state.pop();
    },
  },
});
export const { actions, reducer } = taskSlice;
