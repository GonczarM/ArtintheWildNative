import * as usersAPI from './users-api'
import AsyncStorage from '@react-native-async-storage/async-storage';
import { decode as atob } from 'base-64';

export async function login(userData) {
  const token = await usersAPI.login(userData);
  await AsyncStorage.setItem('token', token)
  return getUser()
}

export async function getToken() {
  const token = await AsyncStorage.getItem('token');
  if (!token) return null;
  const payload = JSON.parse(atob(token.split('.')[1]));
  if (payload.exp < Date.now() / 1000) {
    await AsyncStorage.removeItem('token');
    return null;
  }
  return token;
}

export async function getUser() {
  const token = await getToken();
  return token ? JSON.parse(atob(token.split('.')[1])).user : null;
}

export async function logOut() {
  await AsyncStorage.removeItem('token');
}

export async function signUp(userData){
  const token = await usersAPI.signUp(userData)
  await AsyncStorage.setItem('token', token)
  return getUser()
}