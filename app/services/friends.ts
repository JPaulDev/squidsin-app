import { doc, getDoc } from '@firebase/firestore';
import { db } from '../../firebase';
import type { User } from '../../types/User';
import { api } from './api';

export const friendsApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getFriends: builder.query<Array<User>, string>({
      async queryFn(uid) {
        try {
          const docRef = doc(db, 'friends', uid);
          const docSnap = await getDoc(docRef);
          const data = docSnap.data();

          return {
            // If user does not have a friends list, return empty array.
            data: Object.values(data || {}),
          };
        } catch (err) {
          return { error: { code: err.code } };
        }
      },
    }),
  }),
});

export const { useGetFriendsQuery } = friendsApi;
