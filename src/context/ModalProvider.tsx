import { useState } from 'react';
import { ModalContext, ModalType, ModalData } from './ModalContext';

export const ModalProvider = ({ children }: { children: React.ReactNode }) => {
  const [modal, setModal] = useState<ModalType>(null);
  const [modalData, setModalData] = useState<ModalData>({});

  const openModal = (type: Exclude<ModalType, null>, data: ModalData = {}) => {
    setModal(type);
    setModalData(data);
  };

  const closeModal = () => {
    setModal(null);
    setModalData({});
  };

  return (
    <ModalContext.Provider value={{ modal, modalData, openModal, closeModal }}>
      {children}
    </ModalContext.Provider>
  );
};
