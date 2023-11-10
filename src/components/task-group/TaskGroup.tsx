import { useGetTasksQuery } from "../../store/api/api";
import { useDeleteTaskMutation } from "../../store/api/task.api";
import { ITask } from "../../types/task.types";
import styles from "./TaskGroup.module.css";
import { ContextMenu, MenuItem, ContextMenuTrigger } from "react-contextmenu";
import { BsThreeDotsVertical } from "react-icons/bs";
import { AiOutlineClose } from "react-icons/ai";
import {
  LuEye,
  LuMessageCircle,
  LuPaperclip,
  LuListChecks,
} from "react-icons/lu";
import { useState } from "react";
import { useProjects } from "../../hooks/useProjects";
import { useActions } from "../../hooks/useActions";
import { useTask } from "../../hooks/useTask";
import { useGetSubTasksByIdQuery } from "../../store/api/subtask.api";
import SubtaskButton from "../subtask-button/SubtaskButton";
interface ITaskItem {
  status: string;
  context: boolean;
  setContext: React.Dispatch<React.SetStateAction<boolean>>;
  selectedTask: number;
  setSelectedTask: React.Dispatch<React.SetStateAction<number>>;
}

const TaskGroup = ({
  status,
  context,
  setContext,
  selectedTask,
  setSelectedTask,
}: ITaskItem) => {
  const [deleteTask] = useDeleteTaskMutation();
  const { setTask } = useActions();
  const { projects } = useProjects();
  const { isLoading, data } = useGetTasksQuery(projects[0]);
  const { task: taskSlice } = useTask();

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
              <div
                className={
                  task.group === "UX stages"
                    ? styles.ux
                    : task.group === "Branding"
                    ? styles.branding
                    : task.group === "Development"
                    ? styles.dev
                    : styles.taskGroup
                }
              >
                <span>{task.group}</span>{" "}
              </div>

              <button
                className={styles.contextBtn}
                onClick={() => handleContextOpen(task.id)}
              >
                <BsThreeDotsVertical color="black" size="1.5em" />
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
                    <AiOutlineClose size="1.5em" />
                  </button>
                </div>
                <div className={styles.contextItems}>
                  <button
                    className={styles.btn}
                    onClick={() => {
                      deleteTask(task.id);
                      setContext(false);
                    }}
                  >
                    Delete
                  </button>
                </div>
              </div>
            )}
            {/* <span>{task.name}</span> */}
            <div className={styles.content}>
              <h4>{task.name}</h4>
              <span className={styles.textDescr}>{task.description}</span>
              {/* <button
                className={styles.subTasks}
                onClick={() => setTask(task.id)}
              >
                <LuListChecks size="1.5em" />
                <span>0/8</span>
              </button> */}
              <SubtaskButton taskId={task.id} />
            </div>
            <div className={styles.footerWrapper}>
              <div className={styles.footer}>
                <div>Memebers</div>
                <div className={styles.footerIcons}>
                  <div className={styles.footerIcon}>
                    <LuEye />
                    <span>2</span>
                  </div>
                  <div className={styles.footerIcon}>
                    <LuMessageCircle />
                    <span>3</span>
                  </div>
                  <div className={styles.footerIcon}>
                    <LuPaperclip />
                    <span>1</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
    </>
  );
};

export default TaskGroup;
