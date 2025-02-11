import React, { useEffect, useState } from 'react';
import { Image, View, Text, TextInput, FlatList, StyleSheet, TouchableOpacity, SafeAreaView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import styles from '../utils/Styles/HomeStyleSheet';

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
