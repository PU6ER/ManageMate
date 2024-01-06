import SidebarSection from "../sidebar-section/SidebarSection";
import styles from "./Sidebar.module.css";
import {
  LuPanelLeft,
  LuLayoutGrid,
  LuTimer,
  LuCalendarDays,
  LuBarChart3,
} from "react-icons/lu";
import { IconContext } from "react-icons/lib";
import Logo from "../../managematelogo.png";
import { motion } from "framer-motion";

import { useSidebar } from "../../hooks/useSidebar";
import { useActions } from "../../hooks/useActions";
import { Link } from "react-router-dom";

const Sidebar = () => {
  const { sidebar } = useSidebar();
  const {
    setSidebarSection,
    setProjectId,
    setStateToInitial,
    setProjectToZero,
  } = useActions();
  return (
    <motion.div
      initial={{ x: -300 }}
      animate={{ x: 0 }}
      transition={{ duration: 0.5 }}
      className={sidebar.length === 0 ? styles.sidebarDisabled : styles.sidebar}
    >
      <div className={styles.left}>
        <Link to={"/"}>
          <img src={Logo} alt="" onClick={() => setSidebarSection("")} />
        </Link>
        <div className={styles.icon}>
          <LuLayoutGrid size="1.5em" />
        </div>
        <div
          className={
            sidebar[0] === "projects" ? styles.iconActive : styles.icon
          }
        >
          <IconContext.Provider
            value={sidebar[0] === "projects" ? { color: "#365eff" } : {}}
          >
            <Link to={"/projects"}>
              <LuPanelLeft
                size="1.5em"
                onClick={() => setSidebarSection("projects")}
              />
            </Link>
          </IconContext.Provider>
        </div>
        <div
          className={sidebar[0] === "timer" ? styles.iconActive : styles.icon}
        >
          <Link to={"/timer"}>
            <IconContext.Provider
              value={sidebar[0] === "timer" ? { color: "#365eff" } : {}}
            >
              <LuTimer
                size="1.5em"
                onClick={() => {
                  setSidebarSection("timer");
                  setProjectToZero();
                }}
              />
            </IconContext.Provider>
          </Link>
        </div>
        <div className={styles.icon}>
          <LuCalendarDays size="1.5em" className={styles.icon} />
        </div>
        <div className={styles.icon}>
          <LuBarChart3 size="1.5em" className={styles.icon} />
        </div>
      </div>
      {sidebar.length > 0 && (
        <motion.div className={styles.right}>
          <SidebarSection />
        </motion.div>
      )}
    </motion.div>
  );
};

export default Sidebar;
