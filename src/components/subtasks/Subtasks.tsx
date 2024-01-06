import { useState } from "react";
import { useActions } from "../../hooks/useActions";
import { useProjects } from "../../hooks/useProjects";
import { useTask } from "../../hooks/useTask";
import {
  useGetSubTasksByIdQuery,
  useUpdateSubtaskMutation,
} from "../../store/api/subtask.api";
import CreateSubtask from "../create-subtask/CreateSubtask";
import Loader from "../loader/Loader";
import styles from "./Subtasks.module.css";
import {
  LuCircle,
  LuCheckCircle2,
  LuChevronDown,
  LuChevronUp,
} from "react-icons/lu";
import { ISubtask, ISubtaskData } from "../../types/task.types";
import { motion } from "framer-motion";

const defaultValue: ISubtaskData = {
  name: "",
  description: "",
  done: false,
};

const Subtasks = () => {
  const { task } = useTask();
  const { setTask, setTaskToZero } = useActions();
  const { setTab } = useActions();
  const { projects } = useProjects();
  const [subtask, setSubtask] = useState<ISubtaskData>(defaultValue);
  const [subtaskId, setSubtaskId] = useState(0);

  const { data, isLoading, isFetching } = useGetSubTasksByIdQuery(task[0]);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [updateSubtask] = useUpdateSubtaskMutation();

  const handleModalOpen = () => {
    setModalIsOpen(true);
  };
  const handleModalClose = () => {
    setModalIsOpen(false);
  };
  const handleCheckToggle = (subtaskData: ISubtask) => {
    setSubtaskId(subtaskData.id);
    setSubtask((prevState) => ({
      ...prevState,
      name: subtaskData.name,
      description: subtaskData.description,
      done: subtaskData.done ? false : true,
    }));
    // setSubtask({
    //   ...subtask,
    //   description: subtaskData.description,
    // });
    // setSubtask({
    //   ...subtask,

    //   done: subtaskData.done ? false : true,
    // });

    console.log(subtask);
    updateSubtask([
      {
        name: subtaskData.name,
        description: subtaskData.description,
        done: subtaskData.done ? false : true,
      },
      subtaskData.id,
      task[0],
    ]);
  };
  return (
    <div className={styles.container} >
      <motion.div animate={{ y: [0, -5, 0] }} transition={{ delay: 1 }}>
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={() => setTab("Tasks")}
          className={styles.back}
        >
          Back
        </motion.button>
      </motion.div>
      <motion.div animate={{ y: [0, -5, 0] }} transition={{ delay: 1 }}>
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          type="button"
          onClick={() => handleModalOpen()}
          className={styles.add}
        >
          + Add New Subtask
        </motion.button>
      </motion.div>
      {modalIsOpen && <CreateSubtask handleModal={handleModalClose} />}

      {isFetching ? (
        <Loader style={{ width: "150px", background: "transparent" }} />
      ) : isLoading ? (
        <Loader style={{ width: "150px", background: "transparent" }} />
      ) : data ? (
        <div className={styles.subtasks}>
          <motion.div
            initial={{ scale: 0.95 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.5 }}
            className={styles.subtasksInner}
          >
            <div className={styles.title}>
              {data?.length > 0 && <span>Subtasks</span>}
            </div>
            {data.map((subtask) => (
              <motion.div
                initial={{ y: -10 }}
                animate={{ y: 0 }}
                transition={{ duration: 0.5, delay: 0.5 }}
              >
                <motion.div
                  whileHover={{ scale: 1.1 }}
                  // whileTap={{ scale: 0.9 }}
                  className={styles.subtask}
                >
                  <div className={styles.info}>
                    <span>{subtask.name}</span>
                    <span>{subtask.description}</span>
                  </div>
                  <div className={styles.check}>
                    {subtask.done ? (
                      <div onClick={() => handleCheckToggle(subtask)}>
                        <LuCheckCircle2 color="#34c59f" />
                      </div>
                    ) : (
                      <div onClick={() => handleCheckToggle(subtask)}>
                        <LuCircle />
                      </div>
                    )}
                    <div className={styles.chevron}>
                      <LuChevronDown />
                    </div>
                  </div>
                </motion.div>
              </motion.div>
            ))}
          </motion.div>
          <div className={styles.comments}>
            <div className={styles.commentsTitle}>
              <span>Comments</span>
            </div>
          </div>
        </div>
      ) : (
        <div>Nope</div>
      )}
    </div>
  );
};

export default Subtasks;
