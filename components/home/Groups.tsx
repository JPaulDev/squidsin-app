import { addDoc, collection, getDocs } from 'firebase/firestore';
import { useEffect, useState } from 'react';
import { Button, Text, TextInput, View } from 'react-native';
import { db } from '../../firebase';

export default function Groups(): JSX.Element {
  const [groups, setGroups] = useState([]);
  const [newGroupName, setNewGroupName] = useState<string>('');
  const [isPressed, setIsPressed] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const groupsCollectionRef = collection(db, 'groups');

  const getGroups = async () => {
    const data = await getDocs(groupsCollectionRef);
    setGroups(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    setIsLoading(false);
  };

  useEffect(() => {
    setIsLoading(true);
    getGroups();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const createGroup = async () => {
    await addDoc(groupsCollectionRef, {
      group_name: newGroupName,
      members: {},
    });

    getGroups();
    setIsPressed(false);
    setNewGroupName('');
  };

  return isLoading ? (
    <View>
      <Text className="text-xl">Groups</Text>
      <Text>Loading ...</Text>
    </View>
  ) : (
    <View>
      <Text className="text-xl">Groups</Text>
      <Button
        title="Create a new Group"
        onPress={() => {
          setIsPressed(true);
        }}
      />
      {isPressed ? (
        <View>
          <Text>Enter the Group name</Text>
          <TextInput
            placeholder="Group name max 20 characters"
            placeholderTextColor={'red'}
            textAlign="center"
            maxLength={20}
            autoFocus={true}
            returnKeyType="done"
            accessibilityLabel="input"
            accessibilityLabelledBy="new group name input"
            onChangeText={setNewGroupName}
          />
          <Button
            title="Create"
            disabled={!newGroupName}
            onPress={() => {
              createGroup();
            }}
          />
        </View>
      ) : null}

      <View>
        {groups.map((group) => {
          return (
            <View key={group.id}>
              <Text>{group.group_name}</Text>
              <Text>Members: {Object.keys(group.members)}</Text>
            </View>
          );
        })}
      </View>
    </View>
  );
}
