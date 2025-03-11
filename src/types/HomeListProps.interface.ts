import { MedicineReminder } from "./Reminder.interface";

export interface HomeListProps {
  reminders: MedicineReminder[];
  refreshing: boolean;
  onRefresh: () => void;
  onDeleteReminder: (id: string) => void;
}
