//este se utiliza en addmedication para agregar las alarmas
export interface MedicineReminder {
  id: string;
  name: string;
  dosage: string;
  time: string;
  frequency: string;
  type: 'medication' | 'appointment';

}