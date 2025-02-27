import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { MedicineReminder, ReminderItemProps } from '../types/Reminder.interface';
import baseStyles from '../utils/Styles/HomeStyleSheet';
import { useWindowDimensions } from 'react-native';


// Componente funcional que representa un recordatorio individual
const ReminderItem: React.FC<ReminderItemProps> = ({ item, onPress }) => {
  // Obtiene el ancho de la pantalla para hacer el componente responsive
  const { width } = useWindowDimensions();
  const scaleFactor = width / 375;

  return (
    // Contenedor principal con capacidad de toque
    <TouchableOpacity 
      style={[baseStyles.reminderItem, { elevation: 3 }]} 
      activeOpacity={0.7} 
      onPress={onPress}
    >
      <View style={baseStyles.reminderContent}>
        {/* Contenedor del icono con color de fondo condicional */}
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
        {/* Contenedor del texto con información del recordatorio */}
        <View style={baseStyles.textContainer}>
          <Text style={[baseStyles.reminderTitle, { fontSize: 16 * scaleFactor, fontWeight: '600' }]}>
            {item.name}
          </Text>
          {/* Contenedor de la información de tiempo y frecuencia */}
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
        {/* Icono de flecha para indicar que es interactivo */}
        <Ionicons name="chevron-forward" size={24 * scaleFactor} color="#CCCCCC" />
      </View>
    </TouchableOpacity>
  );
};

export default ReminderItem;
