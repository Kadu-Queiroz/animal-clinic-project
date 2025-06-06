import { useContext } from 'react';
import { ModalContext } from '@/context/ModalContext';

export function useModal() {
  const context = useContext(ModalContext);
  if (!context) {
    throw new Error('useModal deve ser usado dentro de um <ModalProvider>');
  }
  return context;
}
