// Home.tsx
import React, { useState } from 'react';
import { View, Text, SafeAreaView, StatusBar, Button } from 'react-native';
import { useReminders } from '../../../hooks/useReminders';
import { MedicineReminder } from '../../../types/Reminder.interface';
import HomeHeader from './Components/HomeHeader';
import AddMedicineForm from './Components/AddMedicine';
import HomeList from './Components/HomeList';
import baseStyles from './Styles/HomeStyleSheet';

export default function HomeScreen() {
  const { reminders, refreshing, onRefresh, addReminder, deleteReminder, updateReminder } = useReminders();
  const [isModalVisible, setModalVisible] = useState(false);
  const [reminderToEdit, setReminderToEdit] = useState<MedicineReminder | undefined>(undefined);

  // Función para abrir el formulario en modo edición
  const handleEditMedicine = (reminder: MedicineReminder) => {
    setReminderToEdit(reminder);
    setModalVisible(true);
  };

  // Función para agregar un recordatorio nuevo
  const handleAddMedicine = (newMedicine: MedicineReminder) => {
    // Si viene en modo edición, se actualiza en Firebase y en el estado local
    if (reminderToEdit) {
      updateReminder(reminderToEdit.id, newMedicine);
    } else {
      addReminder({ ...newMedicine, type: 'medication' });
    }
    setModalVisible(false);
    setReminderToEdit(undefined);
  };

  return (
    <SafeAreaView style={[baseStyles.safeArea, { backgroundColor: '#F8F9FA' }]}>
      <StatusBar barStyle="dark-content" backgroundColor="#F8F9FA" />

      <HomeHeader onAddPress={() => { setModalVisible(true); setReminderToEdit(undefined); }} />

      <View
        style={[
          baseStyles.warningContainer,
          {
            padding: 12,
            backgroundColor: '#FFF3CD',
            borderRadius: 10,
            marginBottom: 16,
          },
        ]}
      >
        <Text style={{ fontSize: 14, fontWeight: '600', color: '#856404' }}>
          ⚠️ Aviso importante:
        </Text>
        <Text style={{ fontSize: 12, color: '#856404', marginTop: 4 }}>
          Esta aplicación es solo para fines informativos. No fomenta la automedicación.
          Consulte siempre a su médico antes de tomar cualquier medicamento.
        </Text>
      </View>

      <HomeList
        reminders={reminders}
        refreshing={refreshing}
        onRefresh={onRefresh}
        onDeleteReminder={deleteReminder}
        onEditReminder={handleEditMedicine} 
      />

      <AddMedicineForm
        visible={isModalVisible}
        onAdd={handleAddMedicine}
        onClose={() => {
          setModalVisible(false);
          setReminderToEdit(undefined);
        }}
        reminderToEdit={reminderToEdit}  // Se pasa el recordatorio a editar (si existe)
      />
    </SafeAreaView>
  );
}
