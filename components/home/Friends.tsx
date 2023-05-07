import { LoadingSpinner } from '@components/shared';
import { Image } from 'expo-image';
import { Text, View } from 'react-native';
import { useGetFriendsQuery } from '../../app/services/friends';
import useAuth from '../../hooks/useAuth';

export default function Friends(): JSX.Element {
  const { user } = useAuth();
  const { data, isLoading } = useGetFriendsQuery(user.uid);

  return (
    <View className="h-full bg-white p-4">
      {isLoading ? (
        <LoadingSpinner />
      ) : (
        <>
          {data.map((friend) => (
            <View
              key={friend.uid}
              className="mb-4 flex flex-row items-center gap-4"
            >
              <Image
                source={friend.photoURL}
                className="h-14 w-14 rounded-full"
              />
              <Text className="text-base">{friend.fullName}</Text>
            </View>
          ))}
        </>
      )}
    </View>
  );
}
