import { bindActionCreators } from "@reduxjs/toolkit";
import { useMemo } from "react";
import { useDispatch } from "react-redux";
import { actions } from "../store/projects/projects.slice";
import { actions as sidebar } from "../store/sidebar/sidebar.slice";
import { actions as task } from "../store/task/task.slice";

const rootActions = {
  ...actions,
  ...sidebar,
  ...task,
};

export const useActions = () => {
  const dispatch = useDispatch();

  return useMemo(() => bindActionCreators(rootActions, dispatch), [dispatch]);
};
