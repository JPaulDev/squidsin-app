import { LoadingSpinner } from '@components/shared';
import { Image } from 'expo-image';
import {
  collection,
  doc,
  getDocs,
  orderBy,
  query,
  where,
} from 'firebase/firestore';
import { useEffect, useState } from 'react';
import { Text, View } from 'react-native';
import { useGetFriendsQuery } from '../../app/services/friends';
import { db } from '../../firebase';
import useAuth from '../../hooks/useAuth';

export default function Friends(): JSX.Element {
  const { user } = useAuth();
  const { data, isLoading } = useGetFriendsQuery(user.uid);
  const userRef = doc(db, 'users', user.uid);
  const costsCollectionRef = collection(db, 'costs');
  const [totals, setTotals] = useState({});
  const [isLoading1, setisLoading1] = useState(true);

  useEffect(() => {
    if (data && data.length > 0) {
      setisLoading1(true);
      const getTotals = async () => {
        const newTotals = {};
        await Promise.all(
          data.map(async (friend) => {
            const friendRef = doc(db, 'users', friend.uid);
            const qt = query(
              costsCollectionRef,
              where('userPaid', '==', userRef),
              where('userSplitWith', '==', friendRef),
              orderBy('timestamp', 'desc')
            );
            const qts = query(
              costsCollectionRef,
              where('userPaid', '==', friendRef),
              where('userSplitWith', '==', userRef),
              orderBy('timestamp', 'desc')
            );
            const querySnapshotOwe = await getDocs(qt); // owing
            const querySnapshotDue = await getDocs(qts); // due
            let total = 0;
            querySnapshotOwe.forEach((docu) => {
              total += docu.data().cost;
            });
            querySnapshotDue.forEach((docu) => {
              total -= docu.data().cost;
            });
            newTotals[friend.uid] = total;
          })
        );
        setTotals(newTotals);
        setisLoading1(false);
      };
      getTotals();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data]);

  return (
    <View className="h-full bg-white p-4">
      <Text className="mb-3 text-2xl font-bold">Friends</Text>
      {isLoading ? (
        <LoadingSpinner />
      ) : isLoading1 ? (
        <LoadingSpinner />
      ) : (
        <>
          {data.map((friend) => (
            <View
              key={friend.uid}
              className="mb-4 flex-row items-center justify-between"
            >
              <View className="flex-row items-center gap-4">
                <Image
                  source={friend.photoURL}
                  className="h-14 w-14 rounded-full"
                />
                <Text className="text-base">{friend.fullName}</Text>
              </View>
              <Text className="text-base">Balance: {totals[friend.uid]}</Text>
            </View>
          ))}
        </>
      )}
    </View>
  );
}
