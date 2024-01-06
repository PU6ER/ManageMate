import { useSelector } from "react-redux";
import { useTypedSelector } from "./useTypedSelector";

export const useSidebar = () => {
  const sidebar = useTypedSelector((state) => state.sidebar);
  return { sidebar };
};
