import * as React from "react";

import TaskGroup from "../task-group/TaskGroup";
import styles from "./Tasks.module.css";
import { useState } from "react";
import CreateTask from "../create-task/CreateTask";

const TaskSections = ["To Do", "In Progress", "Need Review", "Done"];

const TasksList = () => {
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [selectedSection, setSelectedSection] = useState("");
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
            <h2>{section}</h2>
            <button
              onClick={() => handleModalOpen(section)}
              style={{ marginBottom: "10px" }}
            >
              Add new Task
            </button>
            {modalIsOpen && section == selectedSection && (
              <CreateTask
                handleModal={handleModalClose}
                sectionStatus={selectedSection}
              />
            )}
            <TaskGroup status={section} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default TasksList;
