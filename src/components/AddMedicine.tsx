import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, Modal } from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";
import { Picker } from "@react-native-picker/picker";
import styles from "../utils/Styles/AddRemindersStyleSheet";

interface AddMedicineFormProps {
  onAdd: (medicine: { id: string; name: string; dosage: string; time: string; frequency: string }) => void;
  onClose: () => void;
}

export default function AddMedicineForm({ onAdd, onClose }: AddMedicineFormProps) {
  const [newMedicine, setNewMedicine] = useState({
    name: "",
    dosage: "",
    time: new Date().toISOString(),
    frequency: "1",
  });
  const [showTimePicker, setShowTimePicker] = useState(false);

  const handleTimeChange = (event: unknown, selectedTime?: Date) => {
    setShowTimePicker(false);
    if (selectedTime) {
      setNewMedicine({ ...newMedicine, time: selectedTime.toISOString() });
    }
  };

  const handleAddMedicine = () => {
    if (newMedicine.name.trim() === "" || newMedicine.dosage.trim() === "") return;
    onAdd({ ...newMedicine, id: Date.now().toString() });
    setNewMedicine({ name: "", dosage: "", time: new Date().toISOString(), frequency: "1" });
    onClose();
  };

  return (
    <Modal visible={true} transparent animationType="slide">
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
            <Text style={styles.timePicker}>{new Date(newMedicine.time).toLocaleTimeString()}</Text>
          </TouchableOpacity>
          {showTimePicker && (
            <DateTimePicker value={new Date(newMedicine.time)} mode="time" onChange={handleTimeChange} />
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
          
          <TouchableOpacity style={styles.closeButton} onPress={onClose}>
            <Text style={styles.closeText}>Cerrar</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
}
