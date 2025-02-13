import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, Modal, Alert } from "react-native";
import styles from "../utils/Styles/AddRemindersStyleSheet";
import { MedicineReminder } from "../types/Reminder.interface";

interface AddMedicineFormProps {
  visible: boolean;
  onAdd: (medicine: MedicineReminder) => void;
  onClose: () => void;
}

const INITIAL_MEDICINE_REMINDER: Omit<MedicineReminder, 'id'> & Partial<Pick<MedicineReminder, 'type'>> = {
  name: "",
  dosage: "",
  time: new Date().toISOString(),
  frequency: "1",
  type: "medication",
  notes: "",
  reminderSound: "default",
  isRecurring: false,
};

export default function AddMedicineForm({ visible, onAdd, onClose }: AddMedicineFormProps) {
  const [newMedicine, setNewMedicine] = useState(INITIAL_MEDICINE_REMINDER);

  const handleInputChange = (field: keyof typeof INITIAL_MEDICINE_REMINDER, value: string) => {
    setNewMedicine((prev) => ({ ...prev, [field]: value }));
  };

  const handleAddMedicine = () => {
    if (!newMedicine.name.trim() || !newMedicine.dosage.trim()) {
      Alert.alert("Error", "Todos los campos deben estar completos");
      return;
    }
    onAdd({ ...newMedicine, id: Date.now().toString() });
    setNewMedicine(INITIAL_MEDICINE_REMINDER);
    onClose();
  };

  return (
    <Modal visible={visible} transparent animationType="slide" onRequestClose={onClose}>
      <View style={styles.modalContainer}>
        <View style={styles.modalContent}>
          <Text style={{ fontSize: 20, fontWeight: 'bold', marginBottom: 10 }}>Añadir Nuevo Recordatorio</Text>

          <Text>Nombre:</Text>
          <TextInput style={styles.input} placeholder="Ej. Paracetamol" value={newMedicine.name} onChangeText={(text) => handleInputChange("name", text)} />

          <Text>Dosis:</Text>
          <TextInput style={styles.input} placeholder="Ej. 500mg" value={newMedicine.dosage} onChangeText={(text) => handleInputChange("dosage", text)} />

          <Text>Notas:</Text>
          <TextInput style={styles.input} placeholder="Notas adicionales" value={newMedicine.notes} onChangeText={(text) => handleInputChange("notes", text)} />

          <TouchableOpacity style={styles.confirmButton} onPress={handleAddMedicine}>
            <Text style={styles.confirmText}>Añadir Recordatorio</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.closeButton} onPress={onClose}>
            <Text style={styles.closeText}>Cancelar</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
}
