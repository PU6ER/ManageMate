import { useActions } from "../../hooks/useActions";
import { useProjects } from "../../hooks/useProjects";
import { useGetProjectsQuery } from "../../store/api/api";
import styles from "./ProjectsSection.module.css";
import Loader from "../loader/Loader";
import ProjectItem from "../project-item/ProjectItem";
import { Emoji } from "emoji-picker-react";
import { BsThreeDotsVertical } from "react-icons/bs";

const ProjectsSection = () => {
  const { data, isLoading, isError, error, } = useGetProjectsQuery(null);
  const { setProjectId } = useActions();
  return (
    <div className={styles.container}>
      <div className={styles.title}>
        <span>Projects</span>
      </div>
      {isLoading ? (
        <Loader style={{}} />
      ) : (
        data?.map((project) => (
          <div
            className={styles.project}
            onClick={() => setProjectId(project.id)}
          >
            <div className={styles.projectLeft}>
              <div className={styles.emoji}>
                {/* <Emoji unified={project.image} size={15} /> */}
              </div>
              <span>{project.name}</span>
            </div>
            <div className={styles.projectRight}>
              <BsThreeDotsVertical color="black" size="1em" />
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default ProjectsSection;
