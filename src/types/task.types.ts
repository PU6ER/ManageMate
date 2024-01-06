import { subtaskApi } from "./../store/api/subtask.api";
export interface ITask {
  id: number;
  name: string;
  description: string;
  status: string;
  group: string;
  // subtasks: ISubtask[]
}
export interface ISubtask {
  id: number;
  name: string;
  description: string;
  done: boolean;
}
export interface ITaskData extends Omit<ITask, "id"> {}
export interface ISubtaskData extends Omit<ISubtask, "id"> {}
