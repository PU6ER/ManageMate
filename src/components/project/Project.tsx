import { useState } from "react";
import { useProjects } from "../../hooks/useProjects";
import { useGetProjectByIdQuery } from "../../store/api/project.api";
import Loader from "../loader/Loader";
import ProjectNotes from "../project-notes/ProjectNotes";
import ProjectOverview from "../project-oveview/ProjectOverview";
import ProjectQuestions from "../project-questions/ProjectQuestions";
import TasksList from "../tasks-list/Tasks";
import styles from "./Project.module.css";
import { LuSettings } from "react-icons/lu";
import { LuBell } from "react-icons/lu";
import { LuSearch } from "react-icons/lu";
import EmojiPicker, { Emoji } from "emoji-picker-react";
import ProgressBar from "@ramonak/react-progress-bar";
import { useTask } from "../../hooks/useTask";
import Subtasks from "../subtasks/Subtasks";

const Tabs = ["Overview", "Tasks", "Notes", "Questions"];

const Project = () => {
  const [tab, setTab] = useState("Overview");
  const { projects } = useProjects();
  const { task } = useTask();
  const { data, isLoading } = useGetProjectByIdQuery(projects[0]);
  const [emoji, setEmoji] = useState("");
  const [isEmojiOpen, setIsEmojiOpen] = useState(false);
  const handleTab = (tabName: string) => {
    setTab(tabName);
  };
  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <div className={styles.headerPermach}>
          <div className={styles.search}>
            <LuSearch />
            <input
              className={styles.searchInput}
              type="text"
              placeholder="Search"
            />
            <Emoji unified={emoji} />
          </div>
          <div className={styles.profile}>
            <LuSettings />
            <LuBell />
            {/* {isEmojiOpen && (
              <div className={styles.emojiPicker}>
                <EmojiPicker
                  width={500}
                  height={800}
                  onEmojiClick={(emoji) => {
                    setEmoji(emoji.unified);
                    setIsEmojiOpen(false);
                    console.log(emoji);
                  }}
                />
              </div>
            )} */}
            <div className={styles.profileSection}>
              <div className={styles.profilePhoto}></div>
              <span>Billy Herrington</span>
            </div>
            {/* <img src="#" alt="Prof" onClick={() => setIsEmojiOpen(true)} /> */}
          </div>
        </div>
        {isLoading ? (
          <Loader style={{ width: "200px" }} />
        ) : data ? (
          <div className={styles.headerTop}>
            <div className={styles.headerLeft}>
              <div className={styles.emojiBg}>
                <Emoji unified={data.image} />
              </div>
              <div className={styles.headerText}>
                <span>{data.name}</span>
                <div className={styles.progressBar}>
                  {/* <ProgressBar
                    completed={45}
                    maxCompleted={100}
                    className={styles.progressWrapper}
                    barContainerClassName={styles.progressContainer}
                    // completedClassName={styles.progressCompleted}
                    labelClassName={styles.progressLabel}
                  /> */}
                  <ProgressBar
                    completed={20}
                    bgColor="#365eff"
                    height="6px"
                    width="300px"
                    borderRadius="10px"
                    isLabelVisible={false}
                    baseBgColor="#f7f7f7"
                    labelColor="#ffffff"
                    labelSize="14"
                    maxCompleted={100}
                    animateOnRender
                  />
                  <span className={styles.progressBarTitle}>20% complete</span>
                </div>
              </div>
            </div>
            <div className={styles.headerRight}>
              <div className={styles.members}>
                <div className={styles.memberImg}></div>
                <div className={styles.memberImg}></div>
                <div className={styles.memberImg}></div>
              </div>
              <button className={styles.btnMember}>+ Add Member</button>
            </div>
          </div>
        ) : null}
        <div className={styles.tabs}>
          {Tabs.map((tabName) => (
            <button
              onClick={() => handleTab(tabName)}
              className={tabName === tab ? styles.tabActive : styles.tab}
            >
              {tabName}
            </button>
          ))}
        </div>
      </div>
      {data ? (
        tab === "Overview" ? (
          <ProjectOverview data={data.overview} />
        ) : tab === "Tasks" && task.length > 0 ? (
          <Subtasks />
        ) : tab === "Tasks" && task.length == 0 ? (
          <TasksList />
        ) : tab === "Notes" ? (
          <ProjectNotes />
        ) : tab === "Questions" ? (
          <ProjectQuestions />
        ) : null
      ) : null}
    </div>
  );
};

export default Project;
