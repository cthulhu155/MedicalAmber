import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, Modal, Alert } from "react-native";
import { Calendar } from "react-native-calendars";
import styles from "../../../../utils/Styles/AddRemindersStyleSheet";
import { MedicineReminder } from "../../../../types/Reminder.interface";
import { AddMedicineFormProps } from "../../../../types/AddMedicineFormProps.interface";

const INITIAL_MEDICINE_REMINDER: Omit<MedicineReminder, 'id'> & Partial<Pick<MedicineReminder, 'type'>> = {
  name: "",
  dosage: "",
  time: new Date().toISOString(),
  frequency: "1",
  type: "medication",
  notes: "",             // Se agrega la propiedad 'notes'
  pillQuantity: "",      // Nuevo campo para la cantidad de pastillas
  intervalHours: "",     // Nuevo campo para cada cuántas horas se debe tomar
  reminderSound: "default",
  isRecurring: false,
};

export default function AddMedicineForm({ visible, onAdd, onClose }: AddMedicineFormProps) {
  const [newMedicine, setNewMedicine] = useState(INITIAL_MEDICINE_REMINDER);
  const [isRecurring, setIsRecurring] = useState(false);
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [selectedDates, setSelectedDates] = useState<Record<string, { selected: boolean; marked: boolean }>>({});

  const handleInputChange = (field: string, value: string) => {
    setNewMedicine((prev) => ({ ...prev, [field]: value }));
  };

  // Handle calendar date selection
  const handleDayPress = (day: { dateString: string }) => {
    if (!startDate || (startDate && endDate)) {
      // Start new selection
      setStartDate(day.dateString);
      setEndDate('');
      setSelectedDates({
        [day.dateString]: { selected: true, marked: true }
      });
    } else {
      // Complete the range selection
      const start = new Date(startDate);
      const end = new Date(day.dateString);
      
      if (end < start) {
        setStartDate(day.dateString);
        setEndDate('');
        setSelectedDates({
          [day.dateString]: { selected: true, marked: true }
        });
        return;
      }

      setEndDate(day.dateString);
      
      // Generate dates between start and end
      const dates: Record<string, { selected: boolean; marked: boolean }> = {};
      let currentDate = new Date(start);
      
      while (currentDate <= end) {
        const dateString = currentDate.toISOString().split('T')[0];
        dates[dateString] = { selected: true, marked: true };
        currentDate.setDate(currentDate.getDate() + 1);
      }
      
      setSelectedDates(dates);
    }
  };

  const handleAddMedicine = () => {
    if (!newMedicine.name.trim() || !newMedicine.dosage.trim()) {
      Alert.alert("Error", "Todos los campos deben estar completos");
      return;
    }
    const reminder = {
      ...newMedicine,
      id: Date.now().toString(),
      isRecurring,
      selectedDates: isRecurring ? selectedDates : null,
      startDate,
      endDate,
    };
    onAdd(reminder);
    setNewMedicine(INITIAL_MEDICINE_REMINDER);
    setIsRecurring(false);
    setSelectedDates({});
    setStartDate('');
    setEndDate('');
    onClose();
  };

  return (
    <Modal visible={visible} transparent animationType="slide" onRequestClose={onClose}>
      <View style={styles.modalContainer}>
        <View style={styles.modalContent}>
          <Text style={{ fontSize: 20, fontWeight: 'bold', marginBottom: 10 }}>Añadir Nuevo Recordatorio</Text>

          <Text>Nombre:</Text>
          <TextInput
            style={styles.input}
            placeholder="Ej. Paracetamol"
            value={newMedicine.name}
            onChangeText={(text) => handleInputChange("name", text)}
          />

          <Text>Dosis:</Text>
          <TextInput
            style={styles.input}
            placeholder="Ej. 500mg"
            value={newMedicine.dosage}
            onChangeText={(text) => handleInputChange("dosage", text)}
          />

          <Text style={{ marginTop: 10 }}>Cantidad de pastillas y cada cuántas horas:</Text>
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <TextInput
              style={[styles.input, { flex: 1, marginRight: 5 }]}
              placeholder="Cantidad de pastillas"
              keyboardType="numeric"
              value={newMedicine.pillQuantity}
              onChangeText={(text) => {
                const numericValue = text.replace(/[^0-9]/g, "");
                handleInputChange("pillQuantity", numericValue);
              }}
              maxLength={3}
            />
            <Text>X.</Text>
            <TextInput
              style={[styles.input, { flex: 1, marginLeft: 5 }]}
              placeholder="Cada cuántas horas"
              keyboardType="numeric"
              value={newMedicine.intervalHours}
              onChangeText={(text) => {
                const numericValue = text.replace(/[^0-9]/g, "");
                handleInputChange("intervalHours", numericValue);
              }}
              maxLength={2}
            />
          </View>

          <View>
            <Text style={{ marginTop: 10 }}>Selecciona rango de fechas:</Text>
            <Text style={{ fontSize: 12, color: '#666' }}>
              {startDate ? `Inicio: ${startDate}` : 'Selecciona fecha inicial'}
              {endDate ? ` - Fin: ${endDate}` : ''}
            </Text>
            <Calendar
              onDayPress={handleDayPress}
              markedDates={selectedDates}
              markingType="period"
            />
          </View>

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