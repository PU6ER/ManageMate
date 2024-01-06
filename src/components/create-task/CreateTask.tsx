import { useState } from "react";
import { useCreateTaskMutation } from "../../store/api/task.api";
import { ITaskData } from "../../types/task.types";
import { AiOutlineClose } from "react-icons/ai";
import styles from "./CreateTask.module.css";
import { useProjects } from "../../hooks/useProjects";
import Select from "react-select";
const defaultValue: ITaskData = {
  name: "",
  description: "",
  status: "",
  group: "",
};

interface TaskProps {
  handleModal: () => void;
  sectionStatus: string;
}
const options = [
  {
    value: "dev",
    label: "Development",
  },
  {
    value: "ux",
    label: "UX stages",
  },
  {
    value: "design",
    label: "Design",
  },
  {
    value: "brand",
    label: "Branding",
  },
];

export default function CreateTask({ handleModal, sectionStatus }: TaskProps) {
  const [task, setTask] = useState<ITaskData>(defaultValue);
  const { projects } = useProjects();
  const [createTask] = useCreateTaskMutation();
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    createTask([task, projects[0]]).then(() => {
      setTask(defaultValue);
    });
    setTimeout(() => handleModal(), 1000);
  };
  return (
    <div>
      <form onSubmit={handleSubmit} className={styles.container}>
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <span style={{ fontWeight: "bold" }}>Add new task: </span>
          <button style={{ backgroundColor: "#ffff" }} onClick={handleModal}>
            <AiOutlineClose />
          </button>
          {/* <button style={{ marginBottom: "7px" }} onClick={handleModal}>
            Close
          </button> */}
        </div>
        <label>
          <input
            type="text"
            placeholder="Name"
            value={task.name}
            onChange={(e) => setTask({ ...task, name: e.target.value })}
          />
        </label>
        <label>
          <input
            type="text"
            placeholder="Description"
            value={task.description}
            onChange={(e) => setTask({ ...task, description: e.target.value })}
          />
        </label>
        <Select
          options={options}
          onChange={(e) => e && setTask({ ...task, group: e?.label})}
        />
        {/* <label>
          <input
            type="text"
            placeholder="Status"
            value={task.status}
            onChange={(e) => setTask({ ...task, status: e.target.value })}
          />
        </label> */}
        <button
          type="submit"
          onClick={() => setTask({ ...task, status: sectionStatus })}
          className={styles.createBtn}
        >
          Create
        </button>
      </form>
    </div>
  );
}
