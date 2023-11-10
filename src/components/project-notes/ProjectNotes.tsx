import { useState } from "react";
import { useProjects } from "../../hooks/useProjects";
import { useGetNotesQuery } from "../../store/api/api";
import { useCreateNoteMutation } from "../../store/api/notes.api";
import CreateNote from "../create-note/CreateNote";
import Loader from "../loader/Loader";
import NoteCard from "../note-card/NoteCard";
import styles from "./ProjectNotes.module.css";

const ProjectNotes = () => {
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const { projects } = useProjects();
  const { data, isLoading, isFetching } = useGetNotesQuery(projects[0]);
  const [createNote] = useCreateNoteMutation();
  const [context, setContext] = useState(false);
  const [selectedNote, setSelectedNote] = useState(0);
  const handleModalOpen = () => {
    setModalIsOpen(true);
  };
  const handleModalClose = () => {
    setModalIsOpen(false);
  };
  return (
    <div className={styles.container}>
      <button type="button" className={styles.create} onClick={handleModalOpen}>
        + Add New Note
      </button>
      {isFetching ? (
        <Loader style={{ width: "150px", background: "transparent" }} />
      ) : isLoading ? (
        <Loader style={{ width: "150px", background: "transparent" }} />
      ) : data ? (
        <div className={styles.notes}>
          {modalIsOpen && <CreateNote handleModal={handleModalClose} />}
          {data.map((note) => (
            <div className={styles.card}>
              {" "}
              <NoteCard
                body={note.body}
                title={note.title}
                id={note.id}
                context={context}
                selectedNote={selectedNote}
                setContext={setContext}
                setSelectedNote={setSelectedNote}
              />
            </div>
          ))}
        </div>
      ) : null}
    </div>
  );
};

export default ProjectNotes;
