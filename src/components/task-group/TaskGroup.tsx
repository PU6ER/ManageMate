import { useGetTasksQuery } from "../../store/api/api";
import {
  useDeleteTaskMutation,
  useUpdateTaskStatusMutation,
} from "../../store/api/task.api";
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
import { motion } from "framer-motion";
import { DragDropContext, Draggable } from "react-beautiful-dnd";
interface ITaskItem {
  status: string;
  context: boolean;
  setContext: React.Dispatch<React.SetStateAction<boolean>>;
  selectedTask: number;
  setSelectedTask: React.Dispatch<React.SetStateAction<number>>;
  provided: any;
  innerRef: any;
}

const TaskGroup = ({
  status,
  context,
  setContext,
  selectedTask,
  setSelectedTask,
  provided,
  innerRef,
}: ITaskItem) => {
  const [deleteTask] = useDeleteTaskMutation();
  const { setTaskToUpdate, setTab } = useActions();
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
  const handleDrag = () => {};
  return (
    <div {...provided.dropableProps} ref={innerRef} className={styles.drag}>
      {/* <DragDropContext onDragEnd={handleDrag}> */}
      {provided.placeholder}
      {data
        ?.filter((task) => task.status == status)
        .map((task, index) => (
          <Draggable
            key={task.name}
            // index={Math.abs(task.id - 2)}
            index={index}
            draggableId={`${task.id} + ${task.name}`}
          >
            {(provided, snapshot) => (
              <div
                // initial={{ y: -10 }}
                // animate={{ y: 0 }}
                // transition={{ duration: 0.5, delay: 0.5 }}
                className={styles.container}
                ref={provided.innerRef}
                {...provided.draggableProps}
                {...provided.dragHandleProps}
                onMouseEnter={() => setTaskToUpdate(task.id)}
              >
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
              <div onClick={() => setTab("Subtasks") }>
                  <SubtaskButton taskId={task.id} />
                  </div>
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
            )}
          </Draggable>
        ))}
      {/* </DragDropContext> */}
    </div>
  );
};

export default TaskGroup;
