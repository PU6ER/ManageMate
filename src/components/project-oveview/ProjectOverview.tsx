import { FC } from "react";
import styles from "./ProjectOverview.module.css";

interface Overview {
  data: string;
}

const ProjectOverview = ({ data } : {data: string}) => {
  return (
    <div className={styles.container}>
      <span>{data}</span>
      
    </div>
  );
};

export default ProjectOverview;
