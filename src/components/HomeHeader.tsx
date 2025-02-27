import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import baseStyles from '../utils/Styles/HomeStyleSheet';
import { HomeHeaderProps } from '../types/HomeHeaderProps.interface';


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
    // Contenedor principal del encabezado con margen inferior
    <View style={[baseStyles.header, { marginBottom: 20 }]}>
      {/* Título de la aplicación */}
      <Text style={[baseStyles.screenTitle, { fontSize: 28, fontWeight: 'bold' }]}>
        Medical Amber
      </Text>
      
      {/* Contenedor para botones de acción */}
      <View style={{ flexDirection: 'row', alignItems: 'center', gap: 12 }}>

        {/* Botón de notificaciones */}
        <TouchableOpacity
          style={[baseStyles.iconButton]}
          onPress={onNotificationsPress}
          accessibilityLabel="Notificaciones"
        >
          <Ionicons name="notifications-outline" size={24} color="#4A90E2" />
        </TouchableOpacity>

        {/* Botón de perfil */}
        <TouchableOpacity
          style={[baseStyles.iconButton]}
          onPress={onProfilePress}
          accessibilityLabel="Perfil"
        >
          <Ionicons name="person-outline" size={24} color="#4A90E2" />
        </TouchableOpacity>

        {/* Botón de agregar con estilo personalizado */}
        <TouchableOpacity
          style={[baseStyles.addButton, { 
            backgroundColor: '#4A90E2', 
            borderRadius: 30, 
            padding: 8,
            justifyContent: 'center',
            alignItems: 'center' 
          }]}
          onPress={onAddPress}
          accessibilityLabel="Agregar nuevo elemento"
        >
          <Ionicons name="add" size={20} color="#FFFFFF" />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default HomeHeader;
