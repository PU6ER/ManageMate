import styles from "./QuestionCard.module.css";

const QuestionCard = ({
  body,
  title,
  id,
}: {
  body: string;
  title: string;
  id: number;
}) => {
  return (
    <div className={styles.container}>
      <h2>{title}</h2>
      <span>{body}</span>
    </div>
  );
};

export default QuestionCard;
