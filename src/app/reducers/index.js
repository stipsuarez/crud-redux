import { combineReducers } from "redux";
import posts from "./postReducer";
import counter from "./couterReducer";
import general from "./generalReducer";
export default combineReducers({
  posts,
  counter,
  general
});