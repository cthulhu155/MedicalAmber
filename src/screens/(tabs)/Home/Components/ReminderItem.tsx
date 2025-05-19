import React, { useRef } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  useWindowDimensions,
  Alert,
  Animated,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Swipeable, RectButton } from 'react-native-gesture-handler';
import { MedicineReminder } from '../../../../types/Reminder.interface';
import baseStyles from '../Styles/HomeStyleSheet';

interface ReminderItemProps {
  item: MedicineReminder;
  onDelete: (id: string) => void;
  onEdit: (reminder: MedicineReminder) => void; // Nueva prop para editar
}

const ReminderItem: React.FC<ReminderItemProps> = ({ item, onDelete, onEdit }) => {
  const { width } = useWindowDimensions();
  const scaleFactor = width / 375;
  const swipeableRef = useRef<Swipeable>(null);

  const handleDelete = () => {
    onDelete(item.id);
    swipeableRef.current?.close();
  };

  // Función que maneja la edición
  const handleEdit = () => {
    onEdit(item);
    swipeableRef.current?.close();
  };

  // Muestra un Alert con opciones: Editar, Eliminar, Cancelar
  const handleOptions = () => {
    Alert.alert('Opciones', 'Seleccione una acción', [
      {
        text: 'Editar',
        onPress: handleEdit,
      },
      {
        text: 'Eliminar',
        onPress: handleDelete,
        style: 'destructive',
      },
      {
        text: 'Cancelar',
        style: 'cancel',
      },
    ]);
  };

  const formatTime = (timeString: string) => {
    const date = new Date(timeString);
    return date.toLocaleString('es-ES', {
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  // Función para determinar el color de la tarjeta según el tipo
  const getCardStyle = () => {
    if (item.type === 'medication') {
      return {
        borderLeftColor: '#3A7BD5',
        iconBg: '#E8F5FF',
        iconColor: '#3A7BD5'
      };
    } else {
      return {
        borderLeftColor: '#FF4B4B',
        iconBg: '#FFE8E8',
        iconColor: '#FF4B4B'
      };
    }
  };

  const cardStyle = getCardStyle();

  const renderRightActions = (progress: Animated.AnimatedInterpolation<number>, dragX: Animated.AnimatedInterpolation<number>) => {
    const trans = dragX.interpolate({
      inputRange: [-100, 0],
      outputRange: [0, 100],
      extrapolate: 'clamp',
    });
    
    return (
      <View style={[styles.actionContainer, { borderRadius: 18 }]}>
        <Animated.View
          style={[
            styles.deleteAction, 
            { 
              transform: [{ translateX: trans }],
              borderTopRightRadius: 18,
              borderBottomRightRadius: 18,
            }
          ]}
        >
          <RectButton style={styles.deleteButton} onPress={handleDelete}>
            <Ionicons name="trash-outline" size={24 * scaleFactor} color="white" />
            <Text style={[styles.actionText, { marginLeft: 8 }]}>Eliminar</Text>
          </RectButton>
        </Animated.View>
      </View>
    );
  };

  return (
    <Swipeable
      ref={swipeableRef}
      renderRightActions={renderRightActions}
      rightThreshold={width / 4}
      overshootRight={false}
      friction={2}
      enableTrackpadTwoFingerGesture
    >
      <TouchableOpacity
        style={[
          baseStyles.reminderItem, 
          { borderLeftColor: cardStyle.borderLeftColor }
        ]}
        activeOpacity={0.7}
        onPress={handleOptions}
      >
        <View style={baseStyles.reminderContent}>
          <View
            style={[
              baseStyles.iconContainer,
              {
                backgroundColor: cardStyle.iconBg,
              },
            ]}
          >
            <Ionicons
              name={item.type === 'medication' ? 'medical' : 'calendar'}
              size={24 * scaleFactor}
              color={cardStyle.iconColor}
            />
          </View>
          <View style={baseStyles.textContainer}>
            <Text
              style={[
                baseStyles.reminderTitle,
                { fontSize: 16 * scaleFactor, fontWeight: '600' },
              ]}
            >
              {item.name}
            </Text>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                marginTop: 4,
              }}
            >
              <Ionicons
                name="time-outline"
                size={14 * scaleFactor}
                color="#666"
              />
              <Text
                style={[
                  baseStyles.reminderTime,
                  { fontSize: 14 * scaleFactor, marginLeft: 4, color: '#666' },
                ]}
              >
                {formatTime(item.time)}
              </Text>
              <Text style={{ fontSize: 14 * scaleFactor, marginLeft: 8, color: '#666' }}>
                • {item.frequency}
              </Text>
            </View>
          </View>
          <TouchableOpacity
            onPress={handleOptions}
            style={styles.optionsButton}
          >
            <Ionicons name="ellipsis-vertical" size={18 * scaleFactor} color="#999" />
          </TouchableOpacity>
        </View>
      </TouchableOpacity>
    </Swipeable>
  );
};

const styles = StyleSheet.create({
  actionContainer: {
    height: '100%',
    width: 100,
    overflow: 'hidden',
  },
  deleteAction: {
    flex: 1,
    backgroundColor: '#FF4B4B',
    justifyContent: 'center',
  },
  deleteButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    width: 100,
  },
  actionText: {
    color: '#FFF',
    fontWeight: '600',
    fontSize: 16,
  },
  optionsButton: {
    height: 40,
    width: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5F5F5',
  },
});

export default ReminderItem;
