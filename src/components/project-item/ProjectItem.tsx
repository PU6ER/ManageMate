import { BsThreeDotsVertical } from "react-icons/bs";
import { IProject } from "../../types/project.types";
import styles from "./ProjectItem.module.css";

const ProjectItem = (project: IProject) => {
  return (
    <div className={styles.container}>
      <image>df</image>
      <span>{project.name}</span>
      <BsThreeDotsVertical />
    </div>
  );
};

export default ProjectItem;
