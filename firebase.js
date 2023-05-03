import AsyncStorage from '@react-native-async-storage/async-storage';
import { getApp, getApps, initializeApp } from 'firebase/app';
import {
  getReactNativePersistence,
  initializeAuth,
} from 'firebase/auth/react-native';

const firebaseConfig = {
  apiKey: 'AIzaSyCClqjWVFBBCokA8KWlGom17TYMiblBUtk',
  authDomain: 'firebrandtest-36c9c.firebaseapp.com',
  projectId: 'firebrandtest-36c9c',
  storageBucket: 'firebrandtest-36c9c.appspot.com',
  messagingSenderId: '320914218222',
  appId: '1:320914218222:web:805fa517858d7d43b267ff',
};

const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(AsyncStorage),
});

export { auth };
