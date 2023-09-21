export interface ITask{
    id: number,
    name: string,
    description: string,
    status: string

}
export interface ITaskData extends Omit<ITask, 'id'>{}