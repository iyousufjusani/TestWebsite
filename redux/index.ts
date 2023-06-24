import { combineReducers } from "redux";
import auth from "./auth/reducer";
import site from "./site/reducer";

const createReducer = combineReducers({
  auth,
  site,
});

export default createReducer;
