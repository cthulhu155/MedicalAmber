import React from 'react';
import { View, FlatList, Text, RefreshControl } from 'react-native';
import { MedicineReminder } from '../types/Reminder.interface';
import ReminderItem from './ReminderItem';
import baseStyles from '../utils/Styles/HomeStyleSheet';

interface HomeListProps {
  reminders: MedicineReminder[];
  refreshing: boolean;
  onRefresh: () => void;
}

const HomeList: React.FC<HomeListProps> = ({ reminders, refreshing, onRefresh }) => {
  return (
    <View style={baseStyles.listContainer}>
      {reminders.length === 0 ? (
        <Text style={{ textAlign: 'center', color: '#666', fontSize: 16, marginVertical: 20 }}>
          No hay recordatorios aún.
        </Text>
      ) : (
        <FlatList
          data={reminders}
          renderItem={({ item }) => <ReminderItem item={item} />}
          keyExtractor={(item) => item.id}
          contentContainerStyle={{ paddingBottom: 20 }}
          showsVerticalScrollIndicator={false}
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
