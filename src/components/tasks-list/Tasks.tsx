import * as React from "react";

import { useGetTasksQuery } from "../../store/api/api";
import TaskGroup from "../task-group/TaskGroup";
import styles from "./Tasks.module.css";
import Modal from "react-modal";
import { useState } from "react";
import CreateTask from "../create-task/CreateTask";

const TaskSections = ["To Do", "In Progress", "Need Review", "Done"];

const TasksList = () => {
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const handleModal = () => {
    setModalIsOpen((prevState) => !prevState);
  };
  return (
    <div className={styles.container}>
      <div className={styles.group}>
        {TaskSections.map((section) => (
          <div>
            <h2>{section}</h2>
            <button onClick={handleModal} style={{ marginBottom: "10px" }}>
              Add new Task
            </button>
            <Modal
              isOpen={modalIsOpen}
              contentElement={() => <CreateTask handleModal={handleModal} />}
              //   className={styles.modal}
              style={{
                content: {
                  backgroundColor: "#0000",
                  position: "absolute",
                  left: "100px",
                },
                overlay: {
                  position: "fixed",
                },
              }}
              //   overlayClassName={styles.overlay}
            ></Modal>
            <TaskGroup status={section} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default TasksList;
