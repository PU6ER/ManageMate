import * as React from "react";

import TaskGroup from "../task-group/TaskGroup";
import styles from "./Tasks.module.css";
import { useEffect, useState } from "react";
import CreateTask from "../create-task/CreateTask";
import { useGetTasksByStatusQuery } from "../../store/api/task.api";
import { useGetTasksQuery } from "../../store/api/api";

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
  const [selectedTask, setSelectedTask] = useState(0);
  const { isLoading, data } = useGetTasksQuery(null);
  const handleModalOpen = (selectedSection: string) => {
    setSelectedSection(selectedSection);
    setModalIsOpen((prevState) => !prevState);
  };
  const handleModalClose = () => {
    setModalIsOpen((prevState) => !prevState);
  };

  return (
    <div className={styles.container}>
      <div className={styles.group}>
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
                {data?.filter((task) => task.status === section.name).length}
              </div>
            </div>
            <button
              type="button"
              onClick={() => handleModalOpen(section.name)}
              className={styles.delete}
            >
              + Add new Task
            </button>
            {modalIsOpen && section.name == selectedSection && (
              <CreateTask
                handleModal={handleModalClose}
                sectionStatus={selectedSection}
              />
            )}
            <TaskGroup
              status={section.name}
              context={context}
              setContext={setContext}
              selectedTask={selectedTask}
              setSelectedTask={setSelectedTask}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default TasksList;
