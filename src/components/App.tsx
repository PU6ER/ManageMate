import { useState } from "react";
import CreateTask from "./create-task/CreateTask";
import TasksList from "./tasks-list/Tasks";
import ProjectPage from "../pages/ProjectPage";
import Sidebar from "./sidebar/Sidebar";
import styles from "./App.module.css"
// const userId= 1

function App() {
  const [searchTerm, setSearchTerm] = useState("");

  const [queryTerm, setQueryTerm] = useState("");
  // const { isLoading, data } = useGetRecipesQuery(queryTerm);
  // undefined,
  // { skip: !userId });

  const handleSearch = () => {
    setQueryTerm(searchTerm);
  };
  return (
    <div className={styles.container}>
      {/* <CreateTask /> */}
      <Sidebar />
      <ProjectPage />
    </div>
  );
}

export default App;
