export const ADD_USER = 'ADD_USER';
export const SHOW_PATIENT = 'SHOW_PATIENT';
export const ADD_USER_TOKEN = 'ADD_USER_TOKEN';
export const ADD_DRIVER = 'ADD_DRIVER';
export const ADD_USER_LOCATION = 'ADD_USER_LOCATION';
export const SET_PATIENT_LOCATION = 'SET_PATIENT_LOCATION';
export const ADD_ALL_DRIVERS = 'ADD_ALL_DRIVERS';
export function addUser(user) {
	return { type: ADD_USER, data: user };
}
export function addDriver(driver) {
	return { type: ADD_DRIVER, data: driver };
}
export function addAllDrivers(allDrivers) {
	return { type: ADD_ALL_DRIVERS, data: allDrivers };
}
export function addUserToken(token) {
	// console.warn('adding ', token);
	return { type: ADD_USER_TOKEN, data: token };
}
export function showPatient(acceptDecline, patient) {
	return { type: SHOW_PATIENT, data: { showAcceptDecline: acceptDecline, patient: patient } };
}
export function addPatientLocation(location) {
	return { type: SET_PATIENT_LOCATION, data: { patientLocation: location } };
}
export function addLocation(location) {
	console.log('Location ', location);
	return { type: ADD_USER_LOCATION, data: location };
}
