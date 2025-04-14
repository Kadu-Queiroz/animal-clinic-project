export type PetData = {
    name: string;
    type: string;
    status: string;
    image: string;
  };
  
  export type AppointmentData = {
    date: string;
    time: string;
    pet: string;
    type: string;
  };
  
  export type ReminderData = {
    pet: string;
    message: string;
  };
  
  export type ClienteData = {
    name: string;
    pets: PetData[];
    nextAppointments: AppointmentData[];
    pendingExams: number;
    reminders: ReminderData[];
  };  