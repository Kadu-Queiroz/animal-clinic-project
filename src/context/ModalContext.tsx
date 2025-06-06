import { createContext } from 'react';

export type ModalType = 'loginCliente' | 'sobreNos' | 'detalhesServico' | 'produtos' | null;

export interface ModalData {
  title?: string;
  items?: string[];
  [key: string]: unknown;
}

export interface ModalContextType {
  modal: ModalType;
  modalData: ModalData;
  openModal: (type: Exclude<ModalType, null>, data?: ModalData) => void;
  closeModal: () => void;
}

export const ModalContext = createContext<ModalContextType | undefined>(undefined);
