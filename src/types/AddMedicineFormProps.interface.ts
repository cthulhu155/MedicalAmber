import { MedicineReminder } from "./Reminder.interface";

export interface AddMedicineFormProps {
  visible: boolean;
  onAdd: (medicine: MedicineReminder) => void;
  onUpdate?: (medicine: MedicineReminder) => void; // Función opcional para actualizar
  onClose: () => void;
  reminderToEdit?: MedicineReminder;              // Recordatorio a editar, opcional
}

