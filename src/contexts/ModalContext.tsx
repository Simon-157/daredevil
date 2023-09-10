import React, { ReactNode, useContext } from 'react';
import useModalStore from '../store/modalStore';

type ModalContextType = {
  isOpen: boolean;
  openModal: () => void;
  closeModal: () => void;
};


interface ModalProviderProps {
    children: ReactNode;
  }
  

const ModalContext = React.createContext<ModalContextType | undefined>(undefined);

export const useModalContext = () => {
  const context = useContext(ModalContext);
  if (context === undefined) {
    throw new Error('useModalContext must be used within a ModalProvider');
  }
  return context;
};

export const ModalProvider: React.FC<ModalProviderProps> = ({ children }) => {
  const modalStore = useModalStore();

  return (
    <ModalContext.Provider value={modalStore}>{children}</ModalContext.Provider>
  );
};


export default ModalContext