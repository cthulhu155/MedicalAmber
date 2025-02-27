import { MedicineReminder } from "./Reminder.interface";

export interface AddMedicineFormProps {
  visible: boolean;
  onAdd: (medicine: MedicineReminder) => void;
  onClose: () => void;
}
