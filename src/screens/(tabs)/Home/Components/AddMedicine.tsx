import React, { useState, useEffect } from "react";
import { 
  View, Text, TextInput, TouchableOpacity, Modal, Alert, 
  KeyboardAvoidingView, Platform, ScrollView 
} from "react-native";
import { Calendar } from "react-native-calendars";
import DateTimePicker from "@react-native-community/datetimepicker";
import styles from "../../../../utils/Styles/AddRemindersStyleSheet";
import { MedicineReminder } from "../../../../types/Reminder.interface";
import { AddMedicineFormProps } from "../../../../types/AddMedicineFormProps.interface";

const INITIAL_MEDICINE_REMINDER: Omit<MedicineReminder, 'id'> & Partial<Pick<MedicineReminder, 'type'>> = {
  name: "",
  dosage: "",
  time: new Date().toISOString(),
  frequency: "1",
  type: "medication" as "medication",
  notes: "",
  pillQuantity: "",
  intervalHours: "",
  reminderSound: "default",
  isRecurring: false,
};

export default function AddMedicineForm({ visible, onAdd, onUpdate, onClose, reminderToEdit }: AddMedicineFormProps) {
  // Si existe reminderToEdit, inicializamos el estado con él; si no, usamos el valor por defecto.
  const [newMedicine, setNewMedicine] = useState<MedicineReminder>(
    reminderToEdit ? reminderToEdit : { ...INITIAL_MEDICINE_REMINDER, id: '' }
  );
  const [isRecurring, setIsRecurring] = useState(reminderToEdit ? reminderToEdit.isRecurring : false);
  const [startDate, setStartDate] = useState(reminderToEdit ? reminderToEdit.startDate || '' : '');
  const [endDate, setEndDate] = useState(reminderToEdit ? reminderToEdit.endDate || '' : '');
  const [selectedDates, setSelectedDates] = useState(
    reminderToEdit && reminderToEdit.selectedDates ? reminderToEdit.selectedDates : {}
  );

  // Estados para la hora
  const [time, setTime] = useState(new Date(newMedicine.time));
  const [showTimePicker, setShowTimePicker] = useState(false);

  // Actualizamos el estado si cambia reminderToEdit
  useEffect(() => {
    if (reminderToEdit) {
      setNewMedicine(reminderToEdit);
      setIsRecurring(reminderToEdit.isRecurring);
      setStartDate(reminderToEdit.startDate || '');
      setEndDate(reminderToEdit.endDate || '');
      setSelectedDates(reminderToEdit.selectedDates || {});
      setTime(new Date(reminderToEdit.time));
    } else {
      setNewMedicine({ ...INITIAL_MEDICINE_REMINDER, id: '' });
      setIsRecurring(false);
      setStartDate('');
      setEndDate('');
      setSelectedDates({});
      setTime(new Date());
    }
  }, [reminderToEdit]);

  const handleInputChange = (field: string, value: string) => {
    setNewMedicine((prev) => ({ ...prev, [field]: value }));
  };

  // Maneja la selección de fechas en el calendario
  const handleDayPress = (day: { dateString: string }) => {
    if (!startDate || (startDate && endDate)) {
      setStartDate(day.dateString);
      setEndDate('');
      setSelectedDates({
        [day.dateString]: { selected: true, marked: true }
      });
    } else {
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

  // Manejar cambios de hora
  const handleTimeChange = (event: any, selectedTime?: Date) => {
    setShowTimePicker(Platform.OS === 'ios');
    if (selectedTime) {
      setTime(selectedTime);
      setNewMedicine((prev) => ({
        ...prev,
        time: selectedTime.toISOString(),
      }));
    }
  };

  // Función para confirmar la acción (agregar o actualizar)
  const handleConfirm = () => {
    if (!newMedicine.name.trim() || !newMedicine.dosage.trim()) {
      Alert.alert("Error", "Todos los campos deben estar completos");
      return;
    }

    const reminder: MedicineReminder = {
      ...newMedicine,
      id: reminderToEdit ? newMedicine.id : Date.now().toString(),
      isRecurring,
      selectedDates: isRecurring ? selectedDates : null,
      startDate,
      endDate,
    };

    if (reminderToEdit && onUpdate) {
      onUpdate(reminder);
    } else {
      onAdd(reminder);
    }

    // Reiniciamos los estados
    setNewMedicine({ ...INITIAL_MEDICINE_REMINDER, id: '' });
    setIsRecurring(false);
    setSelectedDates({});
    setStartDate('');
    setEndDate('');
    setTime(new Date());
    onClose();
  };

  return (
    <Modal visible={visible} transparent animationType="slide" onRequestClose={onClose}>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={styles.keyboardcontainer}
        keyboardVerticalOffset={Platform.OS === "ios" ? 100 : 0}
      >
        <ScrollView contentContainerStyle={styles.modalContent}>
          <Text style={{ fontSize: 20, fontWeight: 'bold', marginBottom: 10 }}>
            {reminderToEdit ? "Editar Recordatorio" : "Añadir Nuevo Recordatorio"}
          </Text>

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

          <Text style={{ marginTop: 10 }}>
            Cantidad de pastillas y cada cuántas horas:
          </Text>
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
            <Text>X</Text>
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

          <View style={{ marginTop: 10 }}>
            <Text>Selecciona rango de fechas:</Text>
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

          <View style={{ marginTop: 10 }}>
            <Text>Seleccionar hora de inicio:</Text>
            <TouchableOpacity
              style={[styles.input, { justifyContent: 'center' }]}
              onPress={() => setShowTimePicker(true)}
            >
              <Text>{new Date(newMedicine.time).toLocaleTimeString()}</Text>
            </TouchableOpacity>
          </View>

          {showTimePicker && (
            <DateTimePicker
              value={time}
              mode="time"
              display={'default'}
              onChange={handleTimeChange}
            />
          )}

          <TouchableOpacity style={styles.confirmButton} onPress={handleConfirm}>
            <Text style={styles.confirmText}>
              {reminderToEdit ? "Actualizar Recordatorio" : "Añadir Recordatorio"}
            </Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.closeButton} onPress={onClose}>
            <Text style={styles.closeText}>Cancelar</Text>
          </TouchableOpacity>
        </ScrollView>
      </KeyboardAvoidingView>
    </Modal>
  );
}
