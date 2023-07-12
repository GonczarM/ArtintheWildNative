import sendRequest from './send-request';
const BASE_URL = 'https://art-in-the-wild.herokuapp.com/api/murals';
// const BASE_URL = 'http://10.0.2.2:3001/api/murals'

export function getMurals(){
  return sendRequest(BASE_URL)
}

export function addPhoto(photoData, muralId){
  return sendRequest(`${BASE_URL}/photo/${muralId}`, 'PUT', photoData)
}