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
  pillQuantity?: string;   // Cantidad de pastillas
  intervalHours?: string;  // Cada cuántas horas se debe tomar

  // Propiedades opcionales para rangos de fechas en modo recurrente:
  startDate?: string;
  endDate?: string;
  selectedDates?: Record<string, { selected: boolean; marked: boolean }> | null;
}
