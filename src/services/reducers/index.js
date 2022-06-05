import { combineReducers } from "redux";
import { bunReducer } from "./bun";

export const rootReducer = combineReducers({
  bun: bunReducer,
});
