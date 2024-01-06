import { useSelector } from "react-redux";
import { useTypedSelector } from "./useTypedSelector";

export const useTab = () => {
  const tab = useTypedSelector((state) => state.tab);
  return { tab };
};
