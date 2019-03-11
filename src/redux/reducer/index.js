import {
	ADD_USER,
	ADD_USER_TOKEN,
	ADD_DRIVER,
	ADD_USER_LOCATION,
	ADD_GPS_DATA,
	ADD_TRIP,
	ADD_PATIENT_TEMP_DATA,
	CANCEL_TRIP,
	ADD_HOSPITAL_LOCATION_COORD,
	ADD_PATIENT_LOCATION_COORD,
	CANCEL_PATIENT_LOCATION_COORD
} from '../actions/index';
export const initialState = {
	user: null,
	token: null,
	driver: null,
	Location: null,
	gpsData:null,
	trip:null,
	patientTempData:null,
	pickedLocationCoord:null,
	hospitalLocationCoord:null,
	pickedDuration:null,
	hospitalDuration:null
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
		   case ADD_GPS_DATA:
		   return {...state,gpsData:action.data}	
		   case ADD_TRIP:
		   return {...state,trip:action.data}
		   case ADD_PATIENT_TEMP_DATA:
		   return {...state,patientTempData:action.data}
		   case CANCEL_TRIP:
		   return {...state,trip:null,patientTempData:null,pickedLocationCoord:null,hospitalLocationCoord:null}
		   case ADD_PATIENT_LOCATION_COORD:
		   return {...state,pickedLocationCoord:action.data.pickedLocation,pickedDuration:action.data.duration}
		   case ADD_HOSPITAL_LOCATION_COORD:
		   return {...state,hospitalLocationCoord:action.data.hospitalLocation,hospitalDuration:action.data.duration}
		   case CANCEL_PATIENT_LOCATION_COORD:
		   return {...state,pickedLocationCoord:null}
		   default:
			return { ...state };
	}
}
