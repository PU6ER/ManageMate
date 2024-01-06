import { useState } from "react";
import { useCreateTaskMutation } from "../../store/api/task.api";
import { ITaskData } from "../../types/task.types";
import { AiOutlineClose } from "react-icons/ai";
import styles from "./CreateNote.module.css";
import { useProjects } from "../../hooks/useProjects";
import { useCreateNoteMutation } from "../../store/api/notes.api";
import { INoteData } from "../../types/project.types";
const defaultValue: INoteData = {
  title: "",
  body: "",
};

interface TaskProps {
  handleModal: () => void;
}

export default function CreateNote({ handleModal }: TaskProps) {
  const [note, setNote] = useState<INoteData>(defaultValue);
  const { projects } = useProjects();
  const [createNote] = useCreateNoteMutation();
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    createNote([note, projects[0]]).then(() => {
      setNote(defaultValue);
    });
    setTimeout(() => handleModal(), 1000);
  };
  return (
    <div>
      <form onSubmit={handleSubmit} className={styles.container}>
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <span style={{ fontWeight: "bold" }}>Create new note: </span>
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
            placeholder="Title"
            value={note.title}
            onChange={(e) => setNote({ ...note, title: e.target.value })}
          />
        </label>
        <label>
          <input
            type="text"
            placeholder="Body"
            value={note.body}
            onChange={(e) => setNote({ ...note, body: e.target.value })}
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
        <button type="submit" className={styles.createBtn}>
          Create
        </button>
      </form>
    </div>
  );
}
