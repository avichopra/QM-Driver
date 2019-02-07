import {
	ADD_USER,
	ADD_USER_TOKEN,
	ADD_DRIVER,
	ADD_USER_LOCATION,
	SHOW_PATIENT,
	SET_PATIENT_LOCATION,
	ADD_ALL_DRIVERS
} from '../actions/index';
export const initialState = {
	user: null,
	token: null,
	driver: null,
	Location: null,
	showAcceptDecline: false,
	patient: null,
	patientLocation: null,
	allDrivers: null
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
			return { ...state, Location: action.data };
		case SHOW_PATIENT:
			if (action.data.patient) {
				return { ...state, showAcceptDecline: action.data.showAcceptDecline, patient: action.data.patient };
			} else {
				return { ...state, showAcceptDecline: action.data.showAcceptDecline };
			}
		case SET_PATIENT_LOCATION:
			return { ...state, patientLocation: action.data.patientLocation };
		// case ADD_PATIENT:
		// 	return { ...state, patient: action.data.patient };
		case ADD_ALL_DRIVERS:
			return { ...state, allDrivers: action.data };
		default:
			return { ...state };
	}
}
