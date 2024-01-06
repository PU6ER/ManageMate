import { useProjects } from "../../hooks/useProjects";
import { useGetQuestionsQuery } from "../../store/api/api";
import Loader from "../loader/Loader";
import QuestionCard from "../question-card/QuestionCard";
import styles from "./ProjectQuestions.module.css";

const ProjectQuestions = () => {
  const { projects } = useProjects();
  const { data, isLoading } = useGetQuestionsQuery(projects[0]);

  return (
    <div className={styles.container}>
      {isLoading ? (
        <Loader style={{ width: "150px" }} />
      ) : data ? (
        data.map((question) => (
          <QuestionCard
            body={question.body}
            title={question.title}
            id={question.id}
          />
        ))
      ) : null}
    </div>
  );
};

export default ProjectQuestions;
