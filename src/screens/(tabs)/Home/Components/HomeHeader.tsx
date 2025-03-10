import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import baseStyles from '../Styles/HomeStyleSheet';
import { HomeHeaderProps } from '../../../../types/HomeHeaderProps.interface';
import styles from '../Styles/HomeStyleSheet';

/**
 * Componente HomeHeader
 * Renderiza la sección del encabezado de la pantalla principal con botones de navegación
 * Contiene el título de la app y botones de acción para búsqueda, notificaciones, perfil y agregar elementos
 */

const HomeHeader: React.FC<HomeHeaderProps> = ({ 
  onAddPress, 
  onNotificationsPress,
  onProfilePress,
  onSearchPress 
}) => {
  return (
    <View style={styles.parent}>
  {/* Ícono del perfil */}
  <TouchableOpacity style={styles.iconButton} onPress={onProfilePress}>
    <Ionicons name="person-outline" size={24} color="#4A90E2" />
  </TouchableOpacity>

  {/* Contenedor del título, ahora centrado */}
  <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
    <Text style={styles.screenTitle}>Medical Amber</Text>
  </View>

  {/* Íconos de notificación y añadir */}
  <View style={styles.notificationAndAddReminder}>
    <TouchableOpacity style={styles.iconButton} onPress={onNotificationsPress}>
      <Ionicons name="notifications-outline" size={24} color="#4A90E2" />
    </TouchableOpacity>

    <TouchableOpacity style={styles.addButton} onPress={onAddPress}>
      <Ionicons name="add" size={20} color="#FFFFFF" />
    </TouchableOpacity>
  </View>
</View>

  );
};

export default HomeHeader;
