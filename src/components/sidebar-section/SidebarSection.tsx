import { useSidebar } from "../../hooks/useSidebar";
import ProjectsSection from "../projects-section/ProjectsSection";
import styles from "./SidebarSection.module.css";
import { motion } from "framer-motion";
const SidebarSection = () => {
  const { sidebar } = useSidebar();
  return (
    <>
      {sidebar[0] !== "timer" && (
        <motion.div
          initial={{ x: -20 }}
          animate={{ x: 0 }}
          transition={{ duration: 0.3 }}
          className={styles.section}
          hidden={!sidebar[0]}
        >
          {sidebar.length > 0 && sidebar[0] === "projects" && (
            <ProjectsSection />
          )}
        </motion.div>
      )}
    </>
  );
};

export default SidebarSection;
