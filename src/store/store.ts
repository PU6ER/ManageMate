import {
  combineReducers,
  configureStore,
  getDefaultMiddleware,
} from "@reduxjs/toolkit";
import { reducer as favouritesReducer } from "./favourites/favourites.slice";
import { api } from "./api/api";
import { createLogger } from "redux-logger";

const logger = createLogger({
  collapsed: true,
});

const reducers = combineReducers({
  favourites: favouritesReducer,
  [api.reducerPath]: api.reducer,
});

export const store = configureStore({
  reducer: reducers,
  devTools: true,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(api.middleware).concat(logger),
});

export type RootState = ReturnType<typeof store.getState>