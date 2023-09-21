import { useSelector } from "react-redux";
import { useTypedSelector } from "./useTypedSelector";

export const useFavourites = () => {
  const favourites = useTypedSelector((state) => state.favourites);
  return { favourites };
};
