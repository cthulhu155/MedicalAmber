export interface HomeHeaderProps {
  onAddPress: () => void;  // Manejador requerido para el botón de agregar
  onNotificationsPress?: () => void;  // Manejador opcional para notificaciones
  onProfilePress?: () => void;  // Manejador opcional para el perfil
  onSearchPress?: () => void;  // Manejador opcional para la búsqueda
}