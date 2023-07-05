import sendRequest from './send-request';
const BASE_URL = 'https://art-in-the-wild.herokuapp.com/api/murals';

export function getMurals(){
  return sendRequest(BASE_URL)
}