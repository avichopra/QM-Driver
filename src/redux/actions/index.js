export const ADD_USER = 'ADD_USER';
export const ADD_USER_TOKEN = 'ADD_USER_TOKEN';
<<<<<<< 6b9aafd563a4114f3fcb2f117aa6c0e7001b3908
export const ADD_DRIVER = 'ADD_DRIVER';
export function addUser(user) {
	return { type: ADD_USER, data: user };
}
export function addDriver(driver) {
	return { type: ADD_DRIVER, data: driver };
=======
export const ADD_PATIENT = 'ADD_PATIENT';
export function addUser(user) {
	return { type: ADD_USER, data: user };
}
export function addPatient(patient) {
	return { type: ADD_PATIENT, data: patient };
>>>>>>>  changes app icon login rest
}
export function addUserToken(token) {
	console.warn('adding ', token);
	return { type: ADD_USER_TOKEN, data: token };
}
