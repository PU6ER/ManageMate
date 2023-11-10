import Project from "../components/project/Project";
import Sidebar from "../components/sidebar/Sidebar";
import TasksList from "../components/tasks-list/Tasks";
import { useProjects } from "../hooks/useProjects";
import { useSidebar } from "../hooks/useSidebar";
import styles from "./ProjectPage.module.css";

const ProjectPage = () => {
  const { sidebar } = useSidebar();
  const { projects } = useProjects();
  return (
    <div className={styles.container}>
      {projects.length > 0 && sidebar[0] === "projects" && <Project />}
    </div>
  );
};

export default ProjectPage;
