import { ITask } from "./../../types/task.types";
import { createSlice } from "@reduxjs/toolkit";

const initialState: ITask[] = [];

export const tasks = createSlice({
  name: "tasks",
  initialState,
  reducers: {
    
  }
});
