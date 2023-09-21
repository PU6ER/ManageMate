import { useState } from "react";
import CreateTask from "./create-task/CreateTask";
import TasksList from "./tasks-list/Tasks";

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
    <div>
      {/* <CreateTask /> */}
      <TasksList />
    </div>
  );
}

export default App;
