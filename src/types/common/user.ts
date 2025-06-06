export type UserRole = 'tutor' | 'veterinario' | 'recepcao' | 'admin' | 'sysadmin';

export interface BaseUser {
  id: number;
  nome: string;
  email?: string;
  role: UserRole;
}

export interface TutorAuthData extends BaseUser {
  cpf: string;
  senha_provisoria: boolean;
  role: 'tutor';
}

export type UsuarioAutenticado = TutorAuthData;
