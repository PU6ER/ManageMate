import { useSidebar } from "../../hooks/useSidebar";
import ProjectsSection from "../projects-section/ProjectsSection";
import styles from "./SidebarSection.module.css";
const SidebarSection = () => {
  const { sidebar } = useSidebar();
  return (
    <>
      {sidebar[0] !== "timer" && (
        <div className={styles.section}>
          {sidebar.length > 0 && sidebar[0] === "projects" && (
            <ProjectsSection />
          )}
        </div>
      )}
    </>
  );
};

export default SidebarSection;
