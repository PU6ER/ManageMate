import * as React from "react";

import TaskGroup from "../task-group/TaskGroup";
import styles from "./Tasks.module.css";
import { useEffect, useState } from "react";
import CreateTask from "../create-task/CreateTask";
import {
  useGetTasksByStatusQuery,
  useUpdateTaskStatusMutation,
} from "../../store/api/task.api";
import { useGetTasksQuery } from "../../store/api/api";
import { useProjects } from "../../hooks/useProjects";
import Loader from "../loader/Loader";
import { motion } from "framer-motion";
import {
  DragDropContext,
  Draggable,
  Droppable,
  DropResult,
  OnDragEndResponder,
} from "react-beautiful-dnd";
import { useTask } from "../../hooks/useTask";
import { AiOutlineConsoleSql } from "react-icons/ai";

const TaskSections = [
  { name: "To Do", color: "#ff8179" },
  { name: "In Progress", color: "#365eff" },
  { name: "Need Review", color: "#ffbd38" },
  { name: "Done", color: "#11bf95" },
];

const TasksList = () => {
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [selectedSection, setSelectedSection] = useState("");
  const [context, setContext] = useState(false);
  const { task } = useTask();
  const { projects } = useProjects();
  const [selectedTask, setSelectedTask] = useState(0);
  const { isLoading, data, isFetching } = useGetTasksQuery(projects[0]);
  const [updateTaskStatus] = useUpdateTaskStatusMutation();

  const handleModalOpen = (selectedSection: string) => {
    setSelectedSection(selectedSection);
    setModalIsOpen((prevState) => !prevState);
  };
  const handleModalClose = () => {
    setModalIsOpen((prevState) => !prevState);
  };
  const handleDrag = (result: DropResult) => {
    console.log(task[1]);
    console.log(result);
    if (result.destination?.droppableId) {
      if (result.source.droppableId !== result.destination.droppableId) {
        updateTaskStatus([result.destination.droppableId, task[1]]);
      }
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0.7, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
      className={styles.container}
    >
      {isFetching ? (
        <div className={styles.loader}>
          <Loader style={{ width: "500px" }} />
        </div>
      ) : isLoading ? (
        <div className={styles.loader}>
          <Loader style={{ width: "500px" }} />
        </div>
      ) : (
        <div className={styles.group}>
          <DragDropContext onDragEnd={handleDrag}>
            {TaskSections.map((section) => (
              <div>
                <div
                  style={{
                    marginBottom: "15px",
                    display: "flex",
                    alignItems: "center",
                    justifyItems: "center",
                  }}
                >
                  <div
                    className={styles.color}
                    style={{ backgroundColor: `${section.color}` }}
                  ></div>
                  <span
                    style={{
                      fontWeight: "bold",
                    }}
                  >
                    {section.name}
                  </span>
                  <div className={styles.taskCount}>
                    {
                      data?.filter((task) => task.status === section.name)
                        .length
                    }
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => handleModalOpen(section.name)}
                  className={styles.delete}
                >
                  + Add New Task
                </button>
                {modalIsOpen && section.name == selectedSection && (
                  <CreateTask
                    handleModal={handleModalClose}
                    sectionStatus={selectedSection}
                  />
                )}
                {/* <Draggable draggableId="1" index={1}> */}
                {/* {() => ( */}
                <Droppable
                  droppableId={section.name}
                  // className={styles.droppable}
                >
                  {(provided) => (
                    <TaskGroup
                      provided={provided}
                      innerRef={provided.innerRef}
                      status={section.name}
                      context={context}
                      setContext={setContext}
                      selectedTask={selectedTask}
                      setSelectedTask={setSelectedTask}
                    />
                  )}
                </Droppable>
                {/* )} */}
                {/* </Draggable> */}
              </div>
            ))}
          </DragDropContext>
        </div>
      )}
    </motion.div>
  );
};

export default TasksList;
