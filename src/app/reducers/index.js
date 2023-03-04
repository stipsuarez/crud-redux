import { combineReducers } from "redux";
import posts from "./postReducer";
import counter from "./couterReducer";

export default combineReducers({
  posts,
  counter,
});