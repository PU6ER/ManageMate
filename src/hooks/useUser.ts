import { useSelector } from "react-redux";
import { useTypedSelector } from "./useTypedSelector";

export const useUser = () => {
  const user = useTypedSelector((state) => state.user);
  return { user };
};
