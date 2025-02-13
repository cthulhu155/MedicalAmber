//este se utiliza en el home para tenerno en memoria local, futuros cambios
interface Reminder {
  id: string;
  title: string;
  time: string;
  type: 'medication' | 'appointment';
};

//este se utiliza en addmedication para agregar las alarmas
export interface MedicineReminder {
  id: string;
  name: string;
  dosage: string;
  time: string;
  frequency: string;
}