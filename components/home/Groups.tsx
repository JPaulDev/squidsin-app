import { addDoc, collection, getDocs } from 'firebase/firestore';
import { useEffect, useState } from 'react';
import {
  Button,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
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
    <View style={styles.container}>
      <Text style={styles.title}>Groups</Text>
      <Text style={styles.loading}>Loading ...</Text>
    </View>
  ) : (
    <ScrollView>
      <View style={styles.container}>
        <Text style={styles.title}>Groups</Text>
        <Button
          title="Create a new Group"
          onPress={() => {
            setIsPressed(true);
          }}
        />
        {isPressed ? (
          <View style={styles.inputContainer}>
            <Text style={styles.label}>Enter the Group name</Text>
            <TextInput
              style={styles.input}
              placeholder="Group name max 20 characters"
              placeholderTextColor={'#F44336'}
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

        <View style={styles.groupList}>
          {groups.map((group) => {
            return (
              <View key={group.id} style={styles.group}>
                <Text style={styles.groupName}>{group.group_name}</Text>
                <Text style={styles.members}>
                  Members: {Object.keys(group.members)}
                </Text>
              </View>
            );
          })}
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  // container: {
  //   flex: 1,
  //   alignItems: 'flex-start',
  //   justifyContent: 'flex-start',
  //   backgroundColor: '##FFFFFF',
  //   paddingHorizontal: 20,
  //   paddingTop: 40,
  // },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginVertical: 10,
  },
  loading: {
    fontSize: 18,
    marginVertical: 10,
  },
  inputContainer: {
    alignItems: 'center',
    marginVertical: 20,
  },
  label: {
    fontSize: 18,
    marginBottom: 10,
  },
  input: {
    borderWidth: 1,
    borderColor: '#F44336',
    borderRadius: 5,
    width: '80%',
    height: 40,
    paddingHorizontal: 10,
    marginBottom: 20,
  },
  groupList: {
    flex: 1,
    width: '100%',
    paddingHorizontal: 20,
    marginVertical: 20,
  },
  group: {
    backgroundColor: '#FFFFFF',
    borderRadius: 10,
    padding: 10,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: '#000000',
  },
  groupName: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  members: {
    fontSize: 16,
  },
});
