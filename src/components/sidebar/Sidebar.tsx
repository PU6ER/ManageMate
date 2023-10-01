import SidebarSection from "../sidebar-section/SidebarSection";
import styles from "./Sidebar.module.css";

const Sidebar = () => {
  return (
    <div className={styles.sidebar}>
      <div className={styles.left}>
        <span>1</span>
        <span>2</span>
        <span>3</span>
        <span>4</span>
        <span>5</span>
      </div>
      <div>
        <SidebarSection />
      </div>
    </div>
  );
};

export default Sidebar;
