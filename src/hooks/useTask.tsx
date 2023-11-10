import { useSelector } from "react-redux";
import { useTypedSelector } from "./useTypedSelector";

export const useTask = () => {
  const task = useTypedSelector((state) => state.task);
  return { task };
};
