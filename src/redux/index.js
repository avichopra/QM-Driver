import { addUser, addUserToken } from "./actions/index";
import * as Storage from "../utilities/asyncStorage";
import Store from "./store/index";
export function setUser(user) {
  Store.dispatch(addUser(user));
  Storage.set("user", user);
}
export function setUserToken(token) {
  Store.dispatch(addUserToken(token));
  Storage.set("token", token);
}
