import { ButtonBack, LoadingSpinner } from '@components/shared';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { Image } from 'expo-image';
import { addDoc, collection, doc, serverTimestamp } from 'firebase/firestore';
import { useState } from 'react';
import {
  Button,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import type { RootStackParamList } from 'types/RootStackParamsList';
import { useGetFriendsQuery } from '../../app/services/friends';
import { db } from '../../firebase';
import useAuth from '../../hooks/useAuth';

type Props = NativeStackScreenProps<RootStackParamList, 'Expense'>;

export default function Expense({ navigation }: Props): JSX.Element {
  const { user } = useAuth();
  const { data, isLoading } = useGetFriendsQuery(user.uid);
  const [cost, setCost] = useState<number>(0);
  const [description, setDescription] = useState('');
  const costsCollectionRef = collection(db, 'costs');
  const [costCreated, setCostCreated] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [user1, setUser1] = useState('1');
  const [user2, setUser2] = useState('2');
  const [friendClicked, setFriendClicked] = useState('');
  const handleReset = () => {
    setDescription('');
    setCost(0);
    setCostCreated('');
    setSubmitted(false);
  };
  const handleFriendClick = (friend) => {
    setFriendClicked(friend.fullName);
    setUser2(friend.uid);
  };

  const handleSubmit = async () => {
    const usersNum = 2;
    const user1id = doc(db, 'users', user.uid);
    const user2id = doc(db, 'users', user2);
    try {
      addDoc(costsCollectionRef, {
        description: description,
        cost: cost / usersNum,
        userPaid: user1id,
        timestamp: serverTimestamp(),
        userSplitWith: user2id,
      });
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <View>
      <View style={styles.friendsContainer}>
        <View className="h-full bg-white p-4">
          {isLoading ? (
            <LoadingSpinner />
          ) : (
            <>
              {data.map((friend) => (
                <TouchableOpacity
                  key={friend.uid}
                  className="mb-4 flex flex-row items-center gap-4"
                  onPress={() => handleFriendClick(friend)}
                >
                  <Image
                    source={friend.photoURL}
                    className="h-14 w-14 rounded-full"
                  />
                  <Text className="text-base">{friend.fullName}</Text>
                </TouchableOpacity>
              ))}
            </>
          )}
        </View>
      </View>
      <View className="h-full bg-white">
        <ButtonBack navigation={navigation} />
        <Text className="text-xl">Expense</Text>
        <View style={styles.container}>
          <Text style={styles.sectionTitle}>New Cost</Text>
          <Text style={styles.itemText}>Description</Text>
          <TextInput
            placeholder="Enter description here .."
            value={description}
            onChangeText={(text) => setDescription(text)}
          />
          <Text style={styles.itemText}>Cost</Text>
          <TextInput
            value={cost.toString()}
            onChangeText={(text) => setCost(parseFloat(text))}
            placeholder="0.00"
            keyboardType="numeric"
          />
          <Text style={styles.itemText}>
            Paid by {user.displayName}, split with {friendClicked}
          </Text>
          <Button title="Submit" onPress={handleSubmit} />
          <Text>{!submitted ? null : costCreated}</Text>
          <View>
            <Button title="Clear" onPress={handleReset} />
          </View>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffaf',
    paddingTop: 80,
    paddingHorizontal: 20,
    alignItems: 'center',
  },
  friendsContainer: {
    maxHeight: '33%',
  },
  tasksWrapper: { paddingTop: 80, paddingHorizontal: 20, flex: 1 },
  sectionTitle: { fontSize: 24, fontWeight: 'bold' },
  items: {},
  itemText: { maxWidth: '80%', backgroundColor: 'white' },
});
