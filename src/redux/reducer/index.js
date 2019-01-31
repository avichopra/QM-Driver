import { ADD_USER, ADD_USER_TOKEN, ADD_DRIVER,ADD_USER_LOCATION } from '../actions/index';
export const initialState = {
	user: null,
	token: null,
	driver: null,
	Location:null
};
export default function(state = {}, action) {
	switch (action.type) {
		case ADD_USER:
			console.log('adding the usersssssssssssssssssssssssssssssssssss ', action.data);
			return { ...state, user: action.data };
		case ADD_USER_TOKEN:
			console.log('User token added in redux state', action.data);
			return { ...state, token: action.data };
		case ADD_DRIVER:
			console.log('User token added in redux state', action.data);
			return { ...state, driver: action.data };
			case ADD_USER_LOCATION:
			return {...state,Location:action.data};
		default:
			return { ...state };
	}
}
