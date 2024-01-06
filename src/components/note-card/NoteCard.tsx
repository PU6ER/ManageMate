import { AiOutlineClose } from "react-icons/ai";
import { BsThreeDotsVertical } from "react-icons/bs";
import { useDeleteNoteMutation } from "../../store/api/notes.api";
import styles from "./NoteCard.module.css";
interface INoteCardProps {
  body: string;
  title: string;
  id: number;
  context: boolean;
  setContext: React.Dispatch<React.SetStateAction<boolean>>;
  selectedNote: number;
  setSelectedNote: React.Dispatch<React.SetStateAction<number>>;
}

const NoteCard = ({
  body,
  title,
  id,
  context,
  setContext,
  selectedNote,
  setSelectedNote,
}: INoteCardProps) => {
  const [deleteNote] = useDeleteNoteMutation();
  const handleContextOpen = (noteId: number) => {
    setContext(true);
    setSelectedNote(noteId);
  };
  const handleContextClose = () => {
    setContext(false);
  };
  return (
    <div className={styles.container}>
      <div>
        <h2>{title}</h2>
        <button
          className={styles.contextBtn}
          onClick={() => handleContextOpen(id)}
        >
          <BsThreeDotsVertical color="black" />
        </button>
        {context && id === selectedNote && (
          <div className={styles.context}>
            <div className={styles.contextClose}>
              <button
                style={{ backgroundColor: "#fff" }}
                onClick={handleContextClose}
              >
                <AiOutlineClose />
              </button>
            </div>
            <div className={styles.contextItems}>
              <button className={styles.btn} onClick={() => deleteNote(id)}>
                Delete
              </button>
            </div>
          </div>
        )}
      </div>

      <hr />
      <span>{body}</span>
    </div>
  );
};

export default NoteCard;
