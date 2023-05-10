import CostCard from "./CostCard";
import {db} from "../../firebase"
import useAuth from '../../hooks/useAuth';
import {
  collection,
  getDocs,
  getDoc,
  doc,
  query,
  where,
  orderBy,
  or,
} from "firebase/firestore";
import { StyleSheet, View, Text,ScrollView  } from 'react-native'; 
import { useState, useEffect } from "react";

export default function Activity(): JSX.Element {
  const { user } = useAuth(); 
  const userRef = doc(db, "users", user.uid) 
  const costsCollectionRef = collection(db, "costs");
  const q = query(
    costsCollectionRef,
    or(where("userPaid", "==", userRef), where("userSplitWith", "==", userRef)),
    orderBy("timestamp", "desc")
  );
  const [costCard, setCostCard] = useState([]);
  useEffect(() => {
    const getCosts = async () => {
      const querySnapshot = await getDocs(q);
      const costData = [];
      await Promise.all(
        querySnapshot.docs.map(async (docu) => {
          const userSplitWithRef = doc(
            db,
            "users",
            docu.data().userSplitWith.id
          );
          const userPaidRef = doc(
            db,
            "users",
            docu.data().userPaid.id
          );
          const userSplitSnapshot = await getDoc(userSplitWithRef);
          const nameDataSplit = userSplitSnapshot.data().fullName;
          const userPaidSnapshot = await getDoc(userPaidRef);
          const nameDataPaid = userPaidSnapshot.data().fullName;
          const descData = docu.data().description;
          const costData1 = docu.data().cost;
          const timeDataDate = docu
            .data()
            .timestamp.toDate()
            .toLocaleDateString();
          const timeDataTime = docu
            .data()
            .timestamp.toDate()
            .toLocaleTimeString();
          const timeDate = timeDataTime + " " + timeDataDate;
          console.log(timeDate);
          const usersCostID = user.uid;
          costData.push({
            descData,
            costData1,
            timeDate,
            usersCostID,
            nameDataSplit,
            nameDataPaid,
          });
        })
      );
      setCostCard(costData);
    };
    getCosts();
  }, []);

  return (
    <ScrollView>
    <View>
      <Text className="text-xl">Activity</Text>
      <View style={styles.container}>
      <Text style={styles.title}>Costs posted by user</Text>
      <View>
        {costCard.map((item, index) => (
          <CostCard
            key={index}
            cost={item.costData1}
            description={item.descData}
            userID={item.nameDataPaid}
            name={item.nameDataSplit}
            time={item.timeDate}
          />
        ))}
      </View>
    </View>
    </View>
    </ScrollView>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F5F5F5",
    paddingHorizontal: 20,
    paddingTop: 50,
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    marginBottom: 20,
  },
  subtitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 10,
  },
  card: {
    marginTop: 10,
    backgroundColor: "#FFFFFF",
    borderRadius: 10,
    padding: 20,
    marginBottom: 20,
    elevation: 3,
  },
});

Note that I kept the styles for card
User
const styles = StyleSheet.create({
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 10,
    padding: 10,
    marginBottom: 10,
  },
  text: {
    fontSize: 16,
    marginBottom: 5,
  },
});

add thin black border
ChatGPT

To add a thin black border to the CostCard, you can add a borderWidth property to the card style in your StyleSheet.create() function. Here's an updated version of the styles object:

php

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 10,
    padding: 10,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: '#000000',
  },
  text: {
    fontSize: 16,
    marginBottom: 5,
  },
});

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F5F5F5",
    paddingHorizontal: 15,
    paddingTop: 50,
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    marginBottom: 20,
  },
  subtitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 10,
  },
  cardContainer: {
    backgroundColor: "#FFFFFF",
    borderRadius: 10,
    padding: 20,
    marginBottom: 20,
    elevation: 3,
  },
  card: {
    backgroundColor: "#FFFFFF",
    borderRadius: 10,
    padding: 10,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: "#000000",
  },
  text: {
    fontSize: 16,
    marginBottom: 5,
  },
});




  

