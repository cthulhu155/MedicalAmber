import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { MedicineReminder } from '../types/Reminder.interface';
import baseStyles from '../utils/Styles/HomeStyleSheet';
import { useWindowDimensions } from 'react-native';

interface ReminderItemProps {
  item: MedicineReminder;
  onPress?: () => void;
}

const ReminderItem: React.FC<ReminderItemProps> = ({ item, onPress }) => {
  const { width } = useWindowDimensions();
  const scaleFactor = width / 375;

  return (
    <TouchableOpacity 
      style={[baseStyles.reminderItem, { elevation: 3 }]} 
      activeOpacity={0.7} 
      onPress={onPress}
    >
      <View style={baseStyles.reminderContent}>
        <View style={[
          baseStyles.iconContainer, 
          { backgroundColor: item.type === 'medication' ? '#E8F5FF' : '#FFE8E8' }
        ]}>
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
};

export default ReminderItem;
