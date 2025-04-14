export type PetData = {
  id: number;
  nome: string;
  especie: string;
  raca: string;
  cor: string;
  sexo: string;
  pelagem: string;
  chip: string;
  data_nascimento: string;
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
  id: number;
  nome: string;
  cpf: string;
  telefone: string;
  cep: string;
  numero_residencia: string;
  pets: PetData[];
  nextAppointments: AppointmentData[];
  pendingExams: number;
  reminders: ReminderData[];
};
