export const ADD_USER = "ADD_USER";
export const ADD_USER_TOKEN = "ADD_USER_TOKEN";
export const ADD_DRIVER = "ADD_DRIVER";
export const ADD_USER_LOCATION = "ADD_USER_LOCATION";
export const ADD_GPS_DATA = "ADD_GPS_DATA";
export const ADD_TRIP = "ADD_TRIP";
export const ADD_PATIENT_TEMP_DATA = "ADD_PATIENT_TEMP_DATA";
export const ADD_AMBULANCE_REQUEST = "ADD_AMBULANCE_REQUEST";
export const CANCEL_TRIP = "CANCEL_TRIP";
export const ADD_PATIENT_LOCATION_COORD = "ADD_PATIENT_LOCATION_COORD";
export const ADD_HOSPITAL_LOCATION_COORD = "ADD_HOSPITAL_LOCATION_COORD";
export const CANCEL_PATIENT_LOCATION_COORD = "CANCEL_PATIENT_LOCATION_COORD";
export function addUser(user) {
  return { type: ADD_USER, data: user };
}
export function addDriver(driver) {
  return { type: ADD_DRIVER, data: driver };
}
export function addUserToken(token) {
  return { type: ADD_USER_TOKEN, data: token };
}
export function addLocation(location) {
  return { type: ADD_USER_LOCATION, data: location };
}
export function addGPSData(gps_data) {
  return { type: ADD_GPS_DATA, data: gps_data };
}
export function saveTrip(data) {
  return { type: ADD_TRIP, data };
}
export function patientTempData(data) {
  return { type: ADD_PATIENT_TEMP_DATA, data: data };
}
export function cancelTrip() {
  return { type: CANCEL_TRIP };
}
export function addPatientLocationCoord(
  pickedLocation,
  duration,
  pickedReRoute
) {
  return {
    type: ADD_PATIENT_LOCATION_COORD,
    data: {
      pickedLocation: pickedLocation,
      duration: duration,
      pickedReRoute: pickedReRoute
    }
  };
}
export function addHospitalLocationCoord(
  hospitalLocation,
  duration,
  hospitalReRoute
) {
  return {
    type: ADD_HOSPITAL_LOCATION_COORD,
    data: {
      hospitalLocation: hospitalLocation,
      duration: duration,
      hospitalReRoute: hospitalReRoute
    }
  };
}
export function cancelPatientLocationCoord() {
  return { type: CANCEL_PATIENT_LOCATION_COORD };
}
