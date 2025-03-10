export interface MedicineReminder {
  id: string;
  name: string;
  time: string;
  type: 'medication' | 'appointment';
  frequency: string;
  dosage: string;
  notes: string;
  reminderSound: string;
  isRecurring: boolean;
  pillQuantity?: string;   // Nuevo campo para la cantidad de pastillas
  intervalHours?: string;  // Nuevo campo para cada cuántas horas se debe tomar
}

export interface ReminderItemProps {
  item: MedicineReminder;
  onPress?: () => void;
  onDelete: (id: string) => void;
}

