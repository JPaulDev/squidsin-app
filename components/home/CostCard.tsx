import React from "react";
import { View, Text, StyleSheet } from "react-native";

const CostCard = ({ cost, description, userID, name, time }) => {
  return (
    <View style={styles.card}>
      <Text style={styles.text}>Cost: {cost}</Text>
      <Text style={styles.text}>Description: {description}</Text>
      <Text style={styles.text}>Who paid: {userID}</Text>
      <Text style={styles.text}>Split with: {name}</Text>
      <Text style={styles.text}>Time: {time}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#FFB3CBFF",
    borderRadius: 10,
    padding: 10,
    marginBottom: 10,
  },
  text: {
    fontSize: 16,
    marginBottom: 5,
  },
});

export default CostCard;
