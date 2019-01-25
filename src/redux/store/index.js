import { createStore } from "redux";
import Reducers, { initialState } from "../reducer/index";

let store = createStore(Reducers, initialState);

export default store;
