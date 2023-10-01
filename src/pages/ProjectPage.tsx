import Sidebar from "../components/sidebar/Sidebar";
import TasksList from "../components/tasks-list/Tasks";
import styles from "./ProjectPage.module.css"

const ProjectPage = () => {
  return (
    <div className={styles.container}>
      
      <TasksList />
    </div>
  );
};

export default ProjectPage;
