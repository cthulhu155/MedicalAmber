import React from 'react';
import { View, FlatList, Text, RefreshControl } from 'react-native';
import ReminderItem from './ReminderItem';
import baseStyles from '../Styles/HomeStyleSheet';
import { HomeListProps } from '../../../../types/HomeListProps.interface';

// Componente que muestra la lista de recordatorios médicos
// Recibe como props:
// - reminders: array de recordatorios
// - refreshing: booleano que indica si se está actualizando la lista
// - onRefresh: función que se ejecuta al hacer pull-to-refresh
// - onDeleteReminder: función para eliminar un recordatorio
const HomeList: React.FC<HomeListProps> = ({ reminders, refreshing, onRefresh, onDeleteReminder }) => {
  return (
    <View style={baseStyles.listContainer}>
      {reminders.length === 0 ? (
        <Text style={{ textAlign: 'center', color: '#666', fontSize: 16, marginVertical: 20 }}>
          No hay recordatorios aún.
        </Text>
      ) : (
        <FlatList
          data={reminders}
          renderItem={({ item }) => (
            <ReminderItem
              item={item}
              onDelete={(id: string) => onDeleteReminder && onDeleteReminder(id)}
            />
          )}
          keyExtractor={(item) => item.id}
          contentContainerStyle={{ paddingBottom: 20 }}
          showsVerticalScrollIndicator={false}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} tintColor="#4A90E2" />
          }
        />
      )}
    </View>
  );
};

export default HomeList;
