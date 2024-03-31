import React, { useState, useContext, ReactNode } from 'react';
import ReactDOM from 'react-dom';
import './Modal.css';

interface ModalContextType {
  modalRef: React.RefObject<HTMLDivElement>;
  modalContent: ReactNode;
  setModalContent: (content: ReactNode) => void;
  setOnModalClose: (callback: () => void) => void;
  closeModal: () => void;
}

const ModalContext = React.createContext<ModalContextType>({
  modalRef: { current: null },
  modalContent: null,
  setModalContent: () => {},
  setOnModalClose: () => {},
  closeModal: () => {}
});

export function ModalProvider({ children } : { children: ReactNode }) {
  const modalRef = React.useRef<HTMLDivElement | null>(null);
  const [modalContent, setModalContent] = useState<ReactNode>(null);
  const [onModalClose, setOnModalClose] = useState<(() => void) | null>(null);

  const closeModal = () => {
    setModalContent(null); // clear the modal contents
    if (onModalClose) {
      onModalClose(); // Call the callback function if it's set
      setOnModalClose(null); // Reset the callback function after calling
    }
  };

  const contextValue = {
    modalRef,
    modalContent,
    setModalContent,
    setOnModalClose,
    closeModal
  };

  return (
    <>
      <ModalContext.Provider value={contextValue}>
        {children}
      </ModalContext.Provider>
      <div ref={modalRef} />
    </>
  );
}

export function Modal() {
  const { modalRef, modalContent, closeModal } = useContext(ModalContext);
  // If there is no div referenced by the modalRef or modalContent is not a
  // truthy value, render nothing:
  if (!modalRef || !modalRef.current || !modalContent) return null;

  // Render the following component to the div referenced by the modalRef
  return ReactDOM.createPortal(
    <div id="modal">
      <div id="modal-background" onClick={closeModal} />
      <div id="modal-content">
        {modalContent}
      </div>
    </div>,
    modalRef.current
  );
}

export const useModal = () => useContext(ModalContext);
