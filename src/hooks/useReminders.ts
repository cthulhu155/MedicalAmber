// src/hooks/useReminders.ts
import { useState, useCallback, useEffect } from 'react';
import { MedicineReminder } from '../types/Reminder.interface';
import { getFirestore, collection, addDoc, getDocs, deleteDoc, doc, updateDoc } from 'firebase/firestore';
import * as Notifications from 'expo-notifications';
import { useAuth } from './useAuth';

export const useReminders = () => {
  const { user } = useAuth();
  const userId = user?.uid;

  const [reminders, setReminders] = useState<(MedicineReminder & { notificationId?: string })[]>([]);
  const [refreshing, setRefreshing] = useState(false);
  const [loading, setLoading] = useState(false);
  const db = getFirestore();

  const fetchReminders = useCallback(async () => {
    setLoading(true);
    try {
      if (!userId) {
        console.error("Usuario no autenticado");
        setReminders([]);
        return;
      }
      const querySnapshot = await getDocs(collection(db, `users/${userId}/reminders`));
      const fetchedReminders = querySnapshot.docs.map(doc => ({
        ...doc.data(),
        id: doc.id,
      })) as (MedicineReminder & { notificationId?: string })[];
      setReminders(fetchedReminders);
    } catch (error) {
      console.error('Error fetching reminders:', error);
    } finally {
      setLoading(false);
    }
  }, [db, userId]);

  useEffect(() => {
    fetchReminders();
  }, [fetchReminders]);

  // Modificamos addReminder para que retorne el id del recordatorio creado
  const addReminder = async (
    newReminder: Omit<MedicineReminder, 'id'> & { notificationId?: string }
  ): Promise<string | null> => {
    try {
      if (!userId) {
        console.error("Usuario no autenticado");
        return null;
      }
      const docRef = await addDoc(collection(db, `users/${userId}/reminders`), newReminder);
      const newId = docRef.id;
      setReminders(prev => [...prev, { ...newReminder, id: newId }]);
      return newId;
    } catch (error) {
      console.error('Error adding reminder:', error);
      return null;
    }
  };

  const deleteReminder = async (id: string) => {
    try {
      if (!userId) {
        console.error("Usuario no autenticado");
        return;
      }
      const reminderToDelete = reminders.find(reminder => reminder.id === id);
      if (reminderToDelete?.notificationId) {
        console.log("Cancelando notificación con ID:", reminderToDelete.notificationId);
        await Notifications.cancelScheduledNotificationAsync(reminderToDelete.notificationId);
        console.log("Notificación cancelada");
      }
      await deleteDoc(doc(db, `users/${userId}/reminders/${id}`));
      setReminders(prev => prev.filter(reminder => reminder.id !== id));
      console.log("Recordatorio eliminado de Firebase.");
    } catch (error) {
      console.error('Error deleting reminder:', error);
    }
  };

  const updateReminder = async (
    id: string,
    updatedData: Partial<MedicineReminder> & { notificationId?: string }
  ) => {
    try {
      if (!userId) return;
      await updateDoc(doc(db, `users/${userId}/reminders/${id}`), updatedData);
      setReminders(prev =>
        prev.map(reminder =>
          reminder.id === id ? { ...reminder, ...updatedData } : reminder
        )
      );
    } catch (error) {
      console.error('Error updating reminder:', error);
    }
  };

  const updateReminderTime = async (
    id: string,
    newTime: string,
    newNotificationId?: string
  ) => {
    try {
      if (!userId) return;
      const updateData: Partial<MedicineReminder> & { notificationId?: string } = { time: newTime };
      if (newNotificationId) {
        updateData.notificationId = newNotificationId;
      }
      await updateDoc(doc(db, `users/${userId}/reminders/${id}`), updateData);
      setReminders(prev =>
        prev.map(reminder =>
          reminder.id === id ? { ...reminder, ...updateData } : reminder
        )
      );
    } catch (error) {
      console.error('Error updating reminder time:', error);
    }
  };

  const onRefresh = useCallback(async () => {
    setRefreshing(true);
    await fetchReminders();
    setRefreshing(false);
  }, [fetchReminders]);

  return {
    reminders,
    loading,
    refreshing,
    onRefresh,
    addReminder,
    deleteReminder,
    updateReminder,
    fetchReminders,
    updateReminderTime,
  };
};
