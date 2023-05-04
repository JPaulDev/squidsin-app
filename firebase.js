import AsyncStorage from '@react-native-async-storage/async-storage';
import { getApp, getApps, initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

import {
  getReactNativePersistence,
  initializeAuth,
} from 'firebase/auth/react-native';

const firebaseConfig = {
  apiKey: 'AIzaSyCN6BQ-8jdmFfnW8N_Ns38XrsfC-3hsP0U',
  authDomain: 'squidsin.firebaseapp.com',
  projectId: 'squidsin',
  storageBucket: 'squidsin.appspot.com',
  messagingSenderId: '501003177890',
  appId: '1:501003177890:web:83ea30176a3cc6d272ecfb',
};

const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(AsyncStorage),
});
const db = getFirestore(app);

export { auth, db };
