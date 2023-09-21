import { useGetTasksQuery } from "../../store/api/api";
import { useDeleteTaskMutation } from "../../store/api/task.api";
import { ITask } from "../../types/task.types";
import styles from "./TaskGroup.module.css";
interface ITaskItem {
  status: string;
}

const TaskGroup = ({ status }: ITaskItem) => {
  const [deleteTask] = useDeleteTaskMutation();
  const { isLoading, data } = useGetTasksQuery(null);
  return (
    <>
      {data
        ?.filter((task) => task.status == status)
        .map((task) => (
          <div className={styles.container}>
            <button onClick={() => deleteTask(task.id)}>Delete</button>
            <p>{task.status}</p>
            <span>{task.name}</span>
            <span>{task.description}</span>
          </div>
        ))}
    </>
  );
};

export default TaskGroup;
