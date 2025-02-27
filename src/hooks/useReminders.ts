import { useState, useCallback } from 'react';
import { MedicineReminder } from '../types/Reminder.interface';
import { auth } from '../utils/config/firebase.config';
import { getFirestore, collection, addDoc, getDocs, deleteDoc, doc, updateDoc } from 'firebase/firestore';

export const useReminders = () => {
  const [reminders, setReminders] = useState<MedicineReminder[]>([]);
  const [refreshing, setRefreshing] = useState(false);
  const [loading, setLoading] = useState(false);
  const db = getFirestore();

  // Fetch reminders from Firestore
  const fetchReminders = useCallback(async () => {
    setLoading(true);
    try {
      const userId = auth.currentUser?.uid;
      if (!userId) return;

      const querySnapshot = await getDocs(collection(db, `users/${userId}/reminders`));
      const fetchedReminders = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      })) as MedicineReminder[];
      
      setReminders(fetchedReminders);
    } catch (error) {
      console.error('Error fetching reminders:', error);
    } finally {
      setLoading(false);
    }
  }, []);

  // Add new reminder
  const addReminder = async (newReminder: Omit<MedicineReminder, 'id'>) => {
    try {
      const userId = auth.currentUser?.uid;
      if (!userId) return;

      const docRef = await addDoc(collection(db, `users/${userId}/reminders`), newReminder);
      setReminders(prev => [...prev, { ...newReminder, id: docRef.id }]);
    } catch (error) {
      console.error('Error adding reminder:', error);
    }
  };

  // Delete reminder
  const deleteReminder = async (id: string) => {
    try {
      const userId = auth.currentUser?.uid;
      if (!userId) return;

      await deleteDoc(doc(db, `users/${userId}/reminders/${id}`));
      setReminders(prev => prev.filter(reminder => reminder.id !== id));
    } catch (error) {
      console.error('Error deleting reminder:', error);
    }
  };

  // Update reminder
  const updateReminder = async (id: string, updatedData: Partial<MedicineReminder>) => {
    try {
      const userId = auth.currentUser?.uid;
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

  // Refresh data
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
  };
};
