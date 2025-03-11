import React from 'react';
import { View, FlatList, Text, RefreshControl } from 'react-native';
import ReminderItem from './ReminderItem';
import baseStyles from '../Styles/HomeStyleSheet';
import { HomeListProps } from '../../../../types/HomeListProps.interface';

const HomeList: React.FC<HomeListProps> = ({ reminders, refreshing, onRefresh, onDeleteReminder, onEditReminder }) => {
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
              onEdit={(reminder) => onEditReminder(reminder)}
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
