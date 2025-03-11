import React, { useState } from 'react';
import { View, Text, SafeAreaView, StatusBar, Button } from 'react-native';
import { useReminders } from '../../../hooks/useReminders';
import { MedicineReminder } from '../../../types/Reminder.interface';
import HomeHeader from './Components/HomeHeader';
import AddMedicineForm from './Components/AddMedicine';
import HomeList from './Components/HomeList';
import baseStyles from './Styles/HomeStyleSheet';
import { scheduleOneTimeNotification } from '../../../utils/config/NotificationService';
import * as Notifications from 'expo-notifications';

export default function HomeScreen() {
  const {
    reminders,
    refreshing,
    onRefresh,
    addReminder,
    deleteReminder,
    updateReminder,
    updateReminderTime,
  } = useReminders();
  const [isModalVisible, setModalVisible] = useState(false);
  const [reminderToEdit, setReminderToEdit] = useState<MedicineReminder | undefined>(undefined);

  // Abre el formulario para editar
  const handleEditMedicine = (reminder: MedicineReminder) => {
    setReminderToEdit(reminder);
    setModalVisible(true);
  };

  // Agrega o actualiza el recordatorio y programa la notificación
  const handleAddMedicine = async (newMedicine: MedicineReminder) => {
    let reminderId: string = '';
    
    if (reminderToEdit) {
      await updateReminder(reminderToEdit.id, newMedicine);
      reminderId = reminderToEdit.id;
    } else {
      await addReminder({ ...newMedicine, type: 'medication' });
      // Se busca el recordatorio recién agregado; idealmente, addReminder debería retornar el id.
      const addedReminder = reminders.find(
        (r) =>
          r.name === newMedicine.name &&
          r.time === newMedicine.time &&
          r.dosage === newMedicine.dosage
      );
      reminderId = addedReminder ? addedReminder.id : '';
    }

    setModalVisible(false);
    setReminderToEdit(undefined);

    const reminderDate = new Date(newMedicine.time);
    const intervalHours = parseInt(newMedicine.intervalHours || '0', 10);

    // Programa la notificación y obtiene el notificationId
    const notificationId = await scheduleOneTimeNotification(
      'Recordatorio de medicamento',
      `Es hora de tomar ${newMedicine.name} (${newMedicine.dosage}).`,
      reminderDate,
      reminderId,
      intervalHours
    );

    // Actualiza el recordatorio para guardar el notificationId
    if (reminderId) {
      await updateReminderTime(reminderId, newMedicine.time, notificationId);
    }
  };

  // Función para cancelar todas las notificaciones programadas
  const clearNotifications = async () => {
    await Notifications.cancelAllScheduledNotificationsAsync();
    console.log("Todas las notificaciones han sido canceladas");
  };

  return (
    <SafeAreaView style={[baseStyles.safeArea, { backgroundColor: '#F8F9FA' }]}>
      <StatusBar barStyle="dark-content" backgroundColor="#F8F9FA" />

      <HomeHeader
        onAddPress={() => {
          setModalVisible(true);
          setReminderToEdit(undefined);
        }}
      />

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
        reminderToEdit={reminderToEdit}
      />

      <View style={{ margin: 20 }}>
        <Button title="Cancelar todas las notificaciones" onPress={clearNotifications} />
      </View>
    </SafeAreaView>
  );
}
