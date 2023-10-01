import { useGetTasksQuery } from "../../store/api/api";
import { useDeleteTaskMutation } from "../../store/api/task.api";
import { ITask } from "../../types/task.types";
import styles from "./TaskGroup.module.css";
import { ContextMenu, MenuItem, ContextMenuTrigger } from "react-contextmenu";
import { BsThreeDotsVertical } from "react-icons/bs";
import { AiOutlineClose } from "react-icons/ai";
import { useState } from "react";
interface ITaskItem {
  status: string;
  context: boolean;
  setContext: React.Dispatch<React.SetStateAction<boolean>>;
  selectedTask: number;
  setSelectedTask: React.Dispatch<React.SetStateAction<number>>;
}

const TaskGroup = ({ status, context, setContext, selectedTask, setSelectedTask }: ITaskItem) => {
  const [deleteTask] = useDeleteTaskMutation();
  const { isLoading, data } = useGetTasksQuery(null);

  const handleContextOpen = (taskId: number) => {
    // if(context && selectedTask !== taskId) setContext(true)
    setContext(true);
    setSelectedTask(taskId);
  };
  const handleContextClose = () => {
    // if(context && selectedTask !== taskId) setContext(true)
    setContext(false);
  };
  return (
    <>
      {data
        ?.filter((task) => task.status == status)
        .map((task) => (
          <div className={styles.container}>
            <div className={styles.header}>
              <h4>{task.name}</h4>

              <button
                className={styles.contextBtn}
                onClick={() => handleContextOpen(task.id)}
              >
                <BsThreeDotsVertical color="black" />
              </button>
            </div>
            {/* <button onClick={() => deleteTask(task.id)}>Delete</button> */}
            {context && task.id === selectedTask && (
              <div className={styles.context}>
                <div className={styles.contextClose}>
                  <button
                    style={{ backgroundColor: "#fff" }}
                    onClick={handleContextClose}
                  >
                    <AiOutlineClose />
                  </button>
                </div>
                <div className={styles.contextItems}>
                  <button
                    className={styles.btn}
                    onClick={() => deleteTask(task.id)}
                  >
                    Delete
                  </button>
                </div>
              </div>
            )}
            {/* <span>{task.name}</span> */}
            <span className={styles.textDescr}>{task.description}</span>
          </div>
        ))}
    </>
  );
};

export default TaskGroup;
