import { useState } from "react";
import CreateTask from "./create-task/CreateTask";
import TasksList from "./tasks-list/Tasks";
import ProjectPage from "../pages/ProjectPage";
import Sidebar from "./sidebar/Sidebar";
import styles from "./App.module.css";
import { useProjects } from "../hooks/useProjects";
import TimerPage from "../pages/timer/TimerPage";
import {
  createBrowserRouter,
  createRoutesFromElements,
  RouterProvider,
  Route,
  Link,
  Routes,
} from "react-router-dom";
import AuthPage from "../pages/auth/AuthPage";
import { useUser } from "../hooks/useUser";
import Project from "./project/Project";
import UserPage from "../pages/user/UserPage";
// const userId= 1

// createBrowserRouter(createRoutesFromElements(<Route path="/" element={} />));

function App() {
  const [searchTerm, setSearchTerm] = useState("");

  const [queryTerm, setQueryTerm] = useState("");
  const { user } = useUser();

  // const { isLoading, data } = useGetRecipesQuery(queryTerm);
  // undefined,
  // { skip: !userId });

  const handleSearch = () => {
    setQueryTerm(searchTerm);
  };
  return (
    <div className={styles.container}>
      {/* <CreateTask /> */}
      {user.length === 0 ? (
        <AuthPage />
      ) : (
        <>
          <Sidebar />
          <Routes>
            <Route path="/projects" element={<ProjectPage />}></Route>
            <Route path="/timer" element={<TimerPage />}></Route>
            <Route path="/user" element={<UserPage />}></Route>
            {/* <ProjectPage /> */}
            {/* <TimerPage /> */}
          </Routes>
        </>
      )}
    </div>
  );
}

export default App;
