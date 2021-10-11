import { combineReducers } from "redux";

import loginReducer from "./login";
import userReducer from "./user";
import questionReducer from "./question";

const rootReducer = combineReducers({
  authUser: loginReducer,
  users: userReducer,
  questions: questionReducer,
});

export default rootReducer;
