import { LuListChecks } from "react-icons/lu";
import { useActions } from "../../hooks/useActions";
import { useProjects } from "../../hooks/useProjects";
import { useTask } from "../../hooks/useTask";
import { useGetSubTasksByIdQuery } from "../../store/api/subtask.api";
import { ITask, ITaskData } from "../../types/task.types";
import styles from "./SubtaskButton.module.css";

const SubtaskButton = ({ taskId }: { taskId: number }) => {
  const { setTask } = useActions();
  const { projects } = useProjects();
  const { task: taskSlice } = useTask();
  const {
    data: subtaskData,
    isLoading,
    isFetching,
  } = useGetSubTasksByIdQuery(taskId);
  const subtasksDone = subtaskData?.filter((data) => data.done === true).length;
  const subtasks = subtaskData?.length;

  return (
    <div>
      {isFetching ? (
        <button className={styles.subTasks} onClick={() => setTask(taskId)}>
          <LuListChecks size="1.5em" />
          <span>{`0/0`}</span>
        </button>
      ) : isLoading ? (
        <button className={styles.subTasks} onClick={() => setTask(taskId)}>
          <LuListChecks size="1.5em" />
          <span>{`0/0`}</span>
        </button>
      ) : (
        <button
          className={
            subtasksDone === subtasks && subtasksDone !== 0
              ? styles.subTasksDone
              : styles.subTasks
          }
          onClick={() => setTask(taskId)}

          // onMouseEnter={() => alert("aboba")}
        >
          <LuListChecks size="1.5em" />
          <span>{`${subtasksDone}/${subtasks}`}</span>
        </button>
      )}
    </div>
  );
};

export default SubtaskButton;
