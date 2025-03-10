import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, useWindowDimensions, Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Swipeable } from 'react-native-gesture-handler';
import { ReminderItemProps } from '../../../../types/Reminder.interface';
import baseStyles from '../Styles/HomeStyleSheet';

interface Props extends ReminderItemProps {
  onDelete: (id: string) => void;
  onEdit: (id: string) => void;
  onCheck: (id: string) => void;
}

const ReminderItem: React.FC<Props> = ({ item, onPress, onDelete, onEdit }) => {
  const { width } = useWindowDimensions();
  const scaleFactor = width / 375;

  const formatTime = (timeString: string) => {
    const date = new Date(timeString);
    return date.toLocaleString('es-ES', { hour: '2-digit', minute: '2-digit' });
  };

  const handleOptions = () => {
    Alert.alert(
      'Opciones',
      'Seleccione una acción',
      [
        { text: 'Editar', onPress: () => onEdit(item.id) },
        { text: 'Eliminar', onPress: () => onDelete(item.id), style: 'destructive' },
        { text: 'Cancelar', style: 'cancel' },
      ],
      { cancelable: true }
    );
  };

  const renderRightActions = () => {
    return (
      <View style={styles.actionContainer}>
        <TouchableOpacity onPress={() => onDelete(item.id)} style={styles.deleteAction}>
          <Ionicons name="trash-outline" size={24 * scaleFactor} color="white" />
          <Text style={[styles.actionText, { marginLeft: 8 }]}>Eliminar</Text>
        </TouchableOpacity>
      </View>
    );
  };

  return (
    <Swipeable
      renderRightActions={renderRightActions}
      rightThreshold={width / 4} // Makes it activate at half screen width
      overshootRight={false}
      friction={2}
      enableTrackpadTwoFingerGesture
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
                {formatTime(item.time)}
              </Text>
              <Text style={{ fontSize: 14 * scaleFactor, marginLeft: 8, color: '#666' }}>
                • {item.frequency}
              </Text>
            </View>
          </View>
          <TouchableOpacity 
            onPress={handleOptions} 
            style={{ justifyContent: 'center', height: '100%' }}
          >
            <Text style={{ fontSize: 24 * scaleFactor, color: '#CCCCCC' }}>...</Text>
          </TouchableOpacity>
        </View>
      </TouchableOpacity>
    </Swipeable>
  );
};

const styles = StyleSheet.create({
  actionContainer: {
    // Ocupar toda la altura del Swipeable
    height: '100%',
    // Ajusta el ancho deseado para la zona de swipe
    width: 80,
    // Centrar vertical/horizontal
    justifyContent: 'center',
    alignItems: 'center',
  },
  deleteAction: {
    // Hacer que el botón ocupe todo el contenedor
    flex: 1,
    backgroundColor: '#FF4B4B',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    // Si tu ítem tiene borderRadius, puedes eliminarlo aquí o igualarlo
    // borderRadius: 10, // quítalo o ajústalo para que se vea uniforme
  },
  actionText: {
    color: '#FFF',
    fontWeight: '500',
    fontSize: 16,
    marginLeft: 8,
  },
});


export default ReminderItem;
