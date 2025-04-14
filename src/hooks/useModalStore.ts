import { create } from 'zustand';

type ModalType = null | 'loginCliente' | 'sobreNos' | 'produtos' | 'detalhesServico';

interface ModalData {
  title?: string;
  items?: string[];
  [key: string]: unknown;
}

interface ModalStore {
  modal: ModalType;
  modalData: ModalData;
  openModal: (modal: ModalType, data?: ModalData) => void;
  closeModal: () => void;
}

export const useModalStore = create<ModalStore>((set) => ({
  modal: null,
  modalData: {},
  openModal: (modal, data = {}) => set({ modal, modalData: data }),
  closeModal: () => set({ modal: null, modalData: {} }),
}));