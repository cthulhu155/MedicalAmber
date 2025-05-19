export interface HomeHeaderProps {
  onAddPress: () => void;  // Manejador requerido para el botón de agregar
  onNotificationsPress?: () => void;  // Manejador opcional para notificaciones
  onProfilePress?: () => void;  // Manejador opcional para el perfil
  onSearchPress?: () => void;  // Manejador opcional para la búsqueda
  
  // Nuevas propiedades para el menú de perfil
  onCallDoctor?: () => void;  // Manejador opcional para llamar al médico
  onShareRecords?: () => void;  // Manejador opcional para compartir registros
  onImportCaregiverNotifications?: () => void;  // Manejador opcional para importar notificaciones a cuidador
}