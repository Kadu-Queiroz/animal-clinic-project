export type UserRole = 'TUTOR' | 'VETERINARIO' | 'RECEPCAO' | 'ADMIN' | 'SYSADMIN';

export interface BaseUser {
  id: number;
  nome: string;
  email?: string;
  funcao: UserRole;
}

export interface TutorAuthData extends BaseUser {
  cpf: string;
  senha_provisoria: boolean;
  funcao: 'TUTOR';
}

export type UsuarioAutenticado = TutorAuthData;
