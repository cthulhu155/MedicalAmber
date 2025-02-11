import React, { useEffect, useState } from 'react';
import { Image, View, Text, TextInput, FlatList, StyleSheet, TouchableOpacity, SafeAreaView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export default function Home() {
  const [reminders, setReminders] = useState<Reminder[]>([
    { id: '1', title: 'Take Medicine', time: '09:00 AM', type: 'medication' },
    { id: '2', title: 'Doctor Appointment', time: '02:30 PM', type: 'appointment' },
  ]);

  const renderReminderItem = ({ item }: { item: Reminder }) => (
    <TouchableOpacity style={styles.reminderItem}>
      <View style={styles.reminderContent}>
        <View style={styles.iconContainer}>
          <Ionicons 
            name={item.type === 'medication' ? 'medical' : 'calendar'} 
            size={24} 
            color="#4A90E2"
          />
        </View>
        <View style={styles.textContainer}>
          <Text style={styles.reminderTitle}>{item.title}</Text>
          <Text style={styles.reminderTime}>{item.time}</Text>
        </View>
        <Ionicons name="chevron-forward" size={24} color="#CCCCCC" />
      </View>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.screenContainer}>
        <View style={styles.header}>
          <Text style={styles.screenTitle}>Medical Reminders</Text>
          <TouchableOpacity style={styles.addButton}>
            <Ionicons name="add-circle" size={32} color="#4A90E2" />
          </TouchableOpacity>
        </View>
        <FlatList<Reminder>
          data={reminders}
          renderItem={renderReminderItem}
          keyExtractor={(item) => item.id}
          contentContainerStyle={styles.listContainer}
          showsVerticalScrollIndicator={false}
        />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#F5F5F5",
  },
  screenContainer: {
    flex: 1,
    padding: 20,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  listContainer: {
    flexGrow: 1,
    paddingBottom: 20,
  },
  screenTitle: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#333",
  },
  addButton: {
    padding: 5,
  },
  reminderItem: {
    backgroundColor: 'white',
    padding: 15,
    borderRadius: 15,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
  },
  reminderContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  iconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#EDF5FF',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 15,
  },
  textContainer: {
    flex: 1,
  },
  reminderTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
    marginBottom: 4,
  },
  reminderTime: {
    fontSize: 14,
    color: '#666',
  },
});