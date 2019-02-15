import {
	ADD_USER,
	ADD_USER_TOKEN,
	ADD_DRIVER,
	ADD_USER_LOCATION,
	SHOW_PATIENT,
	SET_PATIENT_LOCATION,
	ADD_ALL_DRIVERS,
	PICKED_UP_PATIENT,
	PICKED_UP_PATIENT_COMPLETE
} from '../actions/index';
export const initialState = {
	user: null,
	token: null,
	driver: null,
	Location: null,
	showAcceptDecline: false,
	patient: null,
	patientLocation: null,
	allDrivers: null,
	pickedUpPatient:false
};
export default function(state = {}, action) {
	switch (action.type) {
		case ADD_USER:
			return { ...state, user: action.data };
		case ADD_USER_TOKEN:
			return { ...state, token: action.data };
		case ADD_DRIVER:
			return { ...state, driver: action.data };
		case ADD_USER_LOCATION:
			return { ...state, Location: action.data };
		case SHOW_PATIENT:
			if (action.data.patient) {
				return {
					...state,
					showAcceptDecline: action.data.showAcceptDecline,
					patient: action.data.patient.patientId ? action.data.patient : null
				};
			} else {
				return { ...state, showAcceptDecline: action.data.showAcceptDecline };
			}
		case SET_PATIENT_LOCATION:
			return { ...state, patientLocation: action.data.patientLocation };
		// case ADD_PATIENT:
		// 	return { ...state, patient: action.data.patient };
		case ADD_ALL_DRIVERS:
			return { ...state, allDrivers: action.data };
			case PICKED_UP_PATIENT:
			return {...state,pickedUpPatient:action.data}
			case PICKED_UP_PATIENT_COMPLETE:
			return {...state,driver:null,showAcceptDecline:false,patient:null,patientLocation:null,allDrivers:null,pickedUpPatient:false}
		default:
			return { ...state };
	}
}
