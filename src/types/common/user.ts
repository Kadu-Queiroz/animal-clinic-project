export type UserRole = 'TUTOR' | 'VETERINARIO' | 'RECEPCAO' | 'ADMIN' | 'SYSADMIN';

export interface UsuarioAutenticado {
  id: number;
  nome: string;
  email?: string;
  cpf: string;
  funcao: UserRole;
  senha_provisoria: boolean;
}
