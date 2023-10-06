import { ITask } from './task.types';
export interface IProject{
    name: string,
    overview: string,
    tasks: ITask[],
    notes: INote[],
    questions: IQuestion[],
    members: IMember[],
    id: number
}
export interface INote{
    title: string,
    body: string
}
export interface IQuestion{
    title: string,
    body: string
}
export interface IMember{
    name: string
}
export interface IProjectData extends Omit<IProject, 'id'>{}