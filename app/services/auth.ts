import { signInWithEmailAndPassword, signOut } from 'firebase/auth';
import { auth } from '../../firebase';
import { api } from './api';

export type User = {
  email: string;
  displayName: string;
  photoURL: string;
  uid: string;
};

type LoginRequest = {
  email: string;
  password: string;
};

export const authApi = api.injectEndpoints({
  endpoints: (builder) => ({
    logIn: builder.mutation<User, LoginRequest>({
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
            data: { uid, email: userEmail, displayName, photoURL },
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
          return { error: {} };
        }
      },
    }),
  }),
});

export const { useLogInMutation, useLogOutMutation } = authApi;
