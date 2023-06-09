import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  updateProfile,
} from 'firebase/auth';
import { doc, setDoc } from 'firebase/firestore';
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';
import { auth, db, storage } from '../../firebase';
import type { User } from '../../types/User';
import { api } from './api';

type LogInRequest = {
  email: string;
  password: string;
};

type SignUpRequest = LogInRequest & {
  fullName: string;
  imageURI: string;
};

const DEFAULT_PROFILE =
  'https://firebasestorage.googleapis.com/v0/b/squidsin.appspot.com/o/users%2Fdefault-profile.webp?alt=media&token=6d0c1dcc-ea90-4eb1-ab5a-3f80d9d41b76';

export const authApi = api.injectEndpoints({
  endpoints: (builder) => ({
    logIn: builder.mutation<User, LogInRequest>({
      async queryFn(userCredentials) {
        try {
          const { email, password } = userCredentials;
          const { user } = await signInWithEmailAndPassword(
            auth,
            email,
            password
          );
          const { uid, email: userEmail, displayName, photoURL } = user;

          return {
            data: { uid, email: userEmail, fullName: displayName, photoURL },
          };
        } catch (err) {
          return { error: { code: err.code } };
        }
      },
    }),
    logOut: builder.mutation<null, void>({
      async queryFn() {
        try {
          await signOut(auth);

          return { data: null };
        } catch (err) {
          return { error: { code: err.code } };
        }
      },
    }),
    signUp: builder.mutation<User, SignUpRequest>({
      async queryFn(formData) {
        try {
          const { email, password, fullName, imageURI } = formData;
          const { user } = await createUserWithEmailAndPassword(
            auth,
            email,
            password
          );
          const { uid } = user;

          let photoURL = DEFAULT_PROFILE;

          if (imageURI) {
            const response = await fetch(imageURI);
            const blob = await response.blob();
            const fileRef = ref(storage, `/users/${uid}`);
            const result = await uploadBytes(fileRef, blob);
            photoURL = await getDownloadURL(result.ref);
          }

          await updateProfile(user, {
            displayName: fullName,
            photoURL,
          });

          await setDoc(doc(db, 'users', uid), {
            email,
            fullName,
            photoURL,
          });

          return {
            data: { uid, email, fullName, photoURL },
          };
        } catch (err) {
          return { error: { code: err.code } };
        }
      },
    }),
  }),
});

export const { useLogInMutation, useLogOutMutation, useSignUpMutation } =
  authApi;
