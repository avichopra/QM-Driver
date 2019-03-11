import { addUser, addUserToken, addDriver, showPatient, addPatientLocation ,addGPSData} from './actions/index';
import * as Storage from '../utilities/asyncStorage';
import Store from './store/index';
export function setUser(user) {
	Store.dispatch(addUser(user));
	Storage.set('user', user);
}
// export function setPatient(acceptDecline, patient) {
// 	console.warn('setPatient being called>>>>>>>>>>>>>>>>>>>', acceptDecline);
// 	Store.dispatch(showPatient(acceptDecline, patient));
// 	// Storage.set('user', user);
// }
export function setDriver(driver) {
	Store.dispatch(addDriver(driver));
}
// export function setPatientLocation(location) {
//      console.log("adding patient location",location)
// 	Store.dispatch(addPatientLocation(location));
// }
export function setUserToken(token) {
	Store.dispatch(addUserToken(token));
	Storage.set('token', token);
}
export function setUserRefreshToken(refresshToken) {
	Storage.set('refreshToken', refresshToken);
}
export function setGPSData(data){
	Store.dispatch(addGPSData(data))
}