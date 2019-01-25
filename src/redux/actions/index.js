export const ADD_USER = 'ADD_USER';
export const ADD_USER_TOKEN = 'ADD_USER_TOKEN';
export function addUser(user) {
  return { type: ADD_USER, data: user };
}
export function addUserToken(token) {
  console.log('adding ', token);
  return { type: ADD_USER_TOKEN, data: token };
}
