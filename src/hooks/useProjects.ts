import { useSelector } from "react-redux";
import { useTypedSelector } from "./useTypedSelector";

export const useProjects = () => {
  const projects = useTypedSelector((state) => state.projects);
  return { projects };
};
