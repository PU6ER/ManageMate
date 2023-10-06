import { useState } from "react";
import { useProjects } from "../../hooks/useProjects";
import { useGetProjectByIdQuery } from "../../store/api/project.api";
import ProjectNotes from "../project-notes/ProjectNotes";
import ProjectOverview from "../project-oveview/ProjectOverview";
import ProjectQuestions from "../project-questions/ProjectQuestions";
import TasksList from "../tasks-list/Tasks";
import styles from "./Project.module.css";

const Tabs = ["Overview", "Tasks", "Notes", "Questions"];

const Project = () => {
  const [tab, setTab] = useState("Overview");
  const { projects } = useProjects();
  const { data, isLoading } = useGetProjectByIdQuery(projects[0]);
  const handleTab = (tabName: string) => {
    setTab(tabName);
  };
  return (
    <div className="">
      <div className={styles.header}>
        <div className={styles.headerTop}>
          <div className={styles.headerLeft}>
            <div>
              <img src="#" alt="Piper" />
            </div>
            <div className={styles.headerText}>
              <span>Piper Enterprise</span>
              <span>Status bar</span>
            </div>
          </div>
          <div className={styles.headerRight}>
            <img src="#" alt="Memebers" />
            <button className={styles.btnMember}>+ Add Member</button>
          </div>
        </div>
        <div className={styles.tabs}>
          {Tabs.map((tabName) => (
            <button onClick={() => handleTab(tabName)}>{tabName}</button>
          ))}
        </div>
      </div>
      {tab === "Overview" ? (
        <ProjectOverview />
      ) : tab === "Tasks" ? (
        <TasksList />
      ) : tab === "Notes" ? (
        <ProjectNotes />
      ) : tab === "Questions" ? (
        <ProjectQuestions />
      ) : null}
    </div>
  );
};

export default Project;
