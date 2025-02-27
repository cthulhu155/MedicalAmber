import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, useWindowDimensions } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Swipeable } from 'react-native-gesture-handler';
import Animated, { interpolate, Extrapolate } from 'react-native-reanimated';
import { MedicineReminder, ReminderItemProps } from '../types/Reminder.interface';
import baseStyles from '../utils/Styles/HomeStyleSheet';

interface Props extends ReminderItemProps {
  onDelete: (id: string) => void;
}

const ReminderItem: React.FC<Props> = ({ item, onPress, onDelete }) => {
  const { width } = useWindowDimensions();
  const scaleFactor = width / 375;

  // Se define renderRightActions para eliminar el item al deslizar
  const renderRightActions = (progress: any, dragX: any) => {
    // Interpolamos dragX para obtener un ancho animado (este ejemplo es ilustrativo)
    const animatedWidth = interpolate(
      dragX,
      [-width, 0],
      [width, 0],
      Extrapolate.CLAMP
    );
    return (
      <View style={styles.rightActionWrapper}>
        <Animated.View style={[styles.background, { width: animatedWidth }]}>
          <Text style={styles.actionText}>Eliminar</Text>
        </Animated.View>
      </View>
    );
  };

  return (
    <Swipeable
      renderRightActions={renderRightActions}
      onSwipeableOpen={() => onDelete(item.id)}
    >
      <TouchableOpacity
        style={[baseStyles.reminderItem, { elevation: 3 }]}
        activeOpacity={0.7}
        onPress={onPress}
      >
        <View style={baseStyles.reminderContent}>
          <View
            style={[
              baseStyles.iconContainer,
              { backgroundColor: item.type === 'medication' ? '#E8F5FF' : '#FFE8E8' },
            ]}
          >
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
    </Swipeable>
  );
};

const styles = StyleSheet.create({
  rightActionWrapper: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'flex-end',
    marginBottom: 12, // Para sincronizar con el marginBottom de baseStyles.reminderItem
  },
  background: {
    backgroundColor: 'red',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    borderTopRightRadius: 15,
    borderBottomRightRadius: 15,
  },
  actionText: {
    color: 'white',
    fontWeight: '600',
    fontSize: 16,
    paddingHorizontal: 20,
  },
});

export default ReminderItem;
