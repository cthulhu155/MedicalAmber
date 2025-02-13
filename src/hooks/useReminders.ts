import { useState, useCallback } from 'react';
import { MedicineReminder } from '../types/Reminder.interface';

export const useReminders = () => {
  const [reminders, setReminders] = useState<MedicineReminder[]>([
    { id: '1', name: 'Take Medicine', time: '09:00 AM', type: 'medication', frequency: 'daily', dosage: '1 tablet', notes: 'Take before breakfast', reminderSound: 'default', isRecurring: false },
    { id: '2', name: 'Doctor Appointment', time: '02:30 PM', type: 'appointment', frequency: 'weekly', dosage: '1 tablet', notes: 'Take before breakfast', reminderSound: 'default', isRecurring: true },
  ]);
  
  const [refreshing, setRefreshing] = useState(false);

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    setTimeout(() => {
      setRefreshing(false);
    }, 2000);
  }, []);

  const addReminder = (newReminder: MedicineReminder) => {
    setReminders((prev) => [...prev, newReminder]);
  };

  return {
    reminders,
    refreshing,
    onRefresh,
    addReminder,
  };
};
