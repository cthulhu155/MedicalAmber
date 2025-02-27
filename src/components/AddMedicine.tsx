import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, Modal, Alert } from "react-native";
import styles from "../utils/Styles/AddRemindersStyleSheet";
import { MedicineReminder } from "../types/Reminder.interface";
import { AddMedicineFormProps } from "../types/AddMedicineFormProps.interface";

// Estado inicial para un nuevo recordatorio de medicamento
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

/**
 * @param visible - controls modal visibility
 * @param onAdd   - callback function when adding a new reminder
 * @param onClose - callback function to close the modal
 */
export default function AddMedicineForm({ visible, onAdd, onClose }: AddMedicineFormProps) {
  const [newMedicine, setNewMedicine] = useState(INITIAL_MEDICINE_REMINDER);

  // Manejador genérico para actualizar los campos del formulario
  const handleInputChange = (field: keyof typeof INITIAL_MEDICINE_REMINDER, value: string) => {
    setNewMedicine((prev) => ({ ...prev, [field]: value }));
  };

  // Valida y envía el nuevo recordatorio de medicamento
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
    // Componente Modal para añadir nuevo recordatorio de medicamento
    <Modal visible={visible} transparent animationType="slide" onRequestClose={onClose}>
      {/* Contenedor para todo el modal */}
      <View style={styles.modalContainer}>
        {/* Envoltorio del contenido con estilos */}
        <View style={styles.modalContent}>
          {/* Título del formulario */}
          <Text style={{ fontSize: 20, fontWeight: 'bold', marginBottom: 10 }}>Añadir Nuevo Recordatorio</Text>

          {/* Campo de entrada para el nombre del medicamento */}
          <Text>Nombre:</Text>
          <TextInput 
            style={styles.input} 
            placeholder="Ej. Paracetamol" 
            value={newMedicine.name} 
            onChangeText={(text) => handleInputChange("name", text)} 
          />

          {/* Campo de entrada para la dosis */}
          <Text>Dosis:</Text>
          <TextInput 
            style={styles.input} 
            placeholder="Ej. 500mg" 
            value={newMedicine.dosage} 
            onChangeText={(text) => handleInputChange("dosage", text)} 
          />

          {/* Campo de entrada para notas adicionales */}
          <Text>Notas:</Text>
          <TextInput 
            style={styles.input} 
            placeholder="Notas adicionales" 
            value={newMedicine.notes} 
            onChangeText={(text) => handleInputChange("notes", text)} 
          />

          {/* Botón de enviar */}
          <TouchableOpacity style={styles.confirmButton} onPress={handleAddMedicine}>
            <Text style={styles.confirmText}>Añadir Recordatorio</Text>
          </TouchableOpacity>

          {/* Botón de cancelar */}
          <TouchableOpacity style={styles.closeButton} onPress={onClose}>
            <Text style={styles.closeText}>Cancelar</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
}
