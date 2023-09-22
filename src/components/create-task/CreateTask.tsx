import { useState } from "react";
import { useCreateTaskMutation } from "../../store/api/task.api";
import { ITaskData } from "../../types/task.types";

const defaultValue: ITaskData = {
  name: "",
  description: "",
  status: "",
};

interface TaskProps {
  handleModal: () => void;
  sectionStatus: string;
}

export default function CreateTask({ handleModal, sectionStatus }: TaskProps) {
  const [task, setTask] = useState<ITaskData>(defaultValue);

  const [createTask] = useCreateTaskMutation();
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    createTask(task).then(() => {
      setTask(defaultValue);
    });
    setTimeout(() => handleModal(), 1000);
  };
  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <p>Add new task: </p>
          <button style={{ marginBottom: "7px" }} onClick={handleModal}>
            Close
          </button>
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
        {/* <label>
          <input
            type="text"
            placeholder="Status"
            value={task.status}
            onChange={(e) => setTask({ ...task, status: e.target.value })}
          />
        </label> */}
        <button type="submit" onClick={() => setTask({ ...task, status: sectionStatus })}>Create</button>
      </form>
    </div>
  );
}
