<<<<<<< 6b9aafd563a4114f3fcb2f117aa6c0e7001b3908
import { addUser, addUserToken, addDriver } from './actions/index';
=======
import { addUser, addUserToken, addPatient } from './actions/index';
>>>>>>>  changes app icon login rest
import * as Storage from '../utilities/asyncStorage';
import Store from './store/index';
export function setUser(user) {
	Store.dispatch(addUser(user));
	Storage.set('user', user);
}
<<<<<<< 6b9aafd563a4114f3fcb2f117aa6c0e7001b3908
export function setDriver(driver) {
	Store.dispatch(addDriver(driver));
=======
export function setPatient(patient) {
	Store.dispatch(addPatient(patient));
>>>>>>>  changes app icon login rest
}
export function setUserToken(token) {
	Store.dispatch(addUserToken(token));
	Storage.set('token', token);
}
<<<<<<< 6b9aafd563a4114f3fcb2f117aa6c0e7001b3908
export function setUserRefreshToken(refresshToken) {
	Storage.set('refreshToken', refresshToken);
=======
export function setUserRefreshToken(refresshToken){
	Storage.set('refreshToken',refresshToken)
>>>>>>>  changes app icon login rest
}
