interface Reminder {
  id: string;
  title: string;
  time: string;
  type: 'medication' | 'appointment';
};
