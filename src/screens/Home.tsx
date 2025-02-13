import React, { useState } from 'react';
import { View, Text, FlatList, TouchableOpacity, SafeAreaView, StatusBar, RefreshControl } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import baseStyles from '../utils/Styles/HomeStyleSheet';
import { useReminders } from '../hooks/useReminders';
import ReminderItem from '../components/ReminderItem';
import AddMedicineForm from '../components/AddMedicine';
import { MedicineReminder } from '../types/Reminder.interface';

export default function HomeScreen() {
  const { reminders, refreshing, onRefresh, addReminder } = useReminders();
  const [isModalVisible, setModalVisible] = useState(false);

  const handleAddMedicine = (newMedicine: MedicineReminder) => {
    addReminder({ ...newMedicine, type: 'medication' });
    setModalVisible(false);
  };

  return (
    <SafeAreaView style={[baseStyles.safeArea, { backgroundColor: '#F8F9FA' }]}>
      <StatusBar barStyle="dark-content" backgroundColor="#F8F9FA" />
      <View style={[baseStyles.screenContainer, { padding: 16 }]}>
        <View style={[baseStyles.header, { marginBottom: 20 }]}>
          <Text style={[baseStyles.screenTitle, { fontSize: 28, fontWeight: 'bold' }]}>
            Medical Reminders
          </Text>
          <TouchableOpacity
            style={[baseStyles.addButton, { backgroundColor: '#4A90E2', borderRadius: 30, padding: 8 }]}
            onPress={() => setModalVisible(true)}
          >
            <Ionicons name="add" size={28} color="#FFFFFF" />
          </TouchableOpacity>
        </View>

        <FlatList
          data={reminders}
          renderItem={({ item }) => <ReminderItem item={item} />}
          keyExtractor={(item) => item.id}
          contentContainerStyle={[baseStyles.listContainer, { paddingBottom: 20 }]}
          showsVerticalScrollIndicator={false}
          refreshControl={
            <RefreshControl 
              refreshing={refreshing} 
              onRefresh={onRefresh} 
              tintColor="#4A90E2" 
            />
          }
        />
      </View>

      {/* Modal para añadir recordatorio */}
      <AddMedicineForm
        visible={isModalVisible}
        onAdd={handleAddMedicine}
        onClose={() => setModalVisible(false)}
      />
    </SafeAreaView>
  );
}
