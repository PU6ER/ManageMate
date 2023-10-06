import ProjectsSection from "../projects-section/ProjectsSection";
import styles from "./SidebarSection.module.css";
const SidebarSection = () => {
  return (
    <div className={styles.section}>
      <ProjectsSection />
    </div>
  );
};

export default SidebarSection;
