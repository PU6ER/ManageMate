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
import { useSidebar } from "../../hooks/useSidebar";
import { useActions } from "../../hooks/useActions";

const Sidebar = () => {
  const { sidebar } = useSidebar();
  const { setSidebarSection, setProjectId, setStateToInitial } = useActions();
  return (
    <div
      className={sidebar.length === 0 ? styles.sidebarDisabled : styles.sidebar}
    >
      <div className={styles.left}>
        <img src={Logo} alt="" onClick={() => setSidebarSection("abo")} />
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
            <LuPanelLeft
              size="1.5em"
              onClick={() => setSidebarSection("projects")}
            />
          </IconContext.Provider>
        </div>
        <div
          className={sidebar[0] === "timer" ? styles.iconActive : styles.icon}
        >
          <IconContext.Provider
            value={sidebar[0] === "timer" ? { color: "#365eff" } : {}}
          >
            <LuTimer size="1.5em" onClick={() => setSidebarSection("timer")} />
          </IconContext.Provider>
        </div>
        <div className={styles.icon}>
          <LuCalendarDays size="1.5em" className={styles.icon} />
        </div>
        <div className={styles.icon}>
          <LuBarChart3 size="1.5em" className={styles.icon} />
        </div>
      </div>

      <div className={styles.right}>
        <SidebarSection />
      </div>
    </div>
  );
};

export default Sidebar;
