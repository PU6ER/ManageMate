import Project from "../components/project/Project";
import Sidebar from "../components/sidebar/Sidebar";
import TasksList from "../components/tasks-list/Tasks";
import styles from "./ProjectPage.module.css"

const ProjectPage = () => {
  return (
    <div className={styles.container}>
      
      <Project />
    </div>
  );
};

export default ProjectPage;
