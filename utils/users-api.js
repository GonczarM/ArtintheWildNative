import sendRequest from './send-request';
const BASE_URL = 'https://art-in-the-wild.herokuapp.com/api/users';
// const BASE_URL = 'http://10.0.2.2:3001/api/users'

export function login(credentials) {
  return sendRequest(`${BASE_URL}/login`, 'POST', credentials);
}
