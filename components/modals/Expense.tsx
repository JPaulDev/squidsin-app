import { ButtonBack } from '@components/shared';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { useState, useEffect } from "react";
import { StyleSheet, TextInput, View, Button, Text } from 'react-native';
import type { RootStackParamList } from 'types/RootStackParamsList';
import {db} from "../../firebase"
import { async } from "@firebase/util"
import {
  collection,
  getDocs,
  addDoc,
  doc,
  serverTimestamp,
  query,
  where,
} from "firebase/firestore";

type Props = NativeStackScreenProps<RootStackParamList, 'Expense'>;

export default function Expense({ navigation }: Props): JSX.Element {
  const [cost, setCost] = useState<number>(0);
  const [description, setDescription] = useState("");
  const costsCollectionRef = collection(db, "costs");
  const [costCreated, setCostCreated] = useState("")
  const [submitted, setSubmitted] = useState(false)
  const [user1,setUser1]=useState("1")
  const [user2,setUser2]=useState("2")
  const handleReset = () => {
    
    setDescription("");
    setCost(0);
    setCostCreated("");
    setSubmitted(false);
  };
  const handleSubmit = async () => {
    console.log("Submitting form");
    const usersNum = 2;
    const user1id = doc(db, "users", user1);
    const user2id = doc(db, "users", user2);
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
      <Text style={styles.itemText}>Paid by User {user1}, split with User {user2} </Text>

      <Button title="Submit" onPress={handleSubmit} />

      <Text>{!submitted ? null : costCreated}</Text>
      <View>
        <Button title="Clear" onPress={handleReset} />
      </View>
    </View>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ffaf",
    paddingTop: 80,
    paddingHorizontal: 20,
    alignItems: "center",
  },
  tasksWrapper: { paddingTop: 80, paddingHorizontal: 20, flex: 1 },
  sectionTitle: { fontSize: 24, fontWeight: "bold" },
  items: {},
  itemText: { maxWidth: "80%", backgroundColor: "white" },
});
