import React, { useState } from 'react';
import {
  Image,
  View,
  Text,
  FlatList,
  TouchableOpacity,
  SafeAreaView,
  useWindowDimensions,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import baseStyles from '../utils/Styles/HomeStyleSheet';

export default function Home() {
  // Obtenemos el ancho actual de la pantalla
  const { width } = useWindowDimensions();
  // Definimos un ancho base (por ejemplo, 375 puntos, típico en muchos móviles)
  const BASE_WIDTH = 375;
  // Calculamos el factor de escala
  const scaleFactor = width / BASE_WIDTH;

  const [reminders, setReminders] = useState<Reminder[]>([
    { id: '1', title: 'Take Medicine', time: '09:00 AM', type: 'medication' },
    { id: '2', title: 'Doctor Appointment', time: '02:30 PM', type: 'appointment' },
  ]);

  const renderReminderItem = ({ item }: { item: Reminder }) => (
    <TouchableOpacity style={baseStyles.reminderItem}>
      <View style={baseStyles.reminderContent}>
        <View style={baseStyles.iconContainer}>
          <Ionicons 
            name={item.type === 'medication' ? 'medical' : 'calendar'} 
            size={24 * scaleFactor} 
            color="#4A90E2"
          />
        </View>
        <View style={baseStyles.textContainer}>
          <Text style={[baseStyles.reminderTitle, { fontSize: 16 * scaleFactor }]}>
            {item.title}
          </Text>
          <Text style={[baseStyles.reminderTime, { fontSize: 14 * scaleFactor }]}>
            {item.time}
          </Text>
        </View>
        <Ionicons 
          name="chevron-forward" 
          size={24 * scaleFactor} 
          color="#CCCCCC" 
        />
      </View>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={baseStyles.safeArea}>
      <View style={[baseStyles.screenContainer, { padding: 16 * scaleFactor }]}>
        <View style={baseStyles.header}>
          <Text style={[baseStyles.screenTitle, { fontSize: 24 * scaleFactor }]}>
            Medical Reminders
          </Text>
          <TouchableOpacity style={baseStyles.addButton}>
            <Ionicons 
              name="add-circle" 
              size={32 * scaleFactor} 
              color="#4A90E2" 
            />
          </TouchableOpacity>
        </View>
        <FlatList
          data={reminders}
          renderItem={renderReminderItem}
          keyExtractor={(item) => item.id}
          contentContainerStyle={[
            baseStyles.listContainer,
            { paddingBottom: 20 * scaleFactor },
          ]}
          showsVerticalScrollIndicator={false}
        />
      </View>
    </SafeAreaView>
  );
}
