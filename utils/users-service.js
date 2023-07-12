import * as usersAPI from './users-api'
import AsyncStorage from '@react-native-async-storage/async-storage';
import { decode as atob } from 'base-64';

export async function login(userData) {
  const token = await usersAPI.login(userData);
  try{
    await AsyncStorage.setItem('token', token)
    const user = await getUser()
    return user
  } catch(e){
    console.log(e)
  }
}

export async function getToken() {
  try{
    const token = await AsyncStorage.getItem('token');
    if (!token) return null;
    const payload = JSON.parse(atob(token.split('.')[1]));
    if (payload.exp < Date.now() / 1000) {
      try{
        await AsyncStorage.removeItem('token');
        return null;
      }catch(e){
        console.log(e)
      }
    }
    return token;
  } catch(e){
    console.log(e)
  }
}

export async function getUser() {
  try{
    const token = await getToken();
    return token ? JSON.parse(atob(token.split('.')[1])).user : null;
  } catch(e){
    console.log(e)
  }
}

export async function logOut() {
  try{
    await AsyncStorage.removeItem('token');
  } catch(e){
    console.log(e)
  }
}

export async function signUp(userData){
  try{
    const token = await usersAPI.signUp(userData)
    await AsyncStorage.setItem('token', token)
    return getUser()
  } catch(e){
    console.log(e)
  }
}