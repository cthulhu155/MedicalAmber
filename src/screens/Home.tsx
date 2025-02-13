import React, { useState, useCallback } from 'react';
import { View, Text, FlatList, TouchableOpacity, SafeAreaView, useWindowDimensions, StatusBar, RefreshControl } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import baseStyles from '../utils/Styles/HomeStyleSheet';
import { MedicineReminder } from '../types/Reminder.interface';
import AddMedicineForm from '../components/AddMedicine'; // Asegúrate de que este es el nombre correcto

export default function Home() {
  const { width } = useWindowDimensions();
  const BASE_WIDTH = 375;
  const scaleFactor = width / BASE_WIDTH;

  const [reminders, setReminders] = useState<MedicineReminder[]>([
    { id: '1', name: 'Take Medicine', time: '09:00 AM', type: 'medication', frequency: 'daily', dosage: '1 tablet' },
    { id: '2', name: 'Doctor Appointment', time: '02:30 PM', type: 'appointment', frequency: 'weekly', dosage: '1 tablet' },
  ]);
  
  const [refreshing, setRefreshing] = useState(false);
  const [isModalVisible, setModalVisible] = useState(false); // <-- Agregado

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    setTimeout(() => {
      setRefreshing(false);
    }, 2000);
  }, []);

  const handleAddMedicine = (newMedicine: MedicineReminder) => {
    setReminders((prev) => [...prev, newMedicine]);
  };

  const renderReminderItem = ({ item }: { item: MedicineReminder }) => (
    <TouchableOpacity style={[baseStyles.reminderItem, { elevation: 3 }]} activeOpacity={0.7}>
      <View style={baseStyles.reminderContent}>
        <View style={[baseStyles.iconContainer, { backgroundColor: item.type === 'medication' ? '#E8F5FF' : '#FFE8E8' }]}>
          <Ionicons 
            name={item.type === 'medication' ? 'medical' : 'calendar'} 
            size={24 * scaleFactor} 
            color={item.type === 'medication' ? '#4A90E2' : '#FF4B4B'} 
          />
        </View>
        <View style={baseStyles.textContainer}>
          <Text style={[baseStyles.reminderTitle, { fontSize: 16 * scaleFactor, fontWeight: '600' }]}>
            {item.name}
          </Text>
          <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 4 }}>
            <Ionicons name="time-outline" size={14 * scaleFactor} color="#666" />
            <Text style={[baseStyles.reminderTime, { fontSize: 14 * scaleFactor, marginLeft: 4, color: '#666' }]}>
              {item.time}
            </Text>
            <Text style={{ fontSize: 14 * scaleFactor, marginLeft: 8, color: '#666' }}>
              • {item.frequency}
            </Text>
          </View>
        </View>
        <Ionicons name="chevron-forward" size={24 * scaleFactor} color="#CCCCCC" />
      </View>
    </TouchableOpacity>
  );

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
            onPress={() => setModalVisible(true)} // <-- Abre el modal
          >
            <Ionicons name="add" size={28} color="#FFFFFF" />
          </TouchableOpacity>
        </View>

        <FlatList
          data={reminders}
          renderItem={renderReminderItem}
          keyExtractor={(item) => item.id}
          contentContainerStyle={[baseStyles.listContainer, { paddingBottom: 20 * scaleFactor, gap: 12 }]}
          showsVerticalScrollIndicator={false}
          refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} tintColor="#4A90E2" />}
        />
      </View>

      {/* Modal AddMedicine */}
      <AddMedicineForm
        visible={isModalVisible}
        onAdd={(medicine) => handleAddMedicine({ ...medicine, type: 'medication' })} 
        onClose={() => setModalVisible(false)}
      />
    </SafeAreaView>
  );
}
