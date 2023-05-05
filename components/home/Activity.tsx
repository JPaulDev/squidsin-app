import CostCard from "./CostCard";
import {db} from "../../firebase"
import {
  collection,
  getDocs,
  getDoc,
  doc,
  query,
  where,
  orderBy,
} from "firebase/firestore";
import { StyleSheet, View, Text,ScrollView  } from 'react-native'; 
import { useState, useEffect } from "react";

export default function Activity(): JSX.Element {
  const costsCollectionRef = collection(db, "costs");
  const [currentUser, setCurrentUser] = useState("1");
  const userRef = doc(db, "users", currentUser);
  const q = query(
    costsCollectionRef,
    where("userPaid", "==", userRef),
    orderBy("timestamp", "desc")
  );
  const [costCard, setCostCard] = useState([]);
  useEffect(() => {
    const getCosts = async () => {
      const querySnapshot = await getDocs(q);
      const currentUserName = await getDoc(doc(db, "users", currentUser));
      const nameDataCurrent = currentUserName.data().name;
      const costData = [];
      await Promise.all(
        querySnapshot.docs.map(async (docu) => {
          const userSplitWithRef = doc(
            db,
            "users",
            docu.data().userSplitWith.id
          );
          const userSplitSnapshot = await getDoc(userSplitWithRef);
          const nameData = userSplitSnapshot.data().name;
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
          const usersCostID = currentUser;
          costData.push({
            descData,
            costData1,
            timeDate,
            usersCostID,
            nameData,
            nameDataCurrent,
          });
        })
      );
      setCostCard(costData);
    };
    getCosts();
    console.log(costCard, "costCard");
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
            userID={item.nameDataCurrent}
            name={item.nameData}
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
    backgroundColor: "#C9EFFFF",
    marginTop: 50,
  },
  title: { fontSize: 20 },
});



  

