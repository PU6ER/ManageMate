import { ITask } from "./task.types";
export interface IProject {
  name: string;
  overview: string;

  id: number;
}
// export interface IProject{
//     name: string,
//     overview: string,
//     image: string,
//     tasks: ITask[],
//     notes: INote[],
//     questions: IQuestion[],
//     members: IMember[],
//     id: number
// }
export interface INote {
  title: string;
  body: string;
  id: number;
}

export interface IQuestion {
  title: string;
  body: string;
  id: number;
}
export interface IMember {
  name: string;
}
export interface IProjectData extends Omit<IProject, "id"> {}
export interface INoteData extends Omit<INote, "id"> {}
export interface IQuestionData extends Omit<IQuestion, "id"> {}
