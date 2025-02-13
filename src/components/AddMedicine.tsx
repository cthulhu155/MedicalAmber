import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, Modal, FlatList, SafeAreaView, ScrollView,} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { Ionicons } from "@expo/vector-icons";
import DateTimePicker from "@react-native-community/datetimepicker";
import { Picker } from "@react-native-picker/picker";
import styles from "../utils/Styles/AddRemindersStyleSheet";

export default function MedicalReminders() {
  const [modalVisible, setModalVisible] = useState(false);
  const [reminders, setReminders] = useState<ReminderAdd[]>([]);
  const [newMedicine, setNewMedicine] = useState({
    name: "",
    dosage: "",
    time: new Date(),
    frequency: "1",
  });
  const [showTimePicker, setShowTimePicker] = useState(false);

  const handleTimeChange = (event: any, selectedTime?: Date) => {
    setShowTimePicker(false);
    if (selectedTime) {
      setNewMedicine({ ...newMedicine, time: selectedTime.toISOString() }); // no se pq marca error si ya se supone que es stringxDDDDD
    }
  };


  const handleAddMedicine = () => {
  if (newMedicine.name.trim() === "" || newMedicine.dosage.trim() === "") return;
  setReminders([...reminders, { ...newMedicine, id: Date.now().toString(), time: newMedicine.time.toString() }]);
  setNewMedicine({ name: "", dosage: "", time: new Date().toISOString(), frequency: "1" }); // no se pq marca error si ya se supone que es stringxDDDDD
  setModalVisible(false);
};


  return (
    <SafeAreaView style={styles.container}>
      <LinearGradient colors={["#f5f5f5", "#e0e0e0"]} style={styles.gradient}>
        <View style={styles.header}>
          <Text style={styles.headerTitle}>Medical Reminders</Text>
          <Ionicons name="medical-outline" size={24} color="#333" />
        </View>

        <ScrollView>
          {reminders.length === 0 ? (
            <View style={styles.noReminders}>
              <Ionicons name="notifications-off-outline" size={50} color="#ccc" />
              <Text>No Reminders</Text>
            </View>
          ) : (
            <FlatList
              data={reminders}
              keyExtractor={(item) => item.id}
              renderItem={({ item }) => (
                <View style={styles.reminderCard}>
                  <Text>{item.name} - {item.dosage}</Text>
                  <Text>Hora: {new Date(item.time).toLocaleTimeString()}</Text>
                  <Text>Días: {item.frequency}</Text>
                </View>
              )}
            />
          )}
        </ScrollView>

        <TouchableOpacity style={styles.addButton} onPress={() => setModalVisible(true)}>
          <Ionicons name="add-circle" size={60} color="#333" />
        </TouchableOpacity>

        <Modal visible={modalVisible} transparent animationType="slide">
          <View style={styles.modalContainer}>
            <View style={styles.modalContent}>
              <Text>Nombre del Medicamento</Text>
              <TextInput
                style={styles.input}
                placeholder="Ej. Paracetamol"
                value={newMedicine.name}
                onChangeText={(text) => setNewMedicine({ ...newMedicine, name: text })}
              />
              
              <Text>Dosis</Text>
              <TextInput
                style={styles.input}
                placeholder="Ej. 500mg"
                value={newMedicine.dosage}
                onChangeText={(text) => setNewMedicine({ ...newMedicine, dosage: text })}
              />
              
              <Text>Hora</Text>
              <TouchableOpacity onPress={() => setShowTimePicker(true)}>
                <Text style={styles.timePicker}>{newMedicine.time.toLocaleTimeString()}</Text>
              </TouchableOpacity>
              {showTimePicker && (
                <DateTimePicker value={newMedicine.time} mode="time" onChange={handleTimeChange} />
              )}
              
              <Text>Días de Toma</Text>
              <Picker
                selectedValue={newMedicine.frequency}
                onValueChange={(itemValue) => setNewMedicine({ ...newMedicine, frequency: itemValue })}
              >
                {[...Array(30).keys()].map((day) => (
                  <Picker.Item key={day} label={`${day + 1} días`} value={`${day + 1}`} />
                ))}
              </Picker>
              
              <TouchableOpacity style={styles.confirmButton} onPress={handleAddMedicine}>
                <Text style={styles.confirmText}>Añadir</Text>
              </TouchableOpacity>
              
              <TouchableOpacity style={styles.closeButton} onPress={() => setModalVisible(false)}>
                <Text style={styles.closeText}>Cerrar</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>
      </LinearGradient>
    </SafeAreaView>
  );
}
