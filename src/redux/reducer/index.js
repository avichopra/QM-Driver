import { ADD_USER, ADD_USER_TOKEN } from "../actions/index";
export const initialState = {
  user: null,
  token: null
};
export default function(state = {}, action) {
  switch (action.type) {
    case ADD_USER:
      return { ...state, user: action.data };
    case ADD_USER_TOKEN:
      console.log("User token added in redux state", action.data);
      return { ...state, token: action.data };
    default:
      return { ...state };
  }
}
