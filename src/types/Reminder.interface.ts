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
}
export interface ReminderItemProps {
  item: MedicineReminder;
  onPress?: () => void;
}