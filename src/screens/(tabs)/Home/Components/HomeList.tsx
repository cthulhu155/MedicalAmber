// screens/(tabs)/Home/components/HomeList.tsx
import React from 'react';
import { View, Text, FlatList, RefreshControl } from 'react-native';
import { MedicineReminder } from '../../../../types/Reminder.interface';
import ReminderItem from './ReminderItem';
import baseStyles from '../Styles/HomeStyleSheet';

interface HomeListProps {
  reminders: MedicineReminder[];
  refreshing: boolean;
  onRefresh: () => void;
  onDelete: (id: string) => void;
}

export default function HomeList({
  reminders,
  refreshing,
  onRefresh,
  onDelete,
}: HomeListProps) {
  return (
    <View style={baseStyles.listContainer}>
      {reminders.length === 0 ? (
        <Text
          style={{
            textAlign: 'center',
            color: '#666',
            fontSize: 16,
            marginVertical: 20,
          }}
        >
          No hay recordatorios aún.
        </Text>
      ) : (
        <FlatList
          data={reminders}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <ReminderItem
              item={item}
              onDelete={() => {/* ... */}}
            />
          )}

          refreshControl={
            <RefreshControl
              refreshing={refreshing}
              onRefresh={onRefresh}
              tintColor="#4A90E2"
            />
          }
          showsVerticalScrollIndicator={false}
        />
      )}
    </View>
  );
}
