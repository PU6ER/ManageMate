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

const defaultValue: ISubtaskData = {
  name: "",
  description: "",
  done: false,
};

const Subtasks = () => {
  const { task } = useTask();
  const { setTask, setTaskToZero } = useActions();
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
    <div className={styles.container}>
      <button onClick={() => setTaskToZero()} className={styles.back}>
        Back
      </button>
      <button
        type="button"
        onClick={() => handleModalOpen()}
        className={styles.add}
      >
        + Add New Subtask
      </button>
      {modalIsOpen && <CreateSubtask handleModal={handleModalClose} />}

      {isFetching ? (
        <Loader style={{ width: "150px", background: "transparent" }} />
      ) : isLoading ? (
        <Loader style={{ width: "150px", background: "transparent" }} />
      ) : data ? (
        <div className={styles.subtasks}>
          <div className={styles.subtasksInner}>
            <div className={styles.title}>
              {data?.length > 0 && <span>Subtasks</span>}
            </div>
            {data.map((subtask) => (
              <div className={styles.subtask}>
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
              </div>
            ))}
          </div>
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
