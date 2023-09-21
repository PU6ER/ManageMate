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
}

export default function CreateTask({ handleModal }: TaskProps) {
  const [task, setTask] = useState<ITaskData>(defaultValue);

  const [createTask] = useCreateTaskMutation();
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    createTask(task).then(() => {
      setTask(defaultValue);
    });
  };
  return (
    <div>
      <form onSubmit={handleSubmit}>
        <p>Add new task: </p>
        <button onClick={handleModal}>Close</button>
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
        <label>
          <input
            type="text"
            placeholder="Status"
            value={task.status}
            onChange={(e) => setTask({ ...task, status: e.target.value })}
          />
        </label>
        <button type="submit">Create</button>
      </form>
    </div>
  );
}
