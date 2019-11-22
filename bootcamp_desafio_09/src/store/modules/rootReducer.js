import { combineReducers } from "redux";

import auth from "./auth/reducer";
import user from "./user/reducer";
// import meetapp from "./meetapp/reducer";

export default combineReducers({
  auth,
  user
});
