// src/screens/(tabs)/Home/Home.tsx
import React, { useState } from 'react';
import { View, Text, SafeAreaView, StatusBar, Button, Alert, Linking } from 'react-native';
import { useReminders } from '../../../hooks/useReminders';
import { MedicineReminder } from '../../../types/Reminder.interface';
import HomeHeader from './Components/HomeHeader';
import AddMedicineForm from './Components/AddMedicine';
import HomeList from './Components/HomeList';
import baseStyles from './Styles/HomeStyleSheet';
import { scheduleOneTimeNotification } from '../../../utils/config/NotificationService';
import * as Notifications from 'expo-notifications';
// Estos imports requieren instalar estos paquetes (expo install expo-sharing expo-file-system)
// import * as Sharing from 'expo-sharing';
// import * as FileSystem from 'expo-file-system';

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

  // Funciones para el menú de perfil
  const handleEditProfile = () => {
    // Implementación futura: Navegar a la pantalla de edición de perfil
    Alert.alert("Editar Perfil", "Próximamente: Pantalla de edición de perfil");
  };

  const handleCallDoctor = () => {
    // Abrir el marcador telefónico con un número predeterminado
    Linking.openURL('tel:+34900000000')
      .catch(err => Alert.alert("Error", "No se pudo abrir el marcador telefónico"));
  };

  const handleShareRecords = async () => {
    // Implementación para compartir registros (requiere módulos adicionales)
    Alert.alert("Compartir registros", "Próximamente: Función para compartir registros médicos");
    
    /* Implementación completa (requiere instalar expo-sharing y expo-file-system):
    try {
      // Verificar si el dispositivo puede compartir
      const canShare = await Sharing.isAvailableAsync();
      
      if (!canShare) {
        Alert.alert("Error", "El compartir no está disponible en este dispositivo");
        return;
      }

      // Crear un archivo temporal con el registro de medicamentos
      const fileUri = `${FileSystem.cacheDirectory}medical_record.txt`;
      let content = "REGISTRO DE MEDICAMENTOS\n\n";
      
      reminders.forEach((reminder, index) => {
        const date = new Date(reminder.time);
        content += `${index + 1}. ${reminder.name} (${reminder.dosage})\n`;
        content += `   Hora: ${date.toLocaleTimeString()}\n`;
        content += `   Frecuencia: ${reminder.frequency}\n\n`;
      });
      
      await FileSystem.writeAsStringAsync(fileUri, content);
      await Sharing.shareAsync(fileUri, {
        mimeType: 'text/plain',
        dialogTitle: 'Compartir registro de medicamentos',
      });
    } catch (error) {
      console.error("Error al compartir:", error);
      Alert.alert("Error", "No se pudo compartir el registro de medicamentos");
    }
    */
  };

  const handleImportCaregiverNotifications = () => {
    // Implementación futura: Configurar notificaciones para cuidadores
    Alert.alert("Notificaciones de cuidador", "Próximamente: Configuración de notificaciones para cuidadores");
  };

  // Agrega o actualiza el recordatorio y programa la notificación
  const handleAddMedicine = async (newMedicine: MedicineReminder) => {
    let reminderId: string | null = null;
    
    if (reminderToEdit) {
      await updateReminder(reminderToEdit.id, newMedicine);
      reminderId = reminderToEdit.id;
    } else {
      // Usamos el nuevo addReminder que retorna el id del recordatorio creado.
      reminderId = await addReminder({ ...newMedicine, type: 'medication' });
    }

    if (!reminderId) {
      Alert.alert("Error", "No se pudo obtener el ID del recordatorio");
      return;
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
        onNotificationsPress={() => {
          // Futura implementación: panel de notificaciones
          Alert.alert("Notificaciones", "Próximamente: Panel de notificaciones");
        }}
        onProfilePress={handleEditProfile}
        onSearchPress={() => {
          // Futura implementación: búsqueda
          Alert.alert("Buscar", "Próximamente: Función de búsqueda");
        }}
        onCallDoctor={handleCallDoctor}
        onShareRecords={handleShareRecords}
        onImportCaregiverNotifications={handleImportCaregiverNotifications}
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
