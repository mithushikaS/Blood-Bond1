
import React from "react";
import { View, Text, StyleSheet, FlatList } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const notifications = [
  {
    id: "1",
    message: "Upcoming Blood Donation Drive on August 15th at Central Park.",
  },
  { id: "2", message: "Urgent: A+ blood needed at Mercy Hospital." },
  { id: "3", message: "Thank you for your recent donation!" },
  { id: "4", message: "New donation center opened at Downtown." },
  // Add more notifications as needed
];

const NotificationScreen = () => {
  const renderItem = ({ item }) => (
    <View style={styles.notificationContainer}>
      <Text style={styles.notificationText}>{item.message}</Text>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.header}>Notifications</Text>
      <FlatList
        data={notifications}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.listContainer}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  header: {
    color: "#d40000",
    textAlign: "center",
    fontSize: 30,
    fontWeight: "bold",
    paddingVertical: 20,
    textShadowColor: "rgba(0, 0, 0, 0.5)", // Shadow color
    textShadowOffset: { width: 2, height: 2 }, // Shadow offset
    textShadowRadius: 5, // Shadow radius
  },
  listContainer: {
    paddingHorizontal: 20,
  },
  notificationContainer: {
    backgroundColor: "#f8d7da",
    padding: 15,
    marginVertical: 10,
    borderRadius: 10,
    borderLeftWidth: 5,
    borderLeftColor: "#d40000",
  },
  notificationText: {
    color: "#721c24",
    fontSize: 16,
  },
});

export default NotificationScreen;