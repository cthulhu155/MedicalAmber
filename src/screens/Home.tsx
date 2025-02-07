import React, { useEffect, useState } from 'react';
import { Image, View, Text, TextInput, FlatList, StyleSheet, TouchableOpacity } from 'react-native';

export default function Home() {

  const [reminders, setReminders] = useState<Reminder[]>([
    { id: '1', title: 'Take Medicine', time: '09:00 AM' },
    { id: '2', title: 'Doctor Appointment', time: '02:30 PM' },
  ]);

const renderReminderItem = ({ item }: { item: Reminder }) => (
  <TouchableOpacity style={styles.reminderItem}>
    <View>
      <Text style={styles.reminderTitle}>{item.title}</Text>
      <Text style={styles.reminderTime}>{item.time}</Text>
    </View>
  </TouchableOpacity>
);

  return (
   <View style={styles.screenContainer}>
      <Text style={styles.screenTitle}>Medical Reminders</Text>
      <FlatList<Reminder>
        data={reminders}
        renderItem={renderReminderItem}
        keyExtractor={(item) => item.id}
      />
    </View>
  );
}


const styles = StyleSheet.create({
  screenContainer: {
    flex: 1,
    backgroundColor: "#F5F5F5",
    padding: 20,
  },
  screenTitle: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 20,
    textAlign: 'center',
  },
  reminderList: {
    flex: 1,
  },
  reminderItem: {
    backgroundColor: 'white',
    padding: 15,
    borderRadius: 10,
    marginBottom: 10,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  reminderTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
    marginBottom: 5,
  },
  reminderTime: {
    fontSize: 14,
    color: '#666',
  },
});