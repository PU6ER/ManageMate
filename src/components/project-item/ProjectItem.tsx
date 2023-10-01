import { BsThreeDotsVertical } from "react-icons/bs";
import styles from "./ProjectItem.module.css";
const ProjectItem = () => {
  return (
    <div className={styles.container}>
      <image>df</image>
      <span>Name</span>
      <BsThreeDotsVertical />
    </div>
  );
};

export default ProjectItem;
