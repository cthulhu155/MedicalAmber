import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, Modal, Alert } from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";
import { Picker } from "@react-native-picker/picker";
import styles from "../utils/Styles/AddRemindersStyleSheet";

interface AddMedicineFormProps {
  visible: boolean;
  onAdd: (medicine: { id: string; name: string; dosage: string; time: string; frequency: string }) => void;
  onClose: () => void;
}

export default function AddMedicineForm({ visible, onAdd, onClose }: AddMedicineFormProps) {
  const [newMedicine, setNewMedicine] = useState({
    name: "",
    dosage: "",
    time: new Date().toISOString(),
    frequency: "1",
  });
  const [showTimePicker, setShowTimePicker] = useState(false);

  const handleTimeChange = (_event: unknown, selectedTime?: Date) => {
    setShowTimePicker(false);
    if (selectedTime) {
      setNewMedicine((prev) => ({ ...prev, time: selectedTime.toISOString() }));
    }
  };

  const handleAddMedicine = () => {
    if (!newMedicine.name.trim() || !newMedicine.dosage.trim()) {
      Alert.alert("Error", "Todos los campos deben estar completos");
      return;
    }
    onAdd({ ...newMedicine, id: Date.now().toString() });
    setNewMedicine({ name: "", dosage: "", time: new Date().toISOString(), frequency: "1" });
    onClose();
  };
  return (
    <Modal visible={visible} transparent animationType="slide" onRequestClose={onClose}>
      <View style={styles.modalContainer}>
        <View style={styles.modalContent}>
          <Text>Nombre del Medicamento</Text>
          <TextInput
            style={styles.input}
            placeholder="Ej. Paracetamol"
            value={newMedicine.name}
            onChangeText={(text) => setNewMedicine((prev) => ({ ...prev, name: text }))}
          />
          
          <TouchableOpacity style={styles.confirmButton} onPress={handleAddMedicine}>
            <Text style={styles.confirmText}>Añadir</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.closeButton} onPress={onClose}>
            <Text style={styles.closeText}>Cerrar</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
}
