// screens/(tabs)/Home/Home.tsx
import React, { useState } from 'react';
import { View, Text, SafeAreaView, StatusBar } from 'react-native';
import { useReminders } from '../../../hooks/useReminders';
import { MedicineReminder } from '../../../types/Reminder.interface';
import HomeHeader from './Components/HomeHeader';
import AddMedicineForm from './Components/AddMedicine';
import HomeList from './Components/HomeList';
import baseStyles from './Styles/HomeStyleSheet';

export default function HomeScreen() {
  const { reminders, refreshing, onRefresh, addReminder, deleteReminder } = useReminders();
  const [isModalVisible, setModalVisible] = useState(false);

  const handleAddMedicine = (newMedicine: MedicineReminder) => {
    // Agregamos el nuevo recordatorio usando el hook
    addReminder({ ...newMedicine, type: 'medication' });
    setModalVisible(false);
  };

  return (
    <SafeAreaView style={[baseStyles.safeArea, { backgroundColor: '#F8F9FA' }]}>
      <StatusBar barStyle="dark-content" backgroundColor="#F8F9FA" />

      {/* Encabezado con botón para abrir el modal de añadir medicamento */}
      <HomeHeader onAddPress={() => setModalVisible(true)} />

      {/* Alerta / aviso (puede moverse a un componente aparte si prefieres) */}
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

      {/* Componente presentacional que muestra la lista de recordatorios */}
      <HomeList
        reminders={reminders}
        refreshing={refreshing}
        onRefresh={onRefresh}
      />

      {/* Modal para añadir un nuevo recordatorio de medicamento */}
      <AddMedicineForm
        visible={isModalVisible}
        onAdd={handleAddMedicine}
        onClose={() => setModalVisible(false)}
      />
    </SafeAreaView>
  );
}
