// src/utils/config/NotificationService.ts
import * as Notifications from 'expo-notifications';
import { DateTriggerInput } from 'expo-notifications';

/**
 * Programa una notificación local para un recordatorio y devuelve su ID.
 */
export async function scheduleOneTimeNotification(
  title: string,
  body: string,
  date: Date,
  reminderId: string,
  intervalHours: number
): Promise<string> {
  // Ajusta la fecha si ya pasó
  const now = Date.now();
  if (date.getTime() <= now) {
    date = new Date(now + 5000);
  }

  const notificationId = await Notifications.scheduleNotificationAsync({
    content: {
      title,
      body,
      sound: 'default',
      data: {
        reminderId,    // para identificar el recordatorio
        intervalHours, // para reprogramar
      },
    },
    trigger: {
      date,
      type: 'date',
    } as DateTriggerInput,
  });
  
  return notificationId;
}
