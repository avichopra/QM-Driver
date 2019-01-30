<<<<<<< 6b9aafd563a4114f3fcb2f117aa6c0e7001b3908
import { ADD_USER, ADD_USER_TOKEN, ADD_DRIVER } from '../actions/index';
export const initialState = {
	user: null,
	token: null,
	driver: null
=======
import { ADD_USER, ADD_USER_TOKEN, ADD_PATIENT } from '../actions/index';
export const initialState = {
	user: null,
	token: null,
	patient: null
>>>>>>>  changes app icon login rest
};
export default function(state = {}, action) {
	switch (action.type) {
		case ADD_USER:
			console.log('adding the usersssssssssssssssssssssssssssssssssss ', action.data);
			return { ...state, user: action.data };
		case ADD_USER_TOKEN:
			console.log('User token added in redux state', action.data);
			return { ...state, token: action.data };
<<<<<<< 6b9aafd563a4114f3fcb2f117aa6c0e7001b3908
		case ADD_DRIVER:
			console.log('User token added in redux state', action.data);
			return { ...state, driver: action.data };
=======
		case ADD_PATIENT:
			console.log('User token added in redux state', action.data);
			return { ...state, patient: action.data };
>>>>>>>  changes app icon login rest
		default:
			return { ...state };
	}
}
