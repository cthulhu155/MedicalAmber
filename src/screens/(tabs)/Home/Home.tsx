import React, { useState } from 'react';
import { View, Text, SafeAreaView, StatusBar, FlatList } from 'react-native';
import baseStyles from '../Home/Styles/HomeStyleSheet';
import { useReminders } from '../../../hooks/useReminders';
import { MedicineReminder } from '../../../types/Reminder.interface';
import AddMedicineForm from './Components/AddMedicine';

import HomeHeader from './Components/HomeHeader';
import ReminderItem from './Components/ReminderItem';

export default function HomeScreen() {
  const { reminders, refreshing, onRefresh, addReminder, deleteReminder } = useReminders();
  const [isModalVisible, setModalVisible] = useState(false);

  const handleAddMedicine = (newMedicine: MedicineReminder) => {
    addReminder({ ...newMedicine, type: 'medication' });
    setModalVisible(false);
  };

  return (
    <SafeAreaView style={[baseStyles.safeArea, { backgroundColor: '#F8F9FA' }]}>
      <StatusBar barStyle="dark-content" backgroundColor="#F8F9FA" />
      
      <FlatList
        ListHeaderComponent={
          <>
            <HomeHeader onAddPress={() => setModalVisible(true)} />
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
          </>
        }
        data={reminders}
        renderItem={({ item }) => (
          <ReminderItem item={item} onDelete={deleteReminder} />
        )}
        keyExtractor={(item) => item.id}
        contentContainerStyle={{ paddingBottom: 20 }}
        showsVerticalScrollIndicator={false}
        refreshing={refreshing}
        onRefresh={onRefresh}
      />
      
      <AddMedicineForm
        visible={isModalVisible}
        onAdd={handleAddMedicine}
        onClose={() => setModalVisible(false)}
      />
    </SafeAreaView>
  );
}
