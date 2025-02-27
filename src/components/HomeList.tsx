import React from 'react';
import { View, FlatList, Text, RefreshControl } from 'react-native';
import { MedicineReminder } from '../types/Reminder.interface';
import ReminderItem from './ReminderItem';
import baseStyles from '../utils/Styles/HomeStyleSheet';
import { HomeListProps } from '../types/HomeListProps.interface';

// Componente que muestra la lista de recordatorios médicos
// Recibe como props:
// - reminders: array de recordatorios
// - refreshing: booleano que indica si se está actualizando la lista
// - onRefresh: función que se ejecuta al hacer pull-to-refresh

const HomeList: React.FC<HomeListProps> = ({ reminders, refreshing, onRefresh }) => {
  return (
    <View style={baseStyles.listContainer}>
      {/* Si no hay recordatorios, muestra un mensaje */}
      {reminders.length === 0 ? (
        <Text style={{ textAlign: 'center', color: '#666', fontSize: 16, marginVertical: 20 }}>
          No hay recordatorios aún.
        </Text>
      ) : (
        // Si hay recordatorios, muestra la lista con FlatList
        <FlatList
          data={reminders}
          // Renderiza cada recordatorio usando el componente ReminderItem
          renderItem={({ item }) => <ReminderItem item={item} />}
          // Usa el ID del recordatorio como key
          keyExtractor={(item) => item.id}
          // Agrega padding inferior para mejor visualización
          contentContainerStyle={{ paddingBottom: 20 }}
          // Oculta la barra de scroll vertical
          showsVerticalScrollIndicator={false}
          // Configuración del pull-to-refresh
          refreshControl={
            <RefreshControl
              refreshing={refreshing}
              onRefresh={onRefresh}
              tintColor="#4A90E2"
            />
          }
        />
      )}
    </View>
  );
};

export default HomeList;
