import React, { useState, useCallback } from "react";
import { 
  View, Text, SafeAreaView, ScrollView, TouchableOpacity, Modal, useWindowDimensions 
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { Ionicons } from "@expo/vector-icons";
import AddMedicineForm from "../components/AddMedicine"; 
import styles from "../utils/Styles/MedicalRemindersStyleSheet";
import { MedicineReminder } from "../types/Reminder.interface";

export default function MedicalReminders() {
  const { width } = useWindowDimensions();
  const BASE_WIDTH = 375;
  const scaleFactor = width / BASE_WIDTH;

  const [modalVisible, setModalVisible] = useState(false);
  const [reminders, setReminders] = useState<MedicineReminder[]>([]);

  const handleAddReminder = useCallback((newMedicine: MedicineReminder) => {
    setReminders((prevReminders) => [...prevReminders, newMedicine]);
    setModalVisible(false);
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <LinearGradient colors={["#f5f5f5", "#e0e0e0"]} style={styles.gradient}>
        <View style={styles.header}>
          <Text style={[styles.headerTitle, { fontSize: 24 * scaleFactor }]}>Medical Reminders</Text>
          <Ionicons style={styles.icon} name="medical-outline" size={24 * scaleFactor} color="#333" />
        </View>

        <ScrollView contentContainerStyle={styles.scrollContainer} showsVerticalScrollIndicator={false}>
          {reminders.length === 0 ? (
            <View style={styles.card}>
              <Ionicons name="notifications-off-outline" size={50 * scaleFactor} color="#ccc" />
              <Text style={[styles.cardTitle, { fontSize: 20 * scaleFactor }]}>No Reminders</Text>
              <Text style={[styles.cardText, { fontSize: 16 * scaleFactor }]}>You don't have any medical reminders. Click the "+" button to add one!</Text>
            </View>
          ) : (
            reminders.map((reminder) => (
              <View key={reminder.id} style={styles.reminderCard}>
                <Text style={[styles.reminderTitle, { fontSize: 18 * scaleFactor }]}>{reminder.name}</Text>
                <Text style={[styles.reminderText, { fontSize: 16 * scaleFactor }]}>Dosage: {reminder.dosage}</Text>
                <Text style={[styles.reminderText, { fontSize: 16 * scaleFactor }]}>Time: {new Date(reminder.time).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}</Text>
                <Text style={[styles.reminderText, { fontSize: 16 * scaleFactor }]}>Frequency: {reminder.frequency} days</Text>
              </View>
            ))
          )}
        </ScrollView>

      <TouchableOpacity style={styles.addButton} onPress={() => setModalVisible(true)} accessibilityLabel="Add a new medicine reminder">

        <Ionicons name="add-circle" size={60 * scaleFactor} color="#333" />

      </TouchableOpacity>

        <AddMedicineForm visible={modalVisible} onAdd={handleAddReminder} onClose={() => setModalVisible(false)} />

        </LinearGradient>
    </SafeAreaView>
  );
}
