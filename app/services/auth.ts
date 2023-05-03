import { signInWithEmailAndPassword } from 'firebase/auth';
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
    login: builder.mutation<User, LoginRequest>({
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
  }),
});

export const { useLoginMutation } = authApi;
