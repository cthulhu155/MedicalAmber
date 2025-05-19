import React, { useState, useRef } from 'react';
import { 
  View, 
  Text, 
  TouchableOpacity, 
  Modal,
  StyleSheet,
  FlatList,
  Animated,
  Dimensions,
  TouchableWithoutFeedback
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import baseStyles from '../Styles/HomeStyleSheet';
import { HomeHeaderProps } from '../../../../types/HomeHeaderProps.interface';
import styles from '../Styles/HomeStyleSheet';

/**
 * Componente HomeHeader
 * Renderiza la sección del encabezado de la pantalla principal con botones de navegación
 * Contiene el título de la app y botones de acción para búsqueda, notificaciones, perfil y agregar elementos
 */

interface MenuOption {
  id: string;
  title: string;
  icon: string;
  onPress: () => void;
}

const HomeHeader: React.FC<HomeHeaderProps> = ({ 
  onAddPress, 
  onNotificationsPress,
  onProfilePress,
  onSearchPress,
  onCallDoctor,
  onShareRecords,
  onImportCaregiverNotifications
}) => {
  const [isMenuVisible, setMenuVisible] = useState(false);
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const scaleAnim = useRef(new Animated.Value(0.8)).current;

  // Define las opciones del menú
  const menuOptions: MenuOption[] = [
    {
      id: 'edit',
      title: 'Editar perfil',
      icon: 'person-circle-outline',
      onPress: () => {
        if (onProfilePress) {
          onProfilePress();
        }
        setMenuVisible(false);
      }
    },
    {
      id: 'call',
      title: 'Llamar al médico',
      icon: 'call-outline',
      onPress: () => {
        if (onCallDoctor) {
          onCallDoctor();
        }
        setMenuVisible(false);
      }
    },
    {
      id: 'share',
      title: 'Compartir registro de medicinas',
      icon: 'share-social-outline',
      onPress: () => {
        if (onShareRecords) {
          onShareRecords();
        }
        setMenuVisible(false);
      }
    },
    {
      id: 'import',
      title: 'Importar notificaciones a mi cuidador',
      icon: 'notifications-circle-outline',
      onPress: () => {
        if (onImportCaregiverNotifications) {
          onImportCaregiverNotifications();
        }
        setMenuVisible(false);
      }
    },
  ];

  // Animación para mostrar/ocultar el menú
  const toggleMenu = () => {
    if (isMenuVisible) {
      // Animar cierre
      Animated.parallel([
        Animated.timing(fadeAnim, {
          toValue: 0,
          duration: 200,
          useNativeDriver: true,
        }),
        Animated.timing(scaleAnim, {
          toValue: 0.8,
          duration: 200,
          useNativeDriver: true,
        }),
      ]).start(() => {
        setMenuVisible(false);
      });
    } else {
      setMenuVisible(true);
      // Animar apertura
      Animated.parallel([
        Animated.timing(fadeAnim, {
          toValue: 1,
          duration: 200,
          useNativeDriver: true,
        }),
        Animated.timing(scaleAnim, {
          toValue: 1,
          duration: 200,
          useNativeDriver: true,
        }),
      ]).start();
    }
  };

  // Renderiza cada opción del menú
  const renderMenuItem = ({ item }: { item: MenuOption }) => (
    <TouchableOpacity 
      style={menuStyles.menuItem}
      onPress={item.onPress}
    >
      <Ionicons name={item.icon as any} size={22} color="#3A7BD5" style={menuStyles.menuItemIcon} />
      <Text style={menuStyles.menuItemText}>{item.title}</Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.parent}>
      {/* Ícono del perfil */}
      <TouchableOpacity 
        style={[styles.iconButton, { position: 'relative', zIndex: 10 }]} 
        onPress={toggleMenu}
      >
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

      {/* Modal para el menú de perfil */}
      <Modal
        visible={isMenuVisible}
        transparent={true}
        animationType="none"
        onRequestClose={() => toggleMenu()}
      >
        <TouchableWithoutFeedback onPress={toggleMenu}>
          <View style={menuStyles.modalOverlay}>
            <TouchableWithoutFeedback onPress={(e) => e.stopPropagation()}>
              <Animated.View 
                style={[
                  menuStyles.menuContainer,
                  {
                    opacity: fadeAnim,
                    transform: [{ scale: scaleAnim }],
                    top: 70, // Posicionar debajo del header
                    left: 20, // Alinear con el icono
                  }
                ]}
              >
                <View style={menuStyles.menuArrow} />
                <FlatList
                  data={menuOptions}
                  renderItem={renderMenuItem}
                  keyExtractor={item => item.id}
                  scrollEnabled={false}
                  contentContainerStyle={menuStyles.menuList}
                />
              </Animated.View>
            </TouchableWithoutFeedback>
          </View>
        </TouchableWithoutFeedback>
      </Modal>
    </View>
  );
};

const menuStyles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.2)',
  },
  menuContainer: {
    position: 'absolute',
    width: 260,
    backgroundColor: 'white',
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  menuArrow: {
    position: 'absolute',
    top: -10,
    left: 20,
    width: 0,
    height: 0,
    backgroundColor: 'transparent',
    borderStyle: 'solid',
    borderLeftWidth: 10,
    borderRightWidth: 10,
    borderBottomWidth: 10,
    borderLeftColor: 'transparent',
    borderRightColor: 'transparent',
    borderBottomColor: 'white',
  },
  menuList: {
    padding: 8,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  menuItemIcon: {
    marginRight: 12,
  },
  menuItemText: {
    fontSize: 16,
    color: '#333',
  },
});

export default HomeHeader;
